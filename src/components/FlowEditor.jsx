import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
    useNodesState,
    useEdgesState,
    addEdge,
    MiniMap,
    Controls,
    Background
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useSelector, useDispatch } from 'react-redux';
import { setNodes, setEdges, addEdge as addEdgeAction, setActivePath } from '../slices/workflowSlice';
import evaluateRule from '../utils/evaluateRule';

export default function FlowEditor() {
    const dispatch = useDispatch();
    const reduxNodes = useSelector(s => s.workflow.nodes);
    const reduxEdges = useSelector(s => s.workflow.edges);
    const lastValue = useSelector(s => s.data.lastValue);
    const activePath = useSelector(s => s.workflow.activePath);

    const [nodes, setNodesState, onNodesChange] = useNodesState(reduxNodes);
    const [edges, setEdgesState, onEdgesChange] = useEdgesState(reduxEdges);


    const setAndDispatchEdges = (newEdges) => {
        // setEdgesState(newEdges);
        dispatch(setEdges(newEdges));
    }

    const setAndDispatchNodes = (newNodes) => {
        dispatch(setNodes(newNodes));
    }

    // When local ReactFlow state changes, we push back to Redux
    useEffect(() => {
        setAndDispatchNodes(nodes);
    }, [nodes, dispatch]);

    useEffect(() => {
        setAndDispatchEdges(edges);
    }, [edges, dispatch]);



    // This is connect handler: prompt user to set rule for the new connection.
    const onConnect = useCallback((params) => {
        const rule = window.prompt('Define rule for this connection (e.g., revenue > 1000000):', 'revenue > 1000000');
        const id = `e${params.source}-${params.target}-${Date.now()}`;
        const newEdge = { id, source: params.source, target: params.target, data: { rule } };
        // console.log('newEdge ---', newEdge);

        // update both ReactFlow state and Redux
        setEdgesState(eds => addEdge(newEdge, eds));
        dispatch(addEdgeAction(newEdge));
    }, [dispatch, setEdgesState]);


    // We evaluate rules whenever edges or latest data change
    useEffect(() => {
        const context = { revenue: lastValue };
        // console.log('---evaluating rules with context--', edges, context);

        const active = edges.filter(e => e.data?.rule).filter(e => evaluateRule(e.data.rule, context)).map(e => e.id);
        dispatch(setActivePath(active));
    }, [edges, lastValue, dispatch]);

    // Style edges to highlight active path
    const styledEdges = edges.map(e => ({
        ...e,
        animated: activePath.includes(e.id),
        style: activePath.includes(e.id) ? { stroke: '#494845ff', strokeWidth: 3 } : {}
    }));

    return (
        <div className="flow-editor" style={{ width: '100%', height: '100%' }}>
            <ReactFlow
                nodes={nodes}
                edges={styledEdges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            >
                <MiniMap />
                <Controls />
                <Background gap={16} />
            </ReactFlow>
        </div>
    );
}
