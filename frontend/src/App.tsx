import React, { useState } from 'react';
import './App.css';
import TaxRateForm from './components/TaxRateForm';
import RateList from './components/RateList';
import { RateDto } from './services/rateService';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRateCreated = (rate: RateDto) => {
    console.log('Rate created:', rate);
    setShowForm(false);
    setRefreshKey(prev => prev + 1); // Trigger refresh of rate list
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tax Rate Management System</h1>
        <div className="header-actions">
          <button 
            className="add-rate-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : 'Add New Rate'}
          </button>
        </div>
      </header>
      
      <main className="App-main">
        {showForm && (
          <TaxRateForm 
            onSubmit={handleRateCreated}
            onCancel={() => setShowForm(false)}
          />
        )}
        
        <RateList key={refreshKey} onRefresh={() => setRefreshKey(prev => prev + 1)} />
      </main>
    </div>
  );
}

export default App;
