#!/usr/bin/env node
/**
 * Builds a single self-contained HTML file from prototype.html
 * by embedding all screen images as base64 data URIs.
 * Output: gifting-northstar-standalone.html
 * Share this one file — no server, no folder, no dependencies.
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC  = resolve(ROOT, 'prototype.html')
const OUT  = resolve(ROOT, 'gifting-northstar-standalone.html')
const IMGS = resolve(ROOT, 'images')

console.log('Reading prototype.html…')
let html = readFileSync(SRC, 'utf8')

// Find every unique images/ reference in the HTML
const refs = [...new Set((html.match(/images\/[a-z0-9_]+\.png/g) || []))]
console.log(`Embedding ${refs.length} images…`)

for (const ref of refs) {
  const path = resolve(ROOT, ref)
  const b64  = readFileSync(path).toString('base64')
  const uri  = `data:image/png;base64,${b64}`
  html = html.replaceAll(ref, uri)
  const kb = Math.round(b64.length * 0.75 / 1024)
  console.log(`  ✓ ${ref.padEnd(40)} ${kb} KB`)
}

writeFileSync(OUT, html, 'utf8')
const sizeMB = (readFileSync(OUT).length / 1024 / 1024).toFixed(1)
console.log(`\nDone! gifting-northstar-standalone.html — ${sizeMB} MB`)
console.log(`Put this single file in OneDrive and share the link.`)
