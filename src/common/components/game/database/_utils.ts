import { errorCheck } from "@/common/utils/errorCheck";
import { MAX_REQUEST_AT_ONCE } from "../../constants";

export async function doBatchProcess(urls: string[], processData: (data: any) => void): Promise<boolean> {
    return new Promise(async result => {
        const TOTAL_BATCH = Math.ceil(urls.length / MAX_REQUEST_AT_ONCE);
        let batch = 0;
        let acc: any[] = [];
        while (batch < TOTAL_BATCH) {
            await Promise.all(urls.slice(batch*MAX_REQUEST_AT_ONCE,(batch+1)*MAX_REQUEST_AT_ONCE).map((url:string)=>(
                fetch(url).then(res=>errorCheck(res))
            ))).then(resAll => {
                resAll.forEach((data) => {
                    processData(data);
                });
            }).catch(err => {
                result(false);
            }).finally(() => {
                batch += 1;
            });
        }
        result(true);
    })
}