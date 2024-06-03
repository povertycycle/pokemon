import { errorCheck } from "@/common/utils/errorCheck";
import { MAX_REQUEST_AT_ONCE } from "../../constants";
import { POKEMON_FETCH_BAR_ID } from "../utils/constants";

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