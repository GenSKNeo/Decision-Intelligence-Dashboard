import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { useSelector } from 'react-redux';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Charts = React.memo(function Charts() {
    const revenue = useSelector(s => s.data.revenue);
    const outcomes = useSelector(s => s.data.decisionOutcomes);

    const lineData = {
        labels: revenue.map(r => r.month),
        datasets: [
            {
                label: 'Revenue',
                data: revenue.map(r => r.value),
                tension: 0.25,
                borderWidth: 2,
                pointRadius: 2
            }
        ]
    };

    const barData = {
        labels: Object.keys(outcomes),
        datasets: [{ label: 'Success %', data: Object.values(outcomes), barThickness: 30 }]
    };

    return (
        <div className="charts">
            <h4 style={{ marginBottom: '10px' }}>Revenue (time-series)</h4>
            <div className="chart-card" style={{ marginBottom: '0px' }}>
                <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
            <h4 style={{ marginBottom: '10px' }}>Decision Outcomes</h4>
            <div className="chart-card" style={{ marginBottom: '0px' }}>
                <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
        </div>
    );
});

export default Charts;
