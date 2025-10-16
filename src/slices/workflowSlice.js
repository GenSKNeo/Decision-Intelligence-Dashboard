import { createSlice } from '@reduxjs/toolkit';

/**
 * Nodes/edges are kept in Redux so multiple components can read/update.
 * Each edge  carries a `data.rule` string like "revenue > 1000000".
 */

const initialNodes = [
    { id: '1', type: 'input', position: { x: 50, y: 50 }, data: { label: 'Start' } },
    { id: '2', type: 'default', position: { x: 300, y: 50 }, data: { label: 'Revenue Check', rule: 'revenue > 1000000' } },
    { id: '3', type: 'default', position: { x: 600, y: 20 }, data: { label: 'Expand' } },
    { id: '4', type: 'default', position: { x: 600, y: 120 }, data: { label: 'Hold' } }
];

const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3', data: { rule: 'revenue > 1000000' } },
    { id: 'e2-4', source: '2', target: '4', data: { rule: 'revenue <= 1000000' } }
];

const workflowSlice = createSlice({
    name: 'workflow',
    initialState: {
        nodes: initialNodes,
        edges: initialEdges,
        activePath: [] // array of edge ids currently active
    },
    reducers: {
        setNodes(state, action) { state.nodes = action.payload; },
        setEdges(state, action) { state.edges = action.payload; },
        addEdge(state, action) { state.edges.push(action.payload); },
        updateEdgeRule(state, action) {
            const { edgeId, rule } = action.payload;
            const e = state.edges.find(x => x.id === edgeId);
            if (e) e.data = { ...(e.data || {}), rule };
        },
        setActivePath(state, action) { state.activePath = action.payload; }
    }
});

export const { setNodes, setEdges, addEdge, updateEdgeRule, setActivePath } = workflowSlice.actions;
export default workflowSlice.reducer;
