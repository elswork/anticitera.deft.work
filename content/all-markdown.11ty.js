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

        // Simple text extraction and image conversion using Cheerio
        const $ = cheerio.load(content);

        // Convert <img> tags to Markdown syntax
        $('img').each((i, el) => {
            const alt = $(el).attr('alt') || '';
            let src = $(el).attr('src') || '';
            if (src && !src.startsWith('http')) {
                src = `https://anticitera.deft.work${src.startsWith('/') ? '' : '/'}${src}`;
            }
            $(el).replaceWith(`![${alt}](${src})`);
        });

        // Convert <a> tags to Markdown links
        $('a').each((i, el) => {
            const text = $(el).text().trim();
            let href = $(el).attr('href') || '';

            if (href && !href.startsWith('http') && !href.startsWith('#')) {
                // Internal link: convert to .md version
                if (href === '/') {
                    href = 'https://anticitera.deft.work/index.md';
                } else {
                    href = `https://anticitera.deft.work${href.replace(/\/$/, "")}.md`;
                }
            }

            if (text && href) {
                $(el).replaceWith(`[${text}](${href})`);
            }
        });

        // Handle lists
        $('li').each((i, el) => {
            $(el).prepend('* ');
        });

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
