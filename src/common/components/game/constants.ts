export const API_HOME = "https://pokeapi.co";
export const BASE_API_URL_POKEMON = `${API_HOME}/api/v2/pokemon`;
export const BASE_API_URL_ABILITY = `${API_HOME}/api/v2/ability`;
export const BASE_API_URL_SPECIES = `${API_HOME}/api/v2/pokemon-species`;
export const BASE_API_URL_MOVES = `${API_HOME}/api/v2/move`;
export const BASE_API_URL_EVOLUTION = `${API_HOME}/api/v2/evolution-chain`;
export const BASE_API_URL_ITEM = `${API_HOME}/api/v2/item`;
export const BASE_API_URL_MACHINES = `${API_HOME}/api/v2/machine`;
export const BASE_API_URL_LOCATIONS = `${API_HOME}/api/v2/location-area`;

export const SENTENCES_REGEX = /(?=[^])(?:\P{Sentence_Terminal}|\p{Sentence_Terminal}(?!['"`\p{Close_Punctuation}\p{Final_Punctuation}\s]))*(?:\p{Sentence_Terminal}+['"`\p{Close_Punctuation}\p{Final_Punctuation}]*|$)/guy