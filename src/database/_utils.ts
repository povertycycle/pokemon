import { PokeAPIData, PokeAPIDataMini, PokeAPISpecies } from "@/common/interfaces/_external";
import { PokemonDetails, Stats } from "@/common/interfaces/pokemon";
import { errorCheck } from "@/common/utils/errorCheck";
import { trimUrl } from "@/common/utils/trimUrl";
import { POKEMON_FETCH_BAR_ID } from "@/constants/constants";
import { BASE_API_URL_POKEMON, BASE_API_URL_SPECIES } from "@/constants/urls";
import { MAX_REQUEST_AT_ONCE } from "../constants/main";

function addProgress(add: boolean) {
    let elem = document.getElementById(POKEMON_FETCH_BAR_ID)?.children;
    if (add) {
        if (elem?.[0]) {
            (elem[0] as HTMLDivElement).style.width = String(parseInt((elem[0] as HTMLDivElement).style.width) + 1) + "px";
        }
    } else {
        if (elem?.length && elem?.[elem?.length]) {
            (elem[elem.length] as HTMLDivElement).style.width = String(parseInt((elem[elem.length] as HTMLDivElement).style.width) + 1) + "px";
        }
    }
}


export async function doBatchProcess(urls: string[], processData: (data: any) => void): Promise<boolean> {
    function fetchData(url: string): Promise<boolean> {
        return new Promise(result => {
            fetch(url).then(res=>errorCheck(res)).then(res=>{
                processData(res);
            }).catch(err=>{result(false)}).finally(()=> {result(true)});
        })
    }
    function doSequenceProcess(i: number) {
        return new Promise(async result => {
            let curr=i;
            let url=urls[curr];
            while (!!url) {
                await fetchData(url).then(res=>{
                    addProgress(res);
                }).finally(() => {
                    curr=curr+MAX_REQUEST_AT_ONCE;
                    url=urls[curr];
                })
            }
            result(true);
        })
    }

    return new Promise(async result => {
        let promise = [];
        for (let i=0;i<MAX_REQUEST_AT_ONCE;i++) {
            promise.push(doSequenceProcess(i));
        }
        Promise.all(promise).finally(() => {
            result(true);
        })
    })
}

export function fetchPokemonData(id: string, species: string): Promise<PokemonDetails | null> {
    return new Promise(result => {
        Promise.all([
            fetch(`${BASE_API_URL_POKEMON}/${id}`),
            fetch(`${BASE_API_URL_SPECIES}/${species}`),
        ]).then(([baseRequest, speciesRequest]) => {
            return Promise.all([errorCheck(baseRequest), errorCheck(speciesRequest)]);
        }).then(([baseRes, speciesRes]: [PokeAPIData, PokeAPISpecies]) => {
            let payload: PokemonDetails = {
                stats: baseRes.stats.reduce((acc, statData) => {
                    acc[statData.stat.name] = {
                        baseStat: statData.base_stat,
                        effort: statData.effort,
                    }
                    return acc;
                }, {} as Stats),
                sprites: {
                    others: Object.entries(baseRes.sprites.other).reduce((acc, [key, value]) => {
                        const defaultImage = value["front_default"];
                        if (defaultImage) {
                            acc[key] = defaultImage;
                        }
                        return acc;
                    }, {} as Record<string, string>),
    
                    versions: Object.entries(baseRes.sprites.versions).reduce((acc, [gen, value]) => {
                        const sprites = Object.entries(value).reduce((acc2, [game, views]) => {
                            if (views["front_default"]) {
                                acc2[game] = views["front_default"];
                            }
                            return acc2;
                        }, {} as Record<string, string>);
                        if (Object.keys(sprites).length > 0) {
                            acc[gen] = sprites;
                        }
                        return acc;
                    }, {} as Record<string, Record<string, string>>)
                },
                moves: baseRes.moves.reduce((acc, move) => {
                    acc[move.move.name] = move.version_group_details.reduce((acc: Record<string, string[]>, details) => {
                        const parsedName = `${details.move_learn_method.name}${!!details.level_learned_at ? `@${details.level_learned_at}` : ""}`
                        let hasDetails = acc[parsedName];
                        if (!!hasDetails) {
                            hasDetails.push(details.version_group.name);
                        } else {
                            hasDetails = [details.version_group.name];
                        }
                        return acc;
                    }, {});
                    return acc;
                }, {} as Record<string, Record<string, string[]>>),
                heldItemIDs: baseRes.held_items.map(item => trimUrl(item.item.url)),
                metaData: {
                    cries: baseRes.cries.latest,
                    baseExperience: baseRes.base_experience,
                    height: baseRes.height,
                    weight: baseRes.weight,
                    details: {
                        baseHappiness: speciesRes.base_happiness,
                        captureRate: speciesRes.capture_rate,
                        growthRate: speciesRes.growth_rate.name,
                        eggGroups: speciesRes.egg_groups.map(group => group.name),
                        genderRate: speciesRes.gender_rate,
                        hatchCounter: speciesRes.hatch_counter,
                    },
                },
                speciesData: {
                    genera: speciesRes.genera.find(genus => genus.language.name === "en")?.genus,
                    habitat: speciesRes.habitat.name,
                    shape: speciesRes.shape.name,
                    isBaby: speciesRes.is_baby,
                    isLegendary: speciesRes.is_legendary,
                    isMythical: speciesRes.is_mythical,
                    flavorText: speciesRes.flavor_text_entries.filter(flavorText => flavorText.language.name === "en").at(-1)?.flavor_text,
                },
                evolutions: {
                    chain: trimUrl(speciesRes.evolution_chain.url),
                    variants: speciesRes.varieties.map(variant => trimUrl(variant.pokemon.url)),
                    formDescription: speciesRes.form_descriptions.find(desc => desc.language.name === "en")?.description,
                    formSwitchable: speciesRes.forms_switchable,
                },
                encounters: {
                    palPark: speciesRes.pal_park_encounters.map(enc => ({ area: enc.area.name, base_score: enc.base_score, rate: enc.rate }))
                }
            };
            result(payload);
        }).catch(err => {
            result(null)
        })
    })    
}

