// %%%%26.04.2026%%%%%%% Generate a lightweight regional map from Natural Earth data
'use strict'

const fs = require('fs')
const path = require('path')

const inputPath = process.argv[2]
const outputPath = process.argv[3]

if (!inputPath || !outputPath) {
  throw new Error('Usage: node generate-academic-map.js <countries.geojson> <output.svg>')
}

const geoJson = JSON.parse(fs.readFileSync(path.resolve(inputPath), 'utf8'))
const sourceScale = path.basename(inputPath).match(/ne_(\d+m)_/)?.[1] || 'vector'
// %%%%26.04.2026%%%%%%% extend the generated map to include Shenzhen
const bounds = {
  minLongitude: -15,
  maxLongitude: 120,
  minLatitude: 15,
  maxLatitude: 65
}
// %%%%26.04.2026%%%%%%% extend the generated map to include Shenzhen
const width = 1200
const height = 600

// %%%%26.04.2026%%%%%%% escape Natural Earth labels before writing SVG attributes and text
const escapeXml = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;')
// %%%%26.04.2026%%%%%%% escape Natural Earth labels before writing SVG attributes and text

const clipEdge = (points, isInside, intersection) => {
  if (!points.length) return []

  const clipped = []
  let previous = points[points.length - 1]
  let previousInside = isInside(previous)

  points.forEach((current) => {
    const currentInside = isInside(current)

    if (currentInside !== previousInside) {
      clipped.push(intersection(previous, current))
    }
    if (currentInside) clipped.push(current)

    previous = current
    previousInside = currentInside
  })

  return clipped
}

const intersectLongitude = (start, end, longitude) => {
  const delta = end[0] - start[0]
  const ratio = Math.abs(delta) < Number.EPSILON ? 0 : (longitude - start[0]) / delta
  return [longitude, start[1] + ratio * (end[1] - start[1])]
}

const intersectLatitude = (start, end, latitude) => {
  const delta = end[1] - start[1]
  const ratio = Math.abs(delta) < Number.EPSILON ? 0 : (latitude - start[1]) / delta
  return [start[0] + ratio * (end[0] - start[0]), latitude]
}

const clipRing = (ring) => {
  let points = ring.map(([longitude, latitude]) => [longitude, latitude])

  points = clipEdge(
    points,
    ([longitude]) => longitude >= bounds.minLongitude,
    (start, end) => intersectLongitude(start, end, bounds.minLongitude)
  )
  points = clipEdge(
    points,
    ([longitude]) => longitude <= bounds.maxLongitude,
    (start, end) => intersectLongitude(start, end, bounds.maxLongitude)
  )
  points = clipEdge(
    points,
    ([, latitude]) => latitude >= bounds.minLatitude,
    (start, end) => intersectLatitude(start, end, bounds.minLatitude)
  )
  points = clipEdge(
    points,
    ([, latitude]) => latitude <= bounds.maxLatitude,
    (start, end) => intersectLatitude(start, end, bounds.maxLatitude)
  )

  return points.length >= 3 ? points : []
}

const project = ([longitude, latitude]) => [
  ((longitude - bounds.minLongitude) / (bounds.maxLongitude - bounds.minLongitude)) * width,
  ((bounds.maxLatitude - latitude) / (bounds.maxLatitude - bounds.minLatitude)) * height
]

const squaredSegmentDistance = (point, segmentStart, segmentEnd) => {
  let x = segmentStart[0]
  let y = segmentStart[1]
  let deltaX = segmentEnd[0] - x
  let deltaY = segmentEnd[1] - y

  if (deltaX !== 0 || deltaY !== 0) {
    const ratio = (
      (point[0] - x) * deltaX + (point[1] - y) * deltaY
    ) / (deltaX * deltaX + deltaY * deltaY)

    if (ratio > 1) {
      x = segmentEnd[0]
      y = segmentEnd[1]
    } else if (ratio > 0) {
      x += deltaX * ratio
      y += deltaY * ratio
    }
  }

  deltaX = point[0] - x
  deltaY = point[1] - y
  return deltaX * deltaX + deltaY * deltaY
}

const simplifyProjectedRing = (points, tolerance = 0.55) => {
  if (points.length <= 3) return points

  const simplified = [points[0]]
  const squaredTolerance = tolerance * tolerance

  const simplifySection = (firstIndex, lastIndex) => {
    let farthestIndex = 0
    let farthestDistance = squaredTolerance

    for (let index = firstIndex + 1; index < lastIndex; index += 1) {
      const distance = squaredSegmentDistance(points[index], points[firstIndex], points[lastIndex])
      if (distance > farthestDistance) {
        farthestIndex = index
        farthestDistance = distance
      }
    }

    if (!farthestIndex) return
    if (farthestIndex - firstIndex > 1) simplifySection(firstIndex, farthestIndex)
    simplified.push(points[farthestIndex])
    if (lastIndex - farthestIndex > 1) simplifySection(farthestIndex, lastIndex)
  }

  simplifySection(0, points.length - 1)
  simplified.push(points[points.length - 1])
  return simplified
}

const ringToPath = (ring) => {
  const clippedRing = clipRing(ring)
  if (!clippedRing.length) return ''

  const projectedRing = clippedRing.map(project)
  const firstPoint = projectedRing[0]
  const lastPoint = projectedRing[projectedRing.length - 1]
  if (
    projectedRing.length > 3
    && firstPoint[0] === lastPoint[0]
    && firstPoint[1] === lastPoint[1]
  ) {
    projectedRing.pop()
  }

  return simplifyProjectedRing(projectedRing)
    .map((point, index) => {
      const [x, y] = point
      return (index === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1)
    })
    .join('') + 'Z'
}

const countryPaths = geoJson.features.map((feature) => {
  const geometry = feature.geometry
  if (!geometry || !['Polygon', 'MultiPolygon'].includes(geometry.type)) return ''

  const polygons = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates
  const pathData = polygons
    .flatMap((polygon) => polygon)
    .map(ringToPath)
    .filter(Boolean)
    .join('')

  if (!pathData) return ''

  const colorIndex = Number(feature.properties?.MAPCOLOR7 || 1)
  // %%%%26.04.2026%%%%%%% retain country identity for filtered visited-country highlighting
  const countryName = escapeXml(feature.properties?.ADMIN || feature.properties?.NAME_EN || feature.properties?.NAME || '')
  return '    <path class="map-country map-color-' + colorIndex + '" data-country="' + countryName + '" d="' + pathData + '"/>'
  // %%%%26.04.2026%%%%%%% retain country identity for filtered visited-country highlighting
}).filter(Boolean)

// %%%%26.04.2026%%%%%%% progressive country labels revealed as the vector map zooms
const countryLabels = geoJson.features.map((feature) => {
  const properties = feature.properties || {}
  const longitude = Number(properties.LABEL_X)
  const latitude = Number(properties.LABEL_Y)
  if (
    properties.ADMIN !== properties.SOVEREIGNT
    ||
    !Number.isFinite(longitude)
    || !Number.isFinite(latitude)
    || longitude < bounds.minLongitude
    || longitude > bounds.maxLongitude
    || latitude < bounds.minLatitude
    || latitude > bounds.maxLatitude
  ) return ''

  const countryName = properties.ADMIN || properties.NAME_EN || properties.NAME
  if (!countryName) return ''
  const labelRank = Number(properties.LABELRANK || 6)
  // %%%%26.04.2026%%%%%%% show Ukraine at the same zoom threshold as Belarus
  const labelClass = countryName === 'Ukraine'
    ? 'standard'
    : labelRank <= 3 ? 'major' : labelRank <= 5 ? 'standard' : 'minor'
  // %%%%26.04.2026%%%%%%% show Ukraine at the same zoom threshold as Belarus
  const [x, y] = project([longitude, latitude])
  return '    <text class="map-country-label map-country-label--' + labelClass
    + '" data-country="' + escapeXml(countryName) + '" x="' + x.toFixed(1) + '" y="' + y.toFixed(1)
    + '">' + escapeXml(properties.NAME_EN || countryName) + '</text>'
}).filter(Boolean)
// %%%%26.04.2026%%%%%%% progressive country labels revealed as the vector map zooms

const longitudeLines = [0, 30, 60, 90, 120].map((longitude) => {
  const [x] = project([longitude, bounds.minLatitude])
  return '      <path d="M' + x.toFixed(1) + ' 0V' + height + '"/>'
})
const latitudeLines = [20, 30, 40, 50, 60].map((latitude) => {
  const [, y] = project([bounds.minLongitude, latitude])
  return '      <path d="M0 ' + y.toFixed(1) + 'H' + width + '"/>'
})

const svg = [
  '<!-- %%%%26.04.2026%%%%%%% Accurate lightweight map generated from Natural Earth ' + sourceScale + ' -->',
  '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid meet" role="img" aria-labelledby="map-title map-description">',
  '  <title id="map-title">Europe, North Africa and Asia</title>',
  '  <desc id="map-description">Geographically accurate regional map based on public-domain Natural Earth country boundaries.</desc>',
  '  <metadata>Derived from Natural Earth ' + sourceScale + ' Admin 0 Countries, public domain.</metadata>',
  '  <defs>',
  '    <linearGradient id="map-water" x1="0" y1="0" x2="1" y2="1">',
  '      <stop offset="0" stop-color="#dceff4"/>',
  '      <stop offset="0.52" stop-color="#f1f9fa"/>',
  '      <stop offset="1" stop-color="#d7eaf0"/>',
  '    </linearGradient>',
  '    <filter id="map-shadow" x="-10%" y="-10%" width="120%" height="120%">',
  '      <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#173b6c" flood-opacity=".13"/>',
  '    </filter>',
  '  </defs>',
  '  <rect width="1200" height="600" fill="url(#map-water)"/>',
  '  <g class="map-grid" fill="none" stroke="#6ea8ba" stroke-width="1" stroke-dasharray="4 8" opacity=".22">',
  ...longitudeLines,
  ...latitudeLines,
  '  </g>',
  '  <g class="map-countries" fill-rule="evenodd" stroke="#89a6af" stroke-width="1.1" stroke-linejoin="round" filter="url(#map-shadow)">',
  ...countryPaths,
  '  </g>',
  // %%%%26.04.2026%%%%%%% keep generated fallback labels hidden until interactive geometry is ready
  '  <!-- %%%%26.04.2026%%%%%%% labels stay hidden in the unmanaged image fallback -->',
  '  <g class="map-region-labels" fill="#173b6c" font-family="Poppins, sans-serif" font-size="13" font-weight="700" letter-spacing="2.4" opacity="0">',
  '    <text x="173" y="228">EUROPE</text>',
  '    <text x="660" y="315">CENTRAL ASIA</text>',
  '    <text x="876" y="440">SOUTH ASIA</text>',
  '    <text x="205" y="520">NORTH AFRICA</text>',
  '  </g>',
  '  <g class="map-country-labels" fill="#173b6c" font-family="Poppins, sans-serif" font-size="12" font-weight="700" text-anchor="middle" opacity="0">',
  ...countryLabels,
  '  </g>',
  '  <!-- %%%%26.04.2026%%%%%%% labels stay hidden in the unmanaged image fallback -->',
  // %%%%26.04.2026%%%%%%% keep generated fallback labels hidden until interactive geometry is ready
  '  <style>',
  '    .map-color-1{fill:#fbf9ef}.map-color-2{fill:#f3f7ef}.map-color-3{fill:#fffaf0}.map-color-4{fill:#edf5f1}',
  '    .map-color-5{fill:#f7f7ed}.map-color-6{fill:#eef6f2}.map-color-7{fill:#fff5dd}',
  '  </style>',
  '</svg>',
  '<!-- %%%%26.04.2026%%%%%%% Accurate lightweight map generated from Natural Earth ' + sourceScale + ' -->',
  ''
].join('\n')

fs.mkdirSync(path.dirname(path.resolve(outputPath)), { recursive: true })
fs.writeFileSync(path.resolve(outputPath), svg, 'utf8')
console.log('Generated ' + outputPath + ' with ' + countryPaths.length + ' country shapes')
// %%%%26.04.2026%%%%%%% Generate a lightweight regional map from Natural Earth data
