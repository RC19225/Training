import React, { useState, useEffect } from 'react';
import { RateService } from '../services/rateService';
import './RateDetailModal.css';

interface RateDetailModalProps {
  geocode: string;
  onClose: () => void;
  onRateUpdated?: () => void;
  onRateDeleted?: () => void;
}

const RateDetailModal: React.FC<RateDetailModalProps> = ({
  geocode,
  onClose,
  onRateUpdated,
  onRateDeleted
}) => {
  const [rateData, setRateData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Function to normalize field names for display (keeping original keys intact)
  const normalizeFieldName = (fieldName: string): string => {
    return fieldName
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Function to determine if a field should be treated as numeric
  const isNumericField = (fieldName: string, value: any): boolean => {
    return (
      (fieldName.includes('RATE') || 
       fieldName.includes('MINIMUM') || 
       fieldName.includes('MAXIMUM') || 
       fieldName.includes('AMOUNT') || 
       fieldName.includes('TAX')) &&
      typeof value === 'number'
    );
  };

  // Function to determine if a field should be treated as a date
  const isDateField = (fieldName: string): boolean => {
    return fieldName.includes('DATE') || fieldName.includes('CREATED') || fieldName.includes('UPDATED');
  };

  // Function to get excluded fields (fields that shouldn't be displayed)
  const getExcludedFields = (): string[] => {
    return ['createdAt', 'updatedAt']; // Exclude internal tracking fields
  };

  useEffect(() => {
    loadRateDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geocode]);

  const loadRateDetails = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await RateService.getRateByGeocode(geocode);
      console.log('Rate Details Data:', data);
      setRateData(data);
      setEditedData({ ...data });
    } catch (err: any) {
      console.error('Failed to load rate details:', err);
      setError(err.message || 'Failed to load rate details');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({ ...rateData });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedData({ ...rateData });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      
      await RateService.updateRate(geocode, editedData);
      setRateData({ ...editedData });
      setIsEditing(false);
      
      if (onRateUpdated) {
        onRateUpdated();
      }
    } catch (err: any) {
      console.error('Failed to update rate:', err);
      setError(err.message || 'Failed to update rate');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete the rate for geocode ${geocode}? This action cannot be undone.`)) {
      return;
    }

    try {
      setDeleting(true);
      setError('');
      
      await RateService.deleteRate(geocode);
      
      if (onRateDeleted) {
        onRateDeleted();
      }
      
      onClose();
    } catch (err: any) {
      console.error('Failed to delete rate:', err);
      setError(err.message || 'Failed to delete rate');
    } finally {
      setDeleting(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setEditedData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const renderFieldValue = (fieldName: string, value: any) => {
    if (isEditing && fieldName !== 'GEOCODE') {
      if (isNumericField(fieldName, value)) {
        return (
          <input
            type="number"
            step="0.001"
            min="0"
            max="100"
            value={value || ''}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (inputValue === '') {
                handleInputChange(fieldName, null);
              } else {
                const parsedValue = parseFloat(inputValue);
                if (!isNaN(parsedValue)) {
                  handleInputChange(fieldName, Math.round(parsedValue * 1000) / 1000);
                }
              }
            }}
            className="edit-input numeric-input"
          />
        );
      } else if (isDateField(fieldName)) {
        const dateValue = value ? new Date(value).toISOString().split('T')[0] : '';
        return (
          <input
            type="date"
            value={dateValue}
            onChange={(e) => handleInputChange(fieldName, e.target.value ? new Date(e.target.value).toISOString() : null)}
            className="edit-input"
          />
        );
      } else {
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => handleInputChange(fieldName, e.target.value)}
            className="edit-input"
          />
        );
      }
    }

    // Display value
    if (isNumericField(fieldName, value) && value !== null && value !== undefined) {
      // For rate fields, show as percentage with proper precision
      if (fieldName.toLowerCase().includes('rate')) {
        const percentage = (value * 100);
        return <span className="field-value">{percentage.toFixed(3)}%</span>;
      }
      // For other numeric fields (like minimums/maximums), show as currency or plain number
      return <span className="field-value">{value}</span>;
    }
    
    if (isDateField(fieldName) && value) {
      return <span className="field-value">{new Date(value).toLocaleDateString()}</span>;
    }
    
    return <span className="field-value">{value !== null && value !== undefined && value !== '' ? value : 'N/A'}</span>;
  };

  const renderAllFields = () => {
    if (!rateData) return null;

    const excludedFields = getExcludedFields();
    const dataToDisplay = isEditing ? editedData : rateData;
    
    return Object.entries(dataToDisplay)
      .filter(([key]) => !excludedFields.includes(key))
      .map(([key, value]) => (
        <div key={key} className="detail-row">
          <label>{normalizeFieldName(key)}:</label>
          {renderFieldValue(key, value)}
        </div>
      ));
  };

  if (loading) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="loading">Loading rate details...</div>
        </div>
      </div>
    );
  }

  if (error && !rateData) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Error</h2>
            <button onClick={onClose} className="close-btn">×</button>
          </div>
          <div className="error-message">{error}</div>
          <button onClick={loadRateDetails} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Rate Details - {geocode}</h2>
          <div className="header-buttons">
            <button 
              onClick={handleDelete} 
              className="delete-btn"
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : '🗑️ Delete'}
            </button>
            <button onClick={onClose} className="close-btn">×</button>
          </div>
        </div>

        {error && (
          <div className="error-message">{error}</div>
        )}

        <div className="modal-body">
          <div className="rate-details">
            {renderAllFields()}
          </div>
        </div>

        <div className="modal-footer">
          {isEditing ? (
            <div className="edit-buttons">
              <button 
                onClick={handleSave} 
                className="save-btn"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                onClick={handleCancelEdit} 
                className="cancel-btn"
                disabled={saving}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={handleEdit} className="edit-btn">
              Edit Rate
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RateDetailModal;