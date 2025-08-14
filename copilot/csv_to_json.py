#!/usr/bin/env python3
"""
CSV to JSON Converter CLI Tool

A command-line utility to convert CSV files to JSON format with various options.

Usage:
    python csv_to_json.py input.csv -o output.json
    python csv_to_json.py input.csv --pretty
    python csv_to_json.py input.csv --orient records
"""

import argparse
import csv
import json
import sys
from pathlib import Path
from typing import List, Dict, Any, Optional


class CSVToJSONConverter:
    """Main converter class for CSV to JSON conversion."""
    
    def __init__(self):
        self.supported_orientations = ['records', 'list', 'dict', 'values']
    
    def read_csv(self, file_path: str, delimiter: str = ',', encoding: str = 'utf-8') -> List[Dict[str, Any]]:
        """
        Read CSV file and return list of dictionaries.
        
        Args:
            file_path: Path to the CSV file
            delimiter: CSV delimiter character
            encoding: File encoding
            
        Returns:
            List of dictionaries representing CSV rows
            
        Raises:
            FileNotFoundError: If CSV file doesn't exist
            csv.Error: If CSV parsing fails
        """
        try:
            with open(file_path, 'r', encoding=encoding, newline='') as csvfile:
                # Detect if file has headers
                sample = csvfile.read(1024)
                csvfile.seek(0)
                sniffer = csv.Sniffer()
                has_header = sniffer.has_header(sample)
                
                if has_header:
                    reader = csv.DictReader(csvfile, delimiter=delimiter)
                    data = [row for row in reader]
                else:
                    reader = csv.reader(csvfile, delimiter=delimiter)
                    rows = list(reader)
                    if not rows:
                        return []
                    
                    # Generate column names for headerless CSV
                    headers = [f'column_{i}' for i in range(len(rows[0]))]
                    data = [dict(zip(headers, row)) for row in rows]
                
                return data
                
        except FileNotFoundError:
            raise FileNotFoundError(f"CSV file not found: {file_path}")
        except csv.Error as e:
            raise csv.Error(f"Error parsing CSV file: {e}")
        except Exception as e:
            raise Exception(f"Unexpected error reading CSV: {e}")
    
    def convert_data_types(self, data: List[Dict[str, Any]], auto_convert: bool = True) -> List[Dict[str, Any]]:
        """
        Convert string values to appropriate data types.
        
        Args:
            data: List of dictionaries with string values
            auto_convert: Whether to automatically convert data types
            
        Returns:
            List of dictionaries with converted data types
        """
        if not auto_convert or not data:
            return data
        
        converted_data = []
        for row in data:
            converted_row = {}
            for key, value in row.items():
                if value == '':
                    converted_row[key] = None
                elif value.lower() in ['true', 'false']:
                    converted_row[key] = value.lower() == 'true'
                elif value.isdigit():
                    converted_row[key] = int(value)
                elif self._is_float(value):
                    converted_row[key] = float(value)
                else:
                    converted_row[key] = value
            converted_data.append(converted_row)
        
        return converted_data
    
    def _is_float(self, value: str) -> bool:
        """Check if string represents a float."""
        try:
            float(value)
            return '.' in value
        except ValueError:
            return False
    
    def format_output(self, data: List[Dict[str, Any]], orientation: str = 'records') -> Any:
        """
        Format data according to specified orientation.
        
        Args:
            data: List of dictionaries
            orientation: Output format orientation
            
        Returns:
            Formatted data structure
        """
        if not data:
            return []
        
        if orientation == 'records':
            return data
        elif orientation == 'list':
            headers = list(data[0].keys())
            return {
                'columns': headers,
                'data': [[row[col] for col in headers] for row in data]
            }
        elif orientation == 'dict':
            result = {}
            for key in data[0].keys():
                result[key] = [row[key] for row in data]
            return result
        elif orientation == 'values':
            headers = list(data[0].keys())
            return [headers] + [[row[col] for col in headers] for row in data]
        else:
            raise ValueError(f"Unsupported orientation: {orientation}")
    
    def save_json(self, data: Any, output_path: str, pretty: bool = False, encoding: str = 'utf-8') -> None:
        """
        Save data to JSON file.
        
        Args:
            data: Data to save
            output_path: Output file path
            pretty: Whether to format JSON with indentation
            encoding: File encoding
        """
        try:
            with open(output_path, 'w', encoding=encoding) as jsonfile:
                if pretty:
                    json.dump(data, jsonfile, indent=2, ensure_ascii=False)
                else:
                    json.dump(data, jsonfile, ensure_ascii=False)
                    
        except Exception as e:
            raise Exception(f"Error writing JSON file: {e}")
    
    def convert(self, input_path: str, output_path: Optional[str] = None, 
                delimiter: str = ',', orientation: str = 'records', 
                pretty: bool = False, auto_convert: bool = True,
                encoding: str = 'utf-8') -> str:
        """
        Main conversion method.
        
        Args:
            input_path: Path to input CSV file
            output_path: Path to output JSON file (optional)
            delimiter: CSV delimiter
            orientation: JSON output orientation
            pretty: Whether to format JSON
            auto_convert: Whether to auto-convert data types
            encoding: File encoding
            
        Returns:
            JSON string or output file path
        """
        # Read and process CSV
        data = self.read_csv(input_path, delimiter, encoding)
        
        # Convert data types if requested
        if auto_convert:
            data = self.convert_data_types(data)
        
        # Format according to orientation
        formatted_data = self.format_output(data, orientation)
        
        # Output to file or return as string
        if output_path:
            self.save_json(formatted_data, output_path, pretty, encoding)
            return output_path
        else:
            if pretty:
                return json.dumps(formatted_data, indent=2, ensure_ascii=False)
            else:
                return json.dumps(formatted_data, ensure_ascii=False)


def main():
    """Main CLI function."""
    parser = argparse.ArgumentParser(
        description='Convert CSV files to JSON format',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s data.csv                          # Print JSON to stdout
  %(prog)s data.csv -o output.json           # Save to file
  %(prog)s data.csv --pretty                 # Pretty-printed JSON
  %(prog)s data.csv --orient dict            # Dictionary orientation
  %(prog)s data.csv -d ";" --encoding latin1 # Custom delimiter and encoding
        """
    )
    
    parser.add_argument('input', help='Input CSV file path')
    parser.add_argument('-o', '--output', help='Output JSON file path')
    parser.add_argument('-d', '--delimiter', default=',', 
                       help='CSV delimiter character (default: ",")')
    parser.add_argument('--orient', choices=['records', 'list', 'dict', 'values'],
                       default='records', help='JSON output orientation (default: records)')
    parser.add_argument('--pretty', action='store_true',
                       help='Pretty-print JSON with indentation')
    parser.add_argument('--no-convert', action='store_true',
                       help='Disable automatic data type conversion')
    parser.add_argument('--encoding', default='utf-8',
                       help='File encoding (default: utf-8)')
    parser.add_argument('--version', action='version', version='%(prog)s 1.0.0')
    
    args = parser.parse_args()
    
    # Validate input file
    input_path = Path(args.input)
    if not input_path.exists():
        print(f"Error: Input file '{args.input}' not found.", file=sys.stderr)
        sys.exit(1)
    
    if not input_path.suffix.lower() == '.csv':
        print(f"Warning: Input file '{args.input}' doesn't have .csv extension.", file=sys.stderr)
    
    # Create converter and process
    converter = CSVToJSONConverter()
    
    try:
        result = converter.convert(
            input_path=str(input_path),
            output_path=args.output,
            delimiter=args.delimiter,
            orientation=args.orient,
            pretty=args.pretty,
            auto_convert=not args.no_convert,
            encoding=args.encoding
        )
        
        if args.output:
            print(f"Successfully converted '{args.input}' to '{args.output}'")
            print(f"Output format: {args.orient}")
            if args.pretty:
                print("Formatting: Pretty-printed")
        else:
            print(result)
            
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
