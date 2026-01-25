
import { getWatchProviders } from "../lib/tmdb";

async function main() {
    const providers = await getWatchProviders("US");
    const popular = [8, 337, 119, 1899, 350, 15, 2, 3];
    const filtered = providers.results.filter((p: any) => popular.includes(p.provider_id));
    console.log(JSON.stringify(filtered, null, 2));
}

main().catch(console.error);
