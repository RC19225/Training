import { CSVParser, LocationData, GeocodeLocation } from '../utils/csvParser';

export interface RateDto {
  GEOCODE: string;
  STATE: string;
  COUNTY: string;
  CITY: string;
  State_Tax_Rate?: number;
  County_Tax_Rate?: number;
  City_Tax_Rate?: number;
  Effective_Date?: string;
}

export interface DropdownOption {
  value: string;
  label: string;
}

const API_BASE_URL = 'http://localhost:5282/api'; // Adjust this to match your backend URL

export class RateService {
  private static locationData: LocationData[] | null = null;

  // Initialize location data from CSV
  private static async initializeLocationData(): Promise<LocationData[]> {
    if (!this.locationData) {
      this.locationData = await CSVParser.loadLocationData();
    }
    return this.locationData;
  }

  // Keep existing database calls for rate operations
  static async getAllRates(): Promise<RateDto[]> {
    try {
      console.log('Fetching rates from:', `${API_BASE_URL}/ratesource`);
      const response = await fetch(`${API_BASE_URL}/ratesource`);
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched rates:', data);
      
      // Transform the keys to match our TypeScript interface
      const transformedData = data.map((rate: any) => ({
        GEOCODE: rate.geocode || rate.GEOCODE,
        STATE: rate.state || rate.STATE,
        COUNTY: rate.county || rate.COUNTY,
        CITY: rate.city || rate.CITY,
        State_Tax_Rate: rate.state_Tax_Rate || rate.State_Tax_Rate,
        County_Tax_Rate: rate.county_Tax_Rate || rate.County_Tax_Rate,
        City_Tax_Rate: rate.city_Tax_Rate || rate.City_Tax_Rate,
        Effective_Date: rate.effective_Date || rate.Effective_Date
      }));
      
      return transformedData;
    } catch (error) {
      console.error('Error fetching rates:', error);
      throw error;
    }
  }

  static async createRate(rate: RateDto): Promise<RateDto> {
    try {
      const response = await fetch(`${API_BASE_URL}/ratesource`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rate),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create rate');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating rate:', error);
      throw error;
    }
  }

  // Use CSV data for dropdown population
  static async getStates(): Promise<DropdownOption[]> {
    try {
      const locationData = await this.initializeLocationData();
      const uniqueStates = CSVParser.getUniqueStates(locationData);
      return uniqueStates.map(state => ({ value: state, label: state }));
    } catch (error) {
      console.error('Error fetching states from CSV:', error);
      return [];
    }
  }

  static async getCountiesByState(state: string): Promise<DropdownOption[]> {
    try {
      const locationData = await this.initializeLocationData();
      const uniqueCounties = CSVParser.getCountiesByState(locationData, state);
      return uniqueCounties.map(county => ({ value: county, label: county }));
    } catch (error) {
      console.error('Error fetching counties from CSV:', error);
      return [];
    }
  }

  static async getCitiesByStateAndCounty(state: string, county: string): Promise<DropdownOption[]> {
    try {
      const locationData = await this.initializeLocationData();
      const uniqueCities = CSVParser.getCitiesByStateAndCounty(locationData, state, county);
      return uniqueCities.map(city => ({ value: city, label: city }));
    } catch (error) {
      console.error('Error fetching cities from CSV:', error);
      return [];
    }
  }

  // methods for geocode-location mapping
  static async getGeocodeByLocation(state: string, county?: string, city?: string): Promise<string | null> {
    try {
      const locationData = await this.initializeLocationData();
      return CSVParser.findGeocodeByLocation(locationData, state, county, city);
    } catch (error) {
      console.error('Error finding geocode:', error);
      return null;
    }
  }

  static async getLocationByGeocode(geocode: string): Promise<GeocodeLocation | null> {
    try {
      const locationData = await this.initializeLocationData();
      return CSVParser.findLocationByGeocode(locationData, geocode);
    } catch (error) {
      console.error('Error finding location:', error);
      return null;
    }
  }
}