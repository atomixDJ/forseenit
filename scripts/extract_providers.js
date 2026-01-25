
const fs = require('fs');
const providers = JSON.parse(fs.readFileSync('providers.json', 'utf8'));

const targetNames = ["Netflix", "Disney Plus", "Amazon Prime Video", "Max", "Apple TV Plus", "Hulu", "Apple TV", "HBO Max", "Google Play Movies"];

const found = providers.results.filter(p => targetNames.includes(p.provider_name));

console.log(JSON.stringify(found.map(p => ({
    id: p.provider_id,
    name: p.provider_name,
    logo: p.logo_path
})), null, 2));
Broadway
