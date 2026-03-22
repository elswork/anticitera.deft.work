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
                if (!item.url) return false;

                const url = item.url.toLowerCase();
                
                // Exclude static assets and tags
                if (url.endsWith('.xml') ||
                    url.endsWith('.json') ||
                    url.endsWith('.css') ||
                    url.endsWith('.js') ||
                    url.endsWith('.txt') ||
                    url.endsWith('.png') ||
                    url.endsWith('.jpg') ||
                    url.endsWith('.webp') ||
                    url.endsWith('.svg') ||
                    url.includes('/tags/')) {
                    return false;
                }

                if (item.url === '/') {
                    return "/index.md";
                }
                
                // Remove trailing slash and add .md
                let cleanUrl = item.url.replace(/\/$/, "");
                if (!cleanUrl) return false;
                
                return `${cleanUrl}.md`;
            }
        };
    }

    render(data) {
        const item = data.item;
        const title = item.data.title || item.fileSlug;
        const content = item.content || "";

        const $ = cheerio.load(content);

        $('img').each((i, el) => {
            const alt = $(el).attr('alt') || '';
            let src = $(el).attr('src') || '';
            if (src && !src.startsWith('http')) {
                src = `https://anticitera.deft.work${src.startsWith('/') ? '' : '/'}${src}`;
            }
            $(el).replaceWith(`![${alt}](${src})`);
        });

        $('a').each((i, el) => {
            const text = $(el).text().trim();
            let href = $(el).attr('href') || '';

            if (href && !href.startsWith('http') && !href.startsWith('#')) {
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

        $('li').each((i, el) => {
            $(el).prepend('* ');
        });

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
