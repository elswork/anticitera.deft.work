const cheerio = require('cheerio');

class AllMarkdown {
    data() {
        return {
            pagination: {
                data: "collections.all",
                size: 1,
                alias: "item",
            },
            eleventyExcludeFromCollections: true,
            permalink: (data) => {
                const item = data.item;
                if (!item.url ||
                    item.url.endsWith('.xml') ||
                    item.url.endsWith('.json') ||
                    item.url.endsWith('.css') ||
                    item.url.endsWith('.js') ||
                    item.url.endsWith('.txt') ||
                    item.url.endsWith('.png') ||
                    item.url.endsWith('.jpg') ||
                    item.url.endsWith('.webp') ||
                    item.url.endsWith('.svg')) {
                    return false;
                }
                if (item.url === '/') {
                    return "/index.md";
                }
                // Remove trailing slash and add .md
                let cleanUrl = item.url.replace(/\/$/, "");
                return `${cleanUrl}.md`;
            }
        };
    }

    render(data) {
        const item = data.item;
        const title = item.data.title || item.fileSlug;
        const content = item.content || "";

        // Simple text extraction using Cheerio
        const $ = cheerio.load(content);

        // To preserve some spacing between paragraphs, we can process blocks
        $('h1, h2, h3, h4, h5, h6, p, li, blockquote').append('\n\n');
        const textContent = $.text().trim();

        return `# ${title}
${item.date ? `Fecha: ${item.date}\n` : ''}URL: https://anticitera.deft.work${item.url}

---

${textContent}
`;
    }
}

module.exports = AllMarkdown;
