// %%%%26.04.2026%%%%%%% Synchronize the homepage publication total with the Publications page
'use strict'

const fs = require('fs')
const path = require('path')

const projectRoot = path.resolve(__dirname, '..')
const publicationsPath = path.join(projectRoot, 'portfolio-publication.html')
const homepagePath = path.join(projectRoot, 'index.html')

const publicationsHtml = fs.readFileSync(publicationsPath, 'utf8')
const publicationCount = [...publicationsHtml.matchAll(/<div\s+class=["']portfolio-publication["']\s*>/gi)].length

if (publicationCount <= 0) {
  throw new Error('No publication cards were found in portfolio-publication.html')
}

const homepageHtml = fs.readFileSync(homepagePath, 'utf8')
const counterPattern = /(<span\s+data-publication-count\b[^>]*\bdata-purecounter-end=["'])\d+(["'][^>]*>)\d+(<\/span>)/i

if (!counterPattern.test(homepageHtml)) {
  throw new Error('The homepage publication counter marker was not found in index.html')
}

const synchronizedHomepage = homepageHtml.replace(
  counterPattern,
  `$1${publicationCount}$2${publicationCount}$3`
)

fs.writeFileSync(homepagePath, synchronizedHomepage, 'utf8')
console.log(`Synchronized homepage publication count: ${publicationCount}`)
// %%%%26.04.2026%%%%%%% Synchronize the homepage publication total with the Publications page
