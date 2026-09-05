// %%%%26.04.2026%%%%%%% Generate resilient map data directly from the Talks table
'use strict'

const fs = require('fs')
const path = require('path')

const projectRoot = path.resolve(__dirname, '..')
const talksPath = path.join(projectRoot, 'portfolio-talks.html')
const mapPagePath = path.join(projectRoot, 'portfolio-map.html')
const talksHtml = fs.readFileSync(talksPath, 'utf8')

const decodeEntities = (value) => {
  const namedEntities = {
    amp: '&',
    apos: "'",
    gt: '>',
    laquo: '«',
    lt: '<',
    mdash: '—',
    nbsp: ' ',
    ndash: '–',
    quot: '"',
    raquo: '»'
  }

  return value.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (entity, code) => {
    if (code.startsWith('#x')) return String.fromCodePoint(parseInt(code.slice(2), 16))
    if (code.startsWith('#')) return String.fromCodePoint(parseInt(code.slice(1), 10))
    return namedEntities[code.toLowerCase()] || entity
  })
}

const textFromHtml = (value) => decodeEntities(
  value
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
).replace(/\s+/g, ' ').trim()

const cleanLocation = (location) => location
  .replace(/,?\s*\(online\)/i, '')
  .replace(/,\s*Presidium of RAS/i, '')
  .replace(/\s+/g, ' ')
  .trim()

const activities = [...talksHtml.matchAll(/<tr\s+class=["'](conference|summer_school)["'][^>]*>([\s\S]*?)<\/tr>/gi)]
  .map((rowMatch) => {
    const type = rowMatch[1] === 'summer_school' ? 'event' : 'talk'
    const rowHtml = rowMatch[2]
    const cells = [...rowHtml.matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map((cell) => cell[1])

    if (cells.length < 4) return null

    const rawLocation = textFromHtml(cells[3])
    const normalizedLocation = cleanLocation(rawLocation)
    const locationParts = normalizedLocation.split(',').map((part) => part.trim())
    const sourceLink = [...rowHtml.matchAll(/href\s*=\s*["']([^"']*)["']/gi)]
      .map((link) => decodeEntities(link[1]).trim())
      .find(Boolean) || ''
    const date = textFromHtml(cells[0])

    return {
      city: locationParts[0],
      country: locationParts[locationParts.length - 1],
      date,
      event: textFromHtml(cells[2]),
      online: /\(online\)/i.test(rawLocation),
      type,
      url: sourceLink,
      year: date.match(/\b20\d{2}\b/)?.[0] || 'Other'
    }
  })
  .filter(Boolean)

const startMarker = '  <!-- %%%%26.04.2026%%%%%%% embedded Talks map data start -->'
const endMarker = '  <!-- %%%%26.04.2026%%%%%%% embedded Talks map data end -->'
const embeddedJson = JSON.stringify(activities, null, 2).replace(/</g, '\\u003c')
const replacement = [
  startMarker,
  '  <script type="application/json" id="academic-talks-data">',
  embeddedJson,
  '  </script>',
  endMarker
].join('\n')
const mapPageHtml = fs.readFileSync(mapPagePath, 'utf8')
const blockStart = mapPageHtml.indexOf(startMarker)
const blockEnd = mapPageHtml.indexOf(endMarker, blockStart)

if (blockStart < 0 || blockEnd < 0) {
  throw new Error('Embedded Talks map data markers were not found in portfolio-map.html')
}

const nextMapPageHtml = mapPageHtml.slice(0, blockStart)
  + replacement
  + mapPageHtml.slice(blockEnd + endMarker.length)

fs.writeFileSync(mapPagePath, nextMapPageHtml, 'utf8')
console.log('Embedded ' + activities.length + ' map activities in ' + mapPagePath)
// %%%%26.04.2026%%%%%%% Generate resilient map data directly from the Talks table
