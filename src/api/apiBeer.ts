import ROOT_ENDPOINT from "../constants/apiEndpoints";
import { IBeer } from "../types/beer";

export async function getBeers(query?: string): Promise<IBeer[]> {
    try {
        const response = await fetch(query ? `${ROOT_ENDPOINT}?${query}` : ROOT_ENDPOINT);
        if (response.ok !== true) {
            throw await response.json();
        }
        return response.json();
    } catch (error) {
        throw (error);
    }
}
