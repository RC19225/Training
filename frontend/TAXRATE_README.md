# Tax Rate Management System - Frontend

This React application provides a user-friendly interface for managing tax rate data with dynamic location-based dropdowns powered by a comprehensive CSV dataset.

## Features

### Tax Rate Form with Smart Geocode-Location Mapping
- **Bidirectional Auto-filling**: 
  - Enter geocode → automatically fills state, county, city
  - Select state/county/city → automatically fills geocode
- **Intelligent Defaults**: 
  - State only → uses "DEFAULT COUNTY" and "DEFAULT CITY" 
  - State + County → uses "DEFAULT CITY" for that county
  - Full hierarchy supported for precise location targeting
- **Visual Feedback**: Shows "Auto-filling..." indicators during updates
- **Comprehensive Tax Data**: All standard tax rate fields with effective date

### Tax Rate List
- **Search Functionality**: Search rates by geocode, state, county, or city
- **Card-based Display**: Clean, organized view of all tax rates from database
- **Calculated Total**: Automatically displays combined tax rate
- **Responsive Design**: Works on desktop and mobile devices

## Key Features

### 🔄 **Smart Geocode-Location Mapping**
- **Auto-fill Geocode**: Select state/county/city → geocode fills automatically
- **Auto-fill Location**: Enter geocode → state/county/city fill automatically  
- **Intelligent Defaults**: Partial selections use appropriate defaults
- **Real-time Updates**: Changes propagate instantly with visual feedback

### 🎯 **Location Hierarchy Logic**
1. **Full Selection**: State + County + City → Exact geocode match
2. **State + County**: → Geocode for "DEFAULT CITY" in that county  
3. **State Only**: → Geocode for "DEFAULT COUNTY" + "DEFAULT CITY"
4. **Reverse Lookup**: Geocode → Exact location or shows defaults as empty fields

### Location Data (CSV-Based)
The dropdown menus are populated from `unique_locations.csv` which contains:
- **110,574 location records** with complete geographic hierarchy
- **GEOCODE**: Unique location identifier
- **ZIP**: ZIP code information
- **CITY_NAME**: City/municipality names
- **COUNTY_NAME**: County names
- **STATE_NAME**: State names
- **SD_CODE**: Special district codes

### Tax Rate Data (Database-Based)
The tax rate display and creation still uses the backend database API for:
- Fetching existing tax rates for display
- Creating new tax rates
- Updating and managing rate information

## Architecture

### Hybrid Data Approach
- **Form Dropdowns**: Use CSV file for fast, comprehensive location selection
- **Rate Operations**: Use database API for creating, reading, updating tax rates
- **Benefits**: 
  - Fast dropdown population without database queries
  - Complete location coverage from authoritative source
  - Reliable rate management through existing backend

## Components

### `TaxRateForm.tsx`
- Form component for adding new tax rates
- Uses CSV-based location dropdowns for state/county/city selection
- Integrates with backend API for rate submission
- Maintains all existing functionality with improved location data

### `RateList.tsx`
- Displays existing tax rates from database
- Real-time search filtering
- Unchanged functionality - still uses database for rate display

### `rateService.ts`
- **Updated Service Layer** with hybrid approach:
  - `getStates()`, `getCountiesByState()`, `getCitiesByStateAndCounty()`: Use CSV data
  - `getAllRates()`, `createRate()`: Use database API
  - Automatic CSV caching for performance

### `csvParser.ts`
- **New Utility**: Handles CSV file loading and parsing
- Provides methods for extracting unique states, counties, and cities
- Caches parsed data for optimal performance
- Filters out default/placeholder entries

## CSV File Structure

The `unique_locations.csv` file is structured as follows:
```
GEOCODE,ZIP,CITY_NAME,COUNTY_NAME,STATE_NAME,SD_CODE
100000000,0,DEFAULT CITY,DEFAULT COUNTY,AL,0
100100000,0,DEFAULT CITY,AUTAUGA,AL,1
100103220,36003,AUTAUGAVILLE,AUTAUGA,AL,0
...
```

## Setup Instructions

### 1. File Placement
The CSV file is automatically copied to `frontend/public/unique_locations.csv` and loaded by the application.

### 2. Starting the Application

1. **Start the Backend API** (for rate operations)
2. **Start the Frontend**:
   ```bash
   cd frontend
   npm start
   ```

### 3. Using the Form

1. Click "Add New Rate" to open the form
2. **State Selection**: Choose from 50+ states in the CSV data
3. **County Selection**: Counties automatically filter based on selected state
4. **City Selection**: Cities automatically filter based on selected state and county
5. Enter tax rate information and submit

## Performance Considerations

### CSV Loading Strategy
- CSV file is loaded once on first dropdown access
- Data is cached in memory for subsequent operations
- Parsing is optimized for large datasets
- Network requests only made once per session

### Filtering Performance
- Uses JavaScript Set operations for unique value extraction
- Efficient filtering algorithms for large datasets
- Client-side processing eliminates server load for location lookups

## Data Coverage

The CSV includes comprehensive location data for:
- **All 50 US States** with full geographic hierarchy
- **3,000+ Counties** across all states
- **35,000+ Cities and Municipalities**
- **Special Districts** and administrative zones
- **ZIP Code** associations for location validation

## Error Handling

### CSV Loading
- Graceful fallback if CSV file cannot be loaded
- Error logging for debugging
- Empty dropdown with error message if data unavailable

### API Operations
- Comprehensive error handling for rate operations
- Network error recovery
- User-friendly error messages

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers with responsive design
- Optimized for various screen sizes
- Fast performance even with large datasets