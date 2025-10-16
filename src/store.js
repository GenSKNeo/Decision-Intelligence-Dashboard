import { configureStore } from '@reduxjs/toolkit';
import workflowReducer from './slices/workflowSlice';
import dataReducer from './slices/dataSlice';

const store = configureStore({
    reducer: {
        workflow: workflowReducer,
        data: dataReducer
    }
});

export default store;
