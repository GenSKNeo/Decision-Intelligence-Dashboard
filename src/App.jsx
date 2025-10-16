import React from 'react';
import FlowEditor from './components/FlowEditor';
import Charts from './components/Charts';
import useMockData from './hooks/useMockData';

export default function App() {
  // start mock real-time feed
  useMockData(2500);

  return (
    <div className="app-root">
      <header className="app-header">
        <h2>Decision Intelligence Dashboard</h2>
      </header>

      <main className="app-main">
        <section className="left-pane">
          <FlowEditor />
        </section>

        <section className="right-pane">
          <Charts />
        </section>
      </main>
    </div>
  );
}
