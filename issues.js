const fetch = require('node-fetch');
const fs = require('fs');

async function fetchGitHubIssues() {
    const url = 'https://api.github.com/repos/elswork/anticitera.deft.work/issues';
    const headers = {
        'User-Agent': 'anticitera-build-bot'
    };
    if (process.env.GITHUB_TOKEN) {
        headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
            console.warn(`[WARN] GitHub API devolvió status ${response.status} ${response.statusText}`);
            return null;
        }
        const text = await response.text();
        try {
            return JSON.parse(text);
        } catch (e) {
            console.warn('[WARN] La respuesta de GitHub no es JSON válido (posible rate-limit o captcha HTML):', text.substring(0, 120));
            return null;
        }
    } catch (err) {
        console.warn('[WARN] Error de red al consultar issues de GitHub:', err.message);
        return null;
    }
}

fetchGitHubIssues().then(issues => {
    if (issues && Array.isArray(issues)) {
        fs.writeFile('_data/issues.json', JSON.stringify(issues, null, 2), err => {
            if (err) {
                console.error('Error al escribir el archivo:', err);
            } else {
                console.log('Archivo _data/issues.json guardado con éxito.');
            }
        });
    } else {
        console.log('Conservando _data/issues.json existente por fallback.');
        if (!fs.existsSync('_data/issues.json')) {
            fs.writeFileSync('_data/issues.json', '[]');
        }
    }
}).catch(err => {
    console.error('Error no capturado en fetchGitHubIssues:', err);
    if (!fs.existsSync('_data/issues.json')) {
        fs.writeFileSync('_data/issues.json', '[]');
    }
});
