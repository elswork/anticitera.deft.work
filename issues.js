const fetch = require('node-fetch');
const fs = require('fs');

async function fetchGitHubIssues() {
    const url = 'https://api.github.com/repos/elswork/anticitera.deft.work/issues';
    const response = await fetch(url);
    const issues = await response.json();
    return issues;
}

fetchGitHubIssues().then(issues => {
    // Aquí puedes escribir los issues a un archivo o manejarlos como prefieras
    fs.writeFile('_data/issues.json', JSON.stringify(issues, null, 2), err => {
        if (err) {
            console.error('Error al escribir el archivo:', err);
        } else {
            console.log('Archivo guardado con éxito.');
        }
    });
});
