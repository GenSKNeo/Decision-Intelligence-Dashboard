import { createSlice } from '@reduxjs/toolkit';

// initial mock revenue time-series
const initialRevenue = [
    { month: 'Jan', value: 900000 },
    { month: 'Feb', value: 1100000 },
    { month: 'Mar', value: 1050000 },
    { month: 'Apr', value: 1200000 }
];

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        revenue: initialRevenue,
        lastValue: initialRevenue[initialRevenue.length - 1].value,
        decisionOutcomes: { A: 60, B: 40 }
    },
    reducers: {
        pushRevenue(state, action) {
            const p = action.payload;
            state.revenue.push(p);
            state.lastValue = p.value;
            if (state.revenue.length > 24) state.revenue.shift();
        },
        setDecisionOutcomes(state, action) {
            state.decisionOutcomes = action.payload;
        }
    }
});

export const { pushRevenue, setDecisionOutcomes } = dataSlice.actions;
export default dataSlice.reducer;
