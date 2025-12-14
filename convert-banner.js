const fs = require('fs');
const path = require('path');

// Simple WebP to PNG converter using canvas (if available) or just copy
async function convertWebPtoPNG() {
    const inputPath = path.join(__dirname, 'public/img/Cabecera.webp');
    const outputPath = path.join(__dirname, 'public/img/Cabecera.png');

    try {
        // Try using sharp if available
        const sharp = require('sharp');
        await sharp(inputPath)
            .png({ quality: 100, compressionLevel: 6 })
            .toFile(outputPath);
        console.log('✓ Converted using sharp');

        const stats = fs.statSync(outputPath);
        console.log(`✓ Created: ${outputPath}`);
        console.log(`✓ Size: ${(stats.size / 1024).toFixed(2)} KB`);
    } catch (error) {
        console.error('Error:', error.message);
        console.log('\nNote: Install sharp for image conversion:');
        console.log('  npm install sharp');
        process.exit(1);
    }
}

convertWebPtoPNG();
