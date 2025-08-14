# CSV to JSON Converter CLI Tool

A powerful command-line utility to convert CSV files to JSON format with various customization options.

## Features

- **Multiple Output Formats**: Support for different JSON orientations (records, list, dict, values)
- **Automatic Data Type Detection**: Converts strings to appropriate types (int, float, boolean, null)
- **Pretty Printing**: Optional JSON formatting with indentation
- **Custom Delimiters**: Support for different CSV delimiters
- **Encoding Support**: Handle different file encodings
- **Error Handling**: Comprehensive error messages and validation
- **Header Detection**: Automatically detects if CSV has headers

## Installation

No installation required! Just ensure you have Python 3.6+ installed.

## Usage

### Basic Usage

```bash
# Convert CSV to JSON and save to same name with .json extension
python csv_to_json.py data.csv

# Save to a specific file
python csv_to_json.py data.csv -o output.json

# Print to stdout instead of saving
python csv_to_json.py data.csv --stdout

# Pretty-printed JSON (saved to file)
python csv_to_json.py data.csv --pretty

# Different output orientations
python csv_to_json.py data.csv --orient dict
python csv_to_json.py data.csv --orient list
python csv_to_json.py data.csv --orient values
```

### Advanced Usage

```bash
# Custom delimiter (semicolon)
python csv_to_json.py data.csv -d ";"

# Different encoding
python csv_to_json.py data.csv --encoding latin1

# Disable automatic data type conversion
python csv_to_json.py data.csv --no-convert

# Print to stdout with pretty formatting
python csv_to_json.py data.csv --stdout --pretty

# Combine multiple options
python csv_to_json.py data.csv -o output.json --pretty --orient dict -d ";"
```

## Output Orientations

### Records (default)
```json
[
  {"name": "John", "age": 30, "city": "New York"},
  {"name": "Jane", "age": 25, "city": "Los Angeles"}
]
```

### List
```json
{
  "columns": ["name", "age", "city"],
  "data": [
    ["John", 30, "New York"],
    ["Jane", 25, "Los Angeles"]
  ]
}
```

### Dict
```json
{
  "name": ["John", "Jane"],
  "age": [30, 25],
  "city": ["New York", "Los Angeles"]
}
```

### Values
```json
[
  ["name", "age", "city"],
  ["John", 30, "New York"],
  ["Jane", 25, "Los Angeles"]
]
```

## Command Line Options

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| `--output` | `-o` | Output JSON file path | `{input_name}.json` |
| `--stdout` | | Print to stdout instead of saving | `false` |
| `--delimiter` | `-d` | CSV delimiter character | `,` |
| `--orient` | | JSON output orientation | `records` |
| `--pretty` | | Pretty-print JSON | `false` |
| `--no-convert` | | Disable data type conversion | `false` |
| `--encoding` | | File encoding | `utf-8` |
| `--help` | `-h` | Show help message | |
| `--version` | | Show version | |

## Examples with Sample Data

The tool comes with a sample CSV file (`sample_data.csv`) for testing:

```bash
# Basic conversion (saves to sample_data.json)
python csv_to_json.py sample_data.csv

# Pretty-printed output (saves to sample_data.json)
python csv_to_json.py sample_data.csv --pretty

# Save to specific file with dictionary orientation
python csv_to_json.py sample_data.csv -o output.json --orient dict --pretty

# Print to stdout instead of saving
python csv_to_json.py sample_data.csv --stdout --pretty
```

## Data Type Conversion

By default, the tool automatically converts data types:

- `"true"/"false"` → boolean
- `"123"` → integer
- `"123.45"` → float
- `""` (empty string) → null

To disable this behavior, use the `--no-convert` flag.

## Error Handling

The tool provides clear error messages for common issues:

- File not found
- CSV parsing errors
- Invalid output paths
- Encoding issues

## Sample Data

The included `sample_data.csv` contains:
```csv
name,age,city,salary,active
John Doe,30,New York,75000,true
Jane Smith,25,Los Angeles,65000,true
Bob Johnson,35,Chicago,80000,false
Alice Brown,28,Houston,70000,true
Charlie Wilson,32,Phoenix,72000,false
```

## Requirements

- Python 3.6+
- No external dependencies (uses only standard library)

## License

This tool is provided as-is for educational and practical use.
