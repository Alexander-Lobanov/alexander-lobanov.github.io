param(
  [string]$ScholarUserId = "D1ji84AAAAAJ",
  [string]$Language = "ru",
  [string]$OutputPath = "assets/js/scholar-stats.js",
  # %%%%26.04.2026%%%%%%% configurable official hosts make the fallback path testable
  [string[]]$ProfileHosts = @(
    "scholar.google.com",
    "scholar.google.co.uk",
    "scholar.google.de"
  )
  # %%%%26.04.2026%%%%%%% configurable official hosts make the fallback path testable
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# %%%%26.04.2026%%%%%%% Google Scholar stats sync
$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptRoot
$outputFile = Join-Path $projectRoot $OutputPath

$headers = @{
  "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
  "Accept-Language" = "$Language,en;q=0.9"
}

function Write-StepSummary {
  param([string]$Message)

  if ($env:GITHUB_STEP_SUMMARY) {
    Add-Content -Path $env:GITHUB_STEP_SUMMARY -Value $Message
  }
}

function Get-ExistingSnapshotUpdatedAt {
  param([string]$Path)

  if (-not (Test-Path $Path)) {
    return $null
  }

  $content = [IO.File]::ReadAllText($Path)
  $match = [regex]::Match($content, '"updatedAt"\s*:\s*"([^"]+)"')
  if ($match.Success) {
    return $match.Groups[1].Value
  }

  return $null
}

# %%%%26.04.2026%%%%%%% retain the previous co-author count if the primary page omits that section
function Get-ExistingSnapshotMetric {
  param(
    [string]$Path,
    [string]$MetricName
  )

  if (-not (Test-Path $Path)) {
    return $null
  }

  $content = [IO.File]::ReadAllText($Path)
  $escapedMetricName = [regex]::Escape($MetricName)
  $match = [regex]::Match($content, '"' + $escapedMetricName + '"\s*:\s*(\d+)')
  if ($match.Success) {
    return [int]$match.Groups[1].Value
  }

  return $null
}
# %%%%26.04.2026%%%%%%% retain the previous co-author count if the primary page omits that section

function Invoke-ScholarRequest {
  param([string]$Url)

  $lastError = $null

  foreach ($attempt in 1..3) {
    try {
      $requestParams = @{
        Uri = $Url
        Headers = $headers
      }

      if ((Get-Command Invoke-WebRequest).Parameters.ContainsKey("UseBasicParsing")) {
        $requestParams.UseBasicParsing = $true
      }

      return (Invoke-WebRequest @requestParams).Content
    } catch {
      $lastError = $_
      if ($attempt -lt 3) {
        Start-Sleep -Seconds (2 * $attempt)
      }
    }
  }

  throw $lastError
}

$syncIsOptional = $env:SCHOLAR_SYNC_OPTIONAL -eq "true"

try {
  # %%%%26.04.2026%%%%%%% retry the same public Scholar profile through official regional hosts
  $profileUrl = $null
  $profileHtml = $null
  $profileErrors = @()

  foreach ($profileHost in $ProfileHosts) {
    $candidateUrl = "https://$profileHost/citations?user=$ScholarUserId&hl=$Language&cstart=0&pagesize=1000"

    try {
      $candidateHtml = Invoke-ScholarRequest $candidateUrl
      $candidateMetricCount = ([regex]::Matches($candidateHtml, '<td class="gsc_rsb_std">([^<]+)</td>')).Count
      $candidatePublicationCount = ([regex]::Matches($candidateHtml, '<tr class="gsc_a_tr">')).Count

      if ($candidateMetricCount -lt 6 -or $candidatePublicationCount -le 0) {
        throw "Scholar response did not contain a complete public profile"
      }

      $profileUrl = $candidateUrl
      $profileHtml = $candidateHtml
      Write-Host "Scholar profile loaded from $profileHost"
      break
    } catch {
      $profileErrors += "${profileHost}: $($_.Exception.Message)"
    }
  }

  # %%%%26.04.2026%%%%%%% use Google's translation proxy when Scholar blocks GitHub runner addresses
  if (-not $profileHtml) {
    $translateUrl = "https://scholar-google-com.translate.goog/citations?user=$ScholarUserId&hl=en&cstart=0&pagesize=1000&_x_tr_sl=auto&_x_tr_tl=en&_x_tr_hl=en"

    try {
      $candidateHtml = Invoke-ScholarRequest $translateUrl
      $candidateMetricCount = ([regex]::Matches($candidateHtml, '<td class="gsc_rsb_std">([^<]+)</td>')).Count
      $candidatePublicationCount = ([regex]::Matches($candidateHtml, '<tr class="gsc_a_tr">')).Count

      if ($candidateMetricCount -lt 6 -or $candidatePublicationCount -le 0) {
        throw "Translated Scholar response did not contain a complete public profile"
      }

      $profileUrl = $translateUrl
      $profileHtml = $candidateHtml
      Write-Host "Scholar profile loaded through Google's translation proxy"
    } catch {
      $profileErrors += "scholar-google-com.translate.goog: $($_.Exception.Message)"
    }
  }
  # %%%%26.04.2026%%%%%%% use Google's translation proxy when Scholar blocks GitHub runner addresses

  if (-not $profileHtml) {
    throw "Could not load Scholar profile from official hosts. $($profileErrors -join '; ')"
  }
  # %%%%26.04.2026%%%%%%% retry the same public Scholar profile through official regional hosts

  $metricMatches = [regex]::Matches($profileHtml, '<td class="gsc_rsb_std">([^<]+)</td>')
  if ($metricMatches.Count -lt 6) {
    throw "Could not parse Scholar metrics from $profileUrl"
  }

  $metricValues = @($metricMatches | ForEach-Object {
    [int](($_.Groups[1].Value -replace '[^\d]', ''))
  })

  $publicationCount = ([regex]::Matches($profileHtml, '<tr class="gsc_a_tr">')).Count
  if ($publicationCount -le 0) {
    throw "Could not parse publications from $profileUrl"
  }

  # %%%%26.04.2026%%%%%%% translation proxy may return only the first page of publications
  if ($profileUrl -match 'translate\.goog') {
    $existingPublicationCount = Get-ExistingSnapshotMetric -Path $outputFile -MetricName "publications"
    if ($null -ne $existingPublicationCount -and $existingPublicationCount -gt $publicationCount) {
      $publicationCount = $existingPublicationCount
    }
  }
  # %%%%26.04.2026%%%%%%% translation proxy may return only the first page of publications

  # %%%%26.04.2026%%%%%%% reuse the primary profile response instead of making a block-prone second request
  $coauthorCount = ([regex]::Matches($profileHtml, '<div class="gsc_rsb_a_desc"')).Count
  if ($coauthorCount -le 0) {
    $coauthorCount = Get-ExistingSnapshotMetric -Path $outputFile -MetricName "coauthors"
    if ($null -eq $coauthorCount) {
      $coauthorCount = 0
    }
  }
  # %%%%26.04.2026%%%%%%% reuse the primary profile response instead of making a block-prone second request

  $stats = [ordered]@{
    updatedAt = (Get-Date).ToUniversalTime().ToString("o")
    sourceUrl = "https://scholar.google.com/citations?user=$ScholarUserId&hl=$Language"
    metrics = [ordered]@{
      publications = $publicationCount
      citations = $metricValues[0]
      citations5y = $metricValues[1]
      hIndex = $metricValues[2]
      hIndex5y = $metricValues[3]
      i10Index = $metricValues[4]
      i10Index5y = $metricValues[5]
      coauthors = $coauthorCount
    }
  }

  $json = $stats | ConvertTo-Json -Depth 4
  $js = @(
    "// %%%%26.04.2026%%%%%%% Google Scholar snapshot",
    "// Auto-generated by scripts/update-scholar-stats.ps1",
    "window.SCHOLAR_STATS = $json;",
    "// %%%%26.04.2026%%%%%%% Google Scholar snapshot",
    ""
  ) -join [Environment]::NewLine

  [IO.Directory]::CreateDirectory((Split-Path -Parent $outputFile)) | Out-Null
  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [IO.File]::WriteAllText($outputFile, $js, $utf8NoBom)
  # %%%%26.04.2026%%%%%%% Google Scholar stats sync

  Write-Host "Updated $outputFile"
  Write-Host ($stats.metrics | ConvertTo-Json -Compress)
  Write-StepSummary "### Scholar sync succeeded`n- Runner OS: $env:RUNNER_OS`n- Updated at (UTC): $($stats.updatedAt)`n- Citations: $($stats.metrics.citations)`n- Publications: $($stats.metrics.publications)`n- Co-authors: $($stats.metrics.coauthors)`n"
} catch {
  if ($syncIsOptional -and (Test-Path $outputFile)) {
    $existingUpdatedAt = Get-ExistingSnapshotUpdatedAt -Path $outputFile
    Write-Warning "%%%%26.04.2026%%%%%%% Scholar sync skipped: $($_.Exception.Message)"
    Write-Warning "%%%%26.04.2026%%%%%%% Keeping existing snapshot at $outputFile"
    Write-StepSummary "### Scholar sync skipped`n- Runner OS: $env:RUNNER_OS`n- Reason: $($_.Exception.Message)`n- Keeping existing snapshot updated at (UTC): $existingUpdatedAt`n"
    exit 0
  }

  throw
}
