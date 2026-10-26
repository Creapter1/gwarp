const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, 'icons', 'gspark.svg');
const sizes = [16, 32, 48, 128];

async function generateIcons() {
  if (!fs.existsSync(svgPath)) {
    console.error('SVG icon not found at:', svgPath);
    process.exit(1);
  }

  for (const size of sizes) {
    const outputPath = path.join(__dirname, 'icons', `icon${size}.png`);
    await sharp(svgPath)
      .resize(size, size)
      .png()
      .toFile(outputPath);
    console.log(`Generated: icon${size}.png`);
  }
}

generateIcons().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
