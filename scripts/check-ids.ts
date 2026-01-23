import fs from 'fs';
import path from 'path';

function loadEnv() {
    const env: Record<string, string> = {};
    const files = ['.env', '.env.local'];
    for (const file of files) {
        const envPath = path.resolve(process.cwd(), file);
        if (fs.existsSync(envPath)) {
            const content = fs.readFileSync(envPath, 'utf8');
            content.split('\n').forEach(line => {
                const [key, ...valueParts] = line.split('=');
                if (key && valueParts.length > 0) {
                    let value = valueParts.join('=').trim();
                    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
                    if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
                    env[key.trim()] = value;
                }
            });
        }
    }
    return env;
}

const env = loadEnv();
const TMDB_API_KEY = env.TMDB_API_KEY;

async function check(id: number) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`);
    const data = await res.json();
    console.log(`\nID ${id}:`);
    console.log(`  Title: ${data.title}`);
    console.log(`  Release: ${data.release_date}`);

    const relRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${TMDB_API_KEY}`);
    const relData = await relRes.json();
    const us = relData.results?.find((r: any) => r.iso_3166_1 === 'US');
    if (us) {
        const theatrical = us.release_dates.find((r: any) => r.type === 3) || us.release_dates.find((r: any) => r.type === 2) || us.release_dates[0];
        console.log(`  US Release: ${theatrical?.release_date}`);
        const year = new Date(theatrical?.release_date).getFullYear();
        console.log(`  Eligibility Year: ${year}`);
    }
}

async function main() {
    console.log('Checking Bugonia (1014505):');
    await check(1014505);

    console.log('\n\nChecking Sinners (1177618):');
    await check(1177618);
}

main();
