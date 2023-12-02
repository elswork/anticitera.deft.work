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

    // Extraer URLs de imágenes
    const imageUrls = [];
    $('img').each((i, elem) => {
        const src = $(elem).attr('src');
        if (src) {
            imageUrls.push(src);
        }
    });

    return { title, description, imageUrls };
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
processFile(linksFilePath);
