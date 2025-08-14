@echo off
REM CSV to JSON Converter Batch Script
REM Usage: csv2json.bat input.csv [additional options]

if "%1"=="" (
    echo Usage: csv2json.bat input.csv [additional options]
    echo Examples:
    echo   csv2json.bat data.csv
    echo   csv2json.bat data.csv --pretty
    echo   csv2json.bat data.csv --orient dict
    echo   csv2json.bat data.csv -o output.json
    exit /b 1
)

python "%~dp0csv_to_json.py" %*
