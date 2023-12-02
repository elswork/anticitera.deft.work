const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

function emptyDirectory(directory) {
    // Leer todos los archivos en el directorio
    fs.readdir(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
            });
        }
    });
}

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

async function createMarkdownFile(url, metadata) {
    let content = `---
title: "${metadata.title}"
description: "${metadata.description}"
url: "${url}"
---

# [${metadata.title}](${url})

${metadata.description}

`;

    // Añadir imágenes al contenido Markdown
    metadata.imageUrls.forEach(imgUrl => {
        content += `![Imagen](${imgUrl})\n`;
    });

    const filename = path.basename(url) + '.md';
    const linksDir = path.join(__dirname, 'content', 'links');
    if (!fs.existsSync(linksDir)) {
        fs.mkdirSync(linksDir, { recursive: true });
    }
    const filePath = path.join(linksDir, filename);
    fs.writeFileSync(filePath, content);
}

async function processFile(filePath) {
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        if (line) {
            try {
                const metadata = await extractMetadataAndImages(line);
                createMarkdownFile(line, metadata);
            } catch (error) {
                console.error(`Error processing URL ${line}:`, error);
            }
        }
    }
}

const linksFilePath = path.join(__dirname, '_data', 'links');
const linksDir = path.join(__dirname, 'content', 'links');

// Vaciar la carpeta antes de procesar nuevos archivos
emptyDirectory(linksDir);
processFile(linksFilePath);
