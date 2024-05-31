export function capitalize(s?:string|null){return(s?.split(/[.,\/ -]/).map(t=>(`${t.charAt(0).toUpperCase()}${t.slice(1).toLowerCase()}`)).join(" ")??"")}
