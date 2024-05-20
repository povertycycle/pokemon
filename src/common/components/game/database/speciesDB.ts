import { cacheIsAllowed } from "../../home/cache/utils";
import { BASE_API_URL_SPECIES } from "../constants";
import { SpeciesData } from "../contents/pokemon/interface";
import { POKEMON_DB, Stores } from "./db";

function fetchSpeciesData(species: string): Promise<SpeciesData> {
    return new Promise(result => {
        fetch(`${BASE_API_URL_SPECIES}/${species}`).then(res => {
            if (!res.ok) throw new Error("Failed to fetch data from API");
    
            return res.json();
        }).then(res => {
            const speciesData = {
                base_happiness: res.base_happiness,
                capture_rate: res.capture_rate,
                egg_groups: res.egg_groups.map((eG: any) => (eG.name)),
                evolves_from_species: res.evolves_from_species?.name,
                flavor_text_entries: res.flavor_text_entries.reduce((acc: any, fTE: any) => {
                    if (fTE.language.name === "en") {
                        acc.push({version: fTE.version.name, text: fTE.flavor_text})
                    }
                    return acc;
                }, []),
                form_description: res.form_descriptions.reduce((acc: any, fD: any) => {
                    if (fD.language.name === "en") {
                        acc.push(fD.description)
                    }
                    return acc;
                }, []),
                forms_switchable: res.forms_switchable,
                gender_rate: res.gender_rate,
                genera: res.genera.find((g: any) => (g.language.name === "en"))?.genus,
                growth_rate: res.growth_rate?.name,
                habitat: res.habitat?.name,
                hatch_counter: res.hatch_counter,
                is_baby: res.is_baby,
                is_legendary: res.is_legendary,
                is_mythical: res.is_mythical,
                pal_park_encounters: res.pal_park_encounters.map((pPE: any) => ({
                    area: pPE.area.name, base_score: pPE.base_score, rate: pPE.rate
                })),
                pokedex_numbers: res.pokedex_numbers.map((pN: any) => ({
                    pokedex: pN.pokedex.name, entry_number: pN.entry_number
                })),
                shape: res.shape?.name,
                varieties: res.varieties.map((v: any) => (v.pokemon.name))
            }
            result(speciesData);
        })
    })
}

export function fetchSpeciesDetails(species: string): Promise<SpeciesData | null> {
    return new Promise(result => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const speciesTx = db.transaction(Stores.Species, 'readonly');

            if (cacheIsAllowed()) {
                const speciesData = speciesTx.objectStore(Stores.Species).get(species);
                
                speciesData.onsuccess = () => {
                    if (speciesData.result) {
                        result(speciesData.result);
                    } else {
                        fetchSpeciesData(species).then(res => {
                            db.transaction(Stores.Species, 'readwrite').objectStore(Stores.Species).put(res, species);
                            result(res);
                        })
                    }
                }

            } else {
                fetchSpeciesData(species).then(res => {
                    result(res);
                });
            }
        }
    })
}