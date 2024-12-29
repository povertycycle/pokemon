import { POKEMON_FETCH_BAR_ID } from "@/common/constants/constants";
import { errorCheck } from "@/common/utils/errorCheck";
import { MAX_REQUEST_AT_ONCE } from "../common/constants/main";
import { lodashChunk } from "@/common/utils/arrays";
import { PokeAPIDataMini } from "@/common/interfaces/_externals/pokemon";

export type PokeAPIResponse = {
    count: number,
    next: string,
    previous: string,
    results: { name: string, url: string }[]
}

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

export async function doBatchProcess(urls: string[], processData: (data: PokeAPIDataMini) => void): Promise<number> {
    function fetchSequentially(chunk: string[]): Promise<number> {
        return new Promise(async (res) => {
            let start = 0, url = chunk[start];
            while (!!url) {
                await fetch(url)
                    .then(res => errorCheck(res))
                    .then(res => {
                        addProgress(!!res)
                        processData(res);
                        start++;
                        url = chunk[start];
                    })
            }
            res(chunk.length);
        })
    }

    return Promise.all(
        lodashChunk(urls, Math.ceil(urls.length / MAX_REQUEST_AT_ONCE)).map(chunk => fetchSequentially(chunk))
    ).then(res => res.reduce((acc, num) => (acc += num), 0))
}