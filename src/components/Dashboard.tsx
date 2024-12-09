import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import UpgradeCalculator from './UpgradeCalculator';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <UpgradeCalculator />
        </main>
      </div>
    </div>
  );
}