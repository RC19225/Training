import React, { useState, useEffect } from 'react';
import { RateDto, RateService } from '../services/rateService';
import './RateList.css';

interface RateListProps {
  onRefresh?: () => void;
}

const RateList: React.FC<RateListProps> = ({ onRefresh }) => {
  const [rates, setRates] = useState<RateDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const loadRates = async () => {
    try {
      setLoading(true);
      const ratesData = await RateService.getAllRates();
      console.log(ratesData);
      await setRates(ratesData);
      console.log("rateee",rates);
      setError('');
    } catch (err) {
      console.error('Failed to load rates:', err);
      setError('Unable to connect to the backend API. Please ensure the backend server is running on port 5282.');
      // Set empty array so the component can still render
      setRates([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRates();
  }, [onRefresh]);

  const filteredRates = rates.filter(rate =>
    (rate.GEOCODE || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (rate.STATE || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (rate.COUNTY || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (rate.CITY || '').toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log('Filtered Rates:', filteredRates[0]);


  if (loading) {
    return <div className="loading">Loading rates...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <button onClick={loadRates} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="rate-list">
      <div className="rate-list-header">
        <h2>Tax Rates ({rates.length})</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by geocode, state, county, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {filteredRates.length === 0 ? (
        <div className="no-results">
          {searchTerm ? 'No rates found matching your search.' : 'No rates available.'}
        </div>
      ) : (
        <div className="rates-grid">
          {filteredRates.map((rate) => (
            <div key={rate.GEOCODE} className="rate-card">
              <div className="rate-header">
                <h3>{rate.GEOCODE}</h3>
                {rate.Effective_Date && (
                  <span className="effective-date">
                    {new Date(rate.Effective_Date).toLocaleDateString()}
                  </span>
                )}
              </div>
              
              <div className="location-info">
                <div key="state" className="location-item">
                  <strong>State:</strong> {rate.STATE || 'N/A'}
                </div>
                <div key="county" className="location-item">
                  <strong>County:</strong> {rate.COUNTY || 'N/A'}
                </div>
                <div key="city" className="location-item">
                  <strong>City:</strong> {rate.CITY || 'N/A'}
                </div>
              </div>

              <div className="tax-rates">
                <div key="state-tax" className="rate-item">
                  <span className="rate-label">State Tax:</span>
                  <span className="rate-value">
                    {rate.State_Tax_Rate ? `${rate.State_Tax_Rate}%` : 'N/A'}
                  </span>
                </div>
                <div key="county-tax" className="rate-item">
                  <span className="rate-label">County Tax:</span>
                  <span className="rate-value">
                    {rate.County_Tax_Rate ? `${rate.County_Tax_Rate}%` : 'N/A'}
                  </span>
                </div>
                <div key="city-tax" className="rate-item">
                  <span className="rate-label">City Tax:</span>
                  <span className="rate-value">
                    {rate.City_Tax_Rate ? `${rate.City_Tax_Rate}%` : 'N/A'}
                  </span>
                </div>
                <div key="total-tax" className="rate-item total-rate">
                  <span className="rate-label">Total:</span>
                  <span className="rate-value">
                    {(() => {
                      const total = (rate.State_Tax_Rate || 0) + 
                                   (rate.County_Tax_Rate || 0) + 
                                   (rate.City_Tax_Rate || 0);
                      return total > 0 ? `${total.toFixed(4)}%` : 'N/A';
                    })()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RateList;