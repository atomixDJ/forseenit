
const HTTPS = require('https');
const API_KEY = '5cc19c1543160a2b000109ae9befe421'; // Using the key from the error report if available or common one
// Actually, I'll just use a direct URL and parse it.

const providersToFind = [8, 337, 119, 1899, 350, 15, 2];

HTTPS.get('https://api.themoviedb.org/3/watch/providers/movie?api_key=' + API_KEY + '&watch_region=US', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            const found = json.results.filter(p => providersToFind.includes(p.provider_id));
            console.log(JSON.stringify(found, null, 2));
        } catch (e) {
            console.error('Error parsing JSON', e);
        }
    });
}).on('error', (err) => {
    console.error('Error fetching providers', err);
});
Broadway
