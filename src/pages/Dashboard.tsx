import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UpgradeCalculator from '../components/UpgradeCalculator';

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <UpgradeCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
