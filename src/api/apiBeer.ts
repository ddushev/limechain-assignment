import ROOT_ENDPOINT from "../constants/apiEndpoints";
import { IBeer } from "../types/beer";

async function getRequest(endpoint: string | null, query?: string | null) {
    let buildEndpoint = ROOT_ENDPOINT;
    if (endpoint) {
        buildEndpoint += `${endpoint}`;
    }

    if (query) {
        buildEndpoint += `?${query}`
    }

    try {
        const response = await fetch(buildEndpoint);
        if (response.ok !== true) {
            throw await response.json();
        }
        return response.json();
    } catch (error) {
        throw (error);
    }
}

export async function getAllBeers(): Promise<IBeer[]> {
    return getRequest(null, null);
}

export async function getSearchedBeers(query: string): Promise<IBeer[]> {
    return getRequest(null, query);
}

export async function getRandomBeer(): Promise<IBeer[]> {
    return getRequest('/random', null);
}
