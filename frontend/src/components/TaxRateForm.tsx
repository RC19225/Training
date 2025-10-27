import React, { useState, useEffect } from 'react';
import { RateDto, DropdownOption, RateService } from '../services/rateService';
import './TaxRateForm.css';

interface TaxRateFormProps {
  onSubmit?: (rate: RateDto) => void;
  onCancel?: () => void;
}

const TaxRateForm: React.FC<TaxRateFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<RateDto>({
    GEOCODE: '',
    STATE: '',
    COUNTY: '',
    CITY: '',
    State_Tax_Rate: undefined,
    County_Tax_Rate: undefined,
    City_Tax_Rate: undefined,
    Effective_Date: '',
  });

  const [states, setStates] = useState<DropdownOption[]>([]);
  const [counties, setCounties] = useState<DropdownOption[]>([]);
  const [cities, setCities] = useState<DropdownOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isUpdatingFromGeocode, setIsUpdatingFromGeocode] = useState(false);
  const [isUpdatingFromLocation, setIsUpdatingFromLocation] = useState(false);

  // Load states on component mount
  useEffect(() => {
    const loadStates = async () => {
      try {
        const stateOptions = await RateService.getStates();
        setStates(stateOptions);
      } catch (err) {
        setError('Failed to load states');
      }
    };
    loadStates();
  }, []);

  // Load counties when state changes
  useEffect(() => {
    const loadCounties = async () => {
      if (formData.STATE && !isUpdatingFromGeocode) {
        try {
          const countyOptions = await RateService.getCountiesByState(formData.STATE);
          setCounties(countyOptions);
          // Reset county and city when state changes (unless updating from geocode)
          if (!isUpdatingFromGeocode) {
            setFormData(prev => ({ ...prev, COUNTY: '', CITY: '' }));
            setCities([]);
          }
        } catch (err) {
          setError('Failed to load counties');
        }
      } else if (!formData.STATE) {
        setCounties([]);
        setCities([]);
      }
    };
    loadCounties();
  }, [formData.STATE, isUpdatingFromGeocode]);

  // Load cities when county changes
  useEffect(() => {
    const loadCities = async () => {
      if (formData.STATE && formData.COUNTY && !isUpdatingFromGeocode) {
        try {
          const cityOptions = await RateService.getCitiesByStateAndCounty(formData.STATE, formData.COUNTY);
          setCities(cityOptions);
          // Reset city when county changes (unless updating from geocode)
          if (!isUpdatingFromGeocode) {
            setFormData(prev => ({ ...prev, CITY: '' }));
          }
        } catch (err) {
          setError('Failed to load cities');
        }
      } else if (!formData.COUNTY) {
        setCities([]);
      }
    };
    loadCities();
  }, [formData.STATE, formData.COUNTY, isUpdatingFromGeocode]);

  // Auto-fill geocode when location changes
  useEffect(() => {
    const updateGeocodeFromLocation = async () => {
      if (formData.STATE && !isUpdatingFromGeocode && !isUpdatingFromLocation) {
        setIsUpdatingFromLocation(true);
        try {
          const geocode = await RateService.getGeocodeByLocation(
            formData.STATE,
            formData.COUNTY || undefined,
            formData.CITY || undefined
          );
          if (geocode) {
            setFormData(prev => ({ ...prev, GEOCODE: geocode }));
          }
        } catch (err) {
          console.error('Error updating geocode:', err);
        } finally {
          setIsUpdatingFromLocation(false);
        }
      }
    };
    updateGeocodeFromLocation();
  }, [formData.STATE, formData.COUNTY, formData.CITY, isUpdatingFromGeocode, isUpdatingFromLocation]);

  // Auto-fill location when geocode changes
  useEffect(() => {
    const updateLocationFromGeocode = async () => {
      if (formData.GEOCODE && !isUpdatingFromLocation) {
        setIsUpdatingFromGeocode(true);
        try {
          const location = await RateService.getLocationByGeocode(formData.GEOCODE);
          if (location) {
            // Load counties and cities if needed
            if (location.STATE) {
              const countyOptions = await RateService.getCountiesByState(location.STATE);
              setCounties(countyOptions);
              
              if (location.STATE && location.COUNTY) {
                const cityOptions = await RateService.getCitiesByStateAndCounty(location.STATE, location.COUNTY);
                setCities(cityOptions);
              }
            }
            
            setFormData(prev => ({
              ...prev,
              STATE: location.STATE,
              COUNTY: location.COUNTY,
              CITY: location.CITY
            }));
          }
        } catch (err) {
          console.error('Error updating location:', err);
        } finally {
          setIsUpdatingFromGeocode(false);
        }
      }
    };
    
    // Debounce the geocode lookup to avoid excessive API calls
    const timeoutId = setTimeout(updateLocationFromGeocode, 500);
    return () => clearTimeout(timeoutId);
  }, [formData.GEOCODE, isUpdatingFromLocation]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('Rate') ? 
        (value === '' ? undefined : parseFloat(value) / 100) : // Convert percentage to decimal
        value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await RateService.createRate(formData);
      onSubmit?.(result);
      // Reset form after successful submission
      setFormData({
        GEOCODE: '',
        STATE: '',
        COUNTY: '',
        CITY: '',
        State_Tax_Rate: undefined,
        County_Tax_Rate: undefined,
        City_Tax_Rate: undefined,
        Effective_Date: '',
      });
    } catch (err) {
      setError('Failed to create rate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tax-rate-form">
      <h2>Add New Tax Rate</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="GEOCODE">
            Geocode * 
            {isUpdatingFromLocation && <span className="auto-fill-indicator"> (Auto-filling...)</span>}
          </label>
          <input
            type="text"
            id="GEOCODE"
            name="GEOCODE"
            value={formData.GEOCODE}
            onChange={handleInputChange}
            required
            maxLength={20}
            placeholder="Enter geocode or select location below"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="STATE">
              State * 
              {isUpdatingFromGeocode && <span className="auto-fill-indicator"> (Auto-filling...)</span>}
            </label>
            <select
              id="STATE"
              name="STATE"
              value={formData.STATE}
              onChange={handleInputChange}
              required
            >
              <option value="">Select State</option>
              {states.map(state => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="COUNTY">
              County
              {isUpdatingFromGeocode && <span className="auto-fill-indicator"> (Auto-filling...)</span>}
            </label>
            <select
              id="COUNTY"
              name="COUNTY"
              value={formData.COUNTY}
              onChange={handleInputChange}
              disabled={!formData.STATE}
            >
              <option value="">Select County (or defaults to state-level)</option>
              {counties.map(county => (
                <option key={county.value} value={county.value}>
                  {county.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="CITY">
              City
              {isUpdatingFromGeocode && <span className="auto-fill-indicator"> (Auto-filling...)</span>}
            </label>
            <select
              id="CITY"
              name="CITY"
              value={formData.CITY}
              onChange={handleInputChange}
              disabled={!formData.COUNTY}
            >
              <option value="">Select City (or defaults to county-level)</option>
              {cities.map(city => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="State_Tax_Rate">State Tax Rate (%)</label>
            <input
              type="number"
              id="State_Tax_Rate"
              name="State_Tax_Rate"
              value={formData.State_Tax_Rate ? (formData.State_Tax_Rate * 100).toString() : ''}
              onChange={handleInputChange}
              step="0.0001"
              min="0"
              max="100"
            />
          </div>

          <div className="form-group">
            <label htmlFor="County_Tax_Rate">County Tax Rate (%)</label>
            <input
              type="number"
              id="County_Tax_Rate"
              name="County_Tax_Rate"
              value={formData.County_Tax_Rate ? (formData.County_Tax_Rate * 100).toString() : ''}
              onChange={handleInputChange}
              step="0.0001"
              min="0"
              max="100"
            />
          </div>

          <div className="form-group">
            <label htmlFor="City_Tax_Rate">City Tax Rate (%)</label>
            <input
              type="number"
              id="City_Tax_Rate"
              name="City_Tax_Rate"
              value={formData.City_Tax_Rate ? (formData.City_Tax_Rate * 100).toString() : ''}
              onChange={handleInputChange}
              step="0.0001"
              min="0"
              max="100"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="Effective_Date">Effective Date</label>
          <input
            type="date"
            id="Effective_Date"
            name="Effective_Date"
            value={formData.Effective_Date || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            disabled={loading}
            className="submit-btn"
          >
            {loading ? 'Creating...' : 'Create Rate'}
          </button>
          {onCancel && (
            <button 
              type="button" 
              onClick={onCancel}
              className="cancel-btn"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaxRateForm;