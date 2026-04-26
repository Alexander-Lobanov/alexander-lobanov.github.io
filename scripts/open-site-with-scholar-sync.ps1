# %%%%26.04.2026%%%%%%% Open site with Scholar sync
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptRoot
$updateScript = Join-Path $scriptRoot "update-scholar-stats.ps1"
$indexFile = Join-Path $projectRoot "index.html"

if (-not (Test-Path $updateScript)) {
  throw "Could not find update script: $updateScript"
}

if (-not (Test-Path $indexFile)) {
  throw "Could not find site entry point: $indexFile"
}

Write-Host "Updating Google Scholar stats..."
powershell -ExecutionPolicy Bypass -File $updateScript

Write-Host "Opening site..."
Start-Process $indexFile
# %%%%26.04.2026%%%%%%% Open site with Scholar sync
