import { sha256 } from 'crypto-hash';
import { IBeer } from '../types/beer';

export default async function hashBeerData(beer: IBeer): Promise<string> {
    const beerString = JSON.stringify(beer);
    return await sha256(beerString);
}