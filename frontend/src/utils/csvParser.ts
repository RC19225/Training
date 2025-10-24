export interface LocationData {
  GEOCODE: string;
  ZIP: string;
  CITY_NAME: string;
  COUNTY_NAME: string;
  STATE_NAME: string;
  SD_CODE: string;
}

export interface GeocodeLocation {
  GEOCODE: string;
  STATE: string;
  COUNTY: string;
  CITY: string;
}

export class CSVParser {
  private static cachedData: LocationData[] | null = null;

  static async parseCSV(csvText: string): Promise<LocationData[]> {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');
    
    return lines.slice(1).map(line => {
      const values = line.split(',');
      const row: any = {};
      
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      
      return row as LocationData;
    });
  }

  static async loadLocationData(): Promise<LocationData[]> {
    if (this.cachedData) {
      return this.cachedData;
    }

    try {
      // In a real application, you would fetch this from a public URL or include it as a static asset
      // For now, we'll return the parsed CSV data
      const response = await fetch('/unique_locations.csv');
      if (!response.ok) {
        throw new Error('Failed to load location data');
      }
      
      const csvText = await response.text();
      this.cachedData = await this.parseCSV(csvText);
      return this.cachedData;
    } catch (error) {
      console.error('Error loading location data:', error);
      // Fallback to empty array if CSV can't be loaded
      return [];
    }
  }

  static getUniqueStates(data: LocationData[]): string[] {
    const states = new Set(
      data
        .map(item => item.STATE_NAME)
        .filter(state => state && state !== 'DEFAULT COUNTY' && state !== 'DEFAULT CITY')
    );
    return Array.from(states).sort();
  }

  static getCountiesByState(data: LocationData[], state: string): string[] {
    const counties = new Set(
      data
        .filter(item => item.STATE_NAME === state)
        .map(item => item.COUNTY_NAME)
        .filter(county => county && county !== 'DEFAULT COUNTY' && county !== 'DEFAULT CITY')
    );
    return Array.from(counties).sort();
  }

  static getCitiesByStateAndCounty(data: LocationData[], state: string, county: string): string[] {
    const cities = new Set(
      data
        .filter(item => item.STATE_NAME === state && item.COUNTY_NAME === county)
        .map(item => item.CITY_NAME)
        .filter(city => city && city !== 'DEFAULT COUNTY' && city !== 'DEFAULT CITY')
    );
    return Array.from(cities).sort();
  }

  // New methods for geocode lookup
  static findGeocodeByLocation(data: LocationData[], state: string, county?: string, city?: string): string | null {
    // Priority order: exact match, then fallback to defaults
    const filters = [];
    
    if (city) {
      // Try to find exact city match first
      filters.push((item: LocationData) => 
        item.STATE_NAME === state && 
        item.COUNTY_NAME === county && 
        item.CITY_NAME === city
      );
    }
    
    if (county) {
      // Try to find default city for county
      filters.push((item: LocationData) => 
        item.STATE_NAME === state && 
        item.COUNTY_NAME === county && 
        item.CITY_NAME === 'DEFAULT CITY'
      );
    }
    
    // Try to find default county and city for state
    filters.push((item: LocationData) => 
      item.STATE_NAME === state && 
      item.COUNTY_NAME === 'DEFAULT COUNTY' && 
      item.CITY_NAME === 'DEFAULT CITY'
    );

    for (const filter of filters) {
      const match = data.find(filter);
      if (match) {
        return match.GEOCODE;
      }
    }

    return null;
  }

  static findLocationByGeocode(data: LocationData[], geocode: string): GeocodeLocation | null {
    const match = data.find(item => item.GEOCODE === geocode);
    if (match) {
      return {
        GEOCODE: match.GEOCODE,
        STATE: match.STATE_NAME,
        COUNTY: match.COUNTY_NAME === 'DEFAULT COUNTY' ? '' : match.COUNTY_NAME,
        CITY: match.CITY_NAME === 'DEFAULT CITY' ? '' : match.CITY_NAME
      };
    }
    return null;
  }

  // Helper method to build appropriate location combination for geocode lookup
  static buildLocationForGeocode(state: string, county?: string, city?: string): { state: string, county: string, city: string } {
    return {
      state,
      county: county || 'DEFAULT COUNTY',
      city: city || 'DEFAULT CITY'
    };
  }
}