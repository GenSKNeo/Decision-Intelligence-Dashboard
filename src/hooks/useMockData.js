import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { pushRevenue, setDecisionOutcomes } from '../slices/dataSlice';

export default function useMockData(intervalMs = 3000) {
    const dispatch = useDispatch();

    useEffect(() => {
        const id = setInterval(() => {
            // simple random walk around ~1M
            const month = new Date().toLocaleString('default', { month: 'short' });
            const base = 1000000;
            const variation = Math.round((Math.sin(Date.now() / 200000) + Math.random() - 0.3) * 150000);
            const value = Math.max(0, base + variation);
            dispatch(pushRevenue({ month, value }));

            // updating decision outcome distribution randomly (A vs B )
            const a = 40 + Math.round(Math.random() * 40);
            dispatch(setDecisionOutcomes({ A: a, B: 100 - a }));
        }, intervalMs);

        return () => clearInterval(id);
    }, [dispatch, intervalMs]);
}
