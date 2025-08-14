# CSV to JSON Converter PowerShell Script
# Usage: .\csv2json.ps1 input.csv [additional options]

param(
    [Parameter(Mandatory=$true, Position=0)]
    [string]$InputFile,
    
    [Parameter(ValueFromRemainingArguments=$true)]
    [string[]]$AdditionalArgs
)

if (-not $InputFile) {
    Write-Host "Usage: .\csv2json.ps1 input.csv [additional options]"
    Write-Host "Examples:"
    Write-Host "  .\csv2json.ps1 data.csv"
    Write-Host "  .\csv2json.ps1 data.csv --pretty"
    Write-Host "  .\csv2json.ps1 data.csv --orient dict"
    Write-Host "  .\csv2json.ps1 data.csv -o output.json"
    exit 1
}

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$PythonScript = Join-Path $ScriptDir "csv_to_json.py"

$AllArgs = @($InputFile) + $AdditionalArgs
& python $PythonScript @AllArgs
