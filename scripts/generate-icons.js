// Run once: node scripts/generate-icons.js
// Generates /public/icons/icon-192.png and icon-512.png
// Requires sharp (included with Next.js): no extra install needed

const path = require('path')
const fs = require('fs')

const sharp = require(path.join(__dirname, '../node_modules/sharp'))

const outDir = path.join(__dirname, '../public/icons')
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

const svg = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" fill="#0a0a0f"/>
  <text
    x="50%"
    y="57%"
    dominant-baseline="middle"
    text-anchor="middle"
    font-family="system-ui, sans-serif"
    font-weight="800"
    font-size="${size * 0.52}"
    fill="#00e5ff"
    letter-spacing="-2"
  >V</text>
</svg>`

async function generate() {
  for (const size of [192, 512]) {
    const file = path.join(outDir, `icon-${size}.png`)
    await sharp(Buffer.from(svg(size))).png().toFile(file)
    console.log(`✓ ${file}`)
  }
  console.log('Icons generated.')
}

generate().catch(console.error)
