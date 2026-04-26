# %%%%26.04.2026%%%%%%% Build GitHub Pages artifact
param(
  [string]$OutputDir = "_site"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptRoot
$outputPath = Join-Path $projectRoot $OutputDir

if (Test-Path $outputPath) {
  Remove-Item $outputPath -Recurse -Force
}

[IO.Directory]::CreateDirectory($outputPath) | Out-Null

Get-ChildItem -Path $projectRoot -File -Filter "*.html" | ForEach-Object {
  Copy-Item $_.FullName -Destination (Join-Path $outputPath $_.Name) -Force
}

foreach ($directoryName in @("assets", "forms")) {
  $sourcePath = Join-Path $projectRoot $directoryName
  if (Test-Path $sourcePath) {
    Copy-Item $sourcePath -Destination (Join-Path $outputPath $directoryName) -Recurse -Force
  }
}

foreach ($fileName in @("CNAME", "404.html", "robots.txt", "sitemap.xml")) {
  $sourceFile = Join-Path $projectRoot $fileName
  if (Test-Path $sourceFile) {
    Copy-Item $sourceFile -Destination (Join-Path $outputPath $fileName) -Force
  }
}

New-Item -Path (Join-Path $outputPath ".nojekyll") -ItemType File -Force | Out-Null

Write-Host "Prepared GitHub Pages artifact in $outputPath"
# %%%%26.04.2026%%%%%%% Build GitHub Pages artifact
