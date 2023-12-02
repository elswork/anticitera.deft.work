const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

async function extractMetadataAndImages(url) {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $('meta[property="og:title"]').attr('content') || $('title').text();
    const description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content');

    // Usar un Set para almacenar URLs únicas de imágenes
    const imageUrls = new Set();

    // Obtener imágenes de las etiquetas Open Graph
    $('meta[property="og:image"]').each((i, el) => {
        const src = $(el).attr('content');
        if (src) {
            imageUrls.add(src);
        }
    });

    // Buscar en el cuerpo del documento si se necesitan más imágenes
    if (imageUrls.size < 3) {
        $('img').each((i, elem) => {
            const src = $(elem).attr('src');
            if (src) {
                imageUrls.add(src);
            }
        });
    }

    // Convertir el Set en un Array y limitar a las 3 primeras imágenes
    const uniqueImageUrls = Array.from(imageUrls).slice(0, 3);

    return { title, description, imageUrls: uniqueImageUrls };
}

async function processFile(filePath) {
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const linksData = []; // Arreglo para almacenar los datos de cada link

    for await (const line of rl) {
        if (line) {
            try {
                const metadata = await extractMetadataAndImages(line);
                // Agregar los metadatos al arreglo
                linksData.push({ url: line, ...metadata });
            } catch (error) {
                console.error(`Error processing URL ${line}:`, error);
            }
        }
    }

    // Escribir el arreglo como un archivo JSON
    fs.writeFileSync(path.join(__dirname, '_data', 'links.json'), JSON.stringify(linksData, null, 2));
}

const linksFilePath = path.join(__dirname, '_data', 'links');
processFile(linksFilePath);
