import Spinner from "@/common/components/_utils/loading/Spinner";
import { TAB_COLORS } from "@/common/constants/colors";
import { Tab } from "@/common/constants/enums";
import { GITHUB_ITEM_PATH } from "@/common/constants/urls";
import { useInView } from "@/common/hooks/useInView";
import { BerryData, BerryDetails } from "@/common/interfaces/berry";
import { ItemData } from "@/common/interfaces/item";
import { generateBackground } from "@/common/utils/colors";
import { getBerryDetails } from "@/database/berries-db";
import { getItemData } from "@/database/items-db";
import { useState } from "react";
import { BerryFullData } from "./_utils";
import Card from "./Card";

type BerryProps = {
    berry: BerryData;
}

const Berry: React.FC<BerryProps> = ({ berry }) => {
    const [data, setData] = useState<BerryFullData | null>();
    const imageUrl = `${GITHUB_ITEM_PATH}/${berry.name}.png`;
    const { ref } = useInView({
        onIntoView: () => {
            if (data === undefined) {
                let _details: BerryDetails | null;
                let _itemData: ItemData | null;
                new Promise((resolve: (value: BerryDetails | null) => void) => {
                    if (!!berry.details) {
                        resolve(berry.details);
                    } else {
                        getBerryDetails(berry.name.replace("-berry", "")).then(res => {
                            resolve(res);
                        });
                    }
                }).then(res => {
                    _details = res;
                    return !!res ? getItemData(String(res.itemId)) : null;
                }).then(res => {
                    _itemData = res;
                    return !!res ? generateBackground(imageUrl, 4, 14) : [TAB_COLORS[Tab.Berries], "#f0f0f0"]
                }).then(res => {
                    if (!!_details && !!_itemData) {
                        setData({
                            details: _details,
                            itemData: _itemData,
                            palette: res
                        })
                    } else {
                        setData(null);
                    }
                })
            }
        }
    })

    return (
        <div ref={ref} className="w-full flex items-center justify-center sm:rounded-[8px] overflow-hidden bg-black">
            {
                data === undefined ?
                    <Spinner /> :
                    (
                        data === null ?
                            <div className="text-base-red-dark">
                                Berry Data Missing
                            </div> :
                            <Card data={data} imageUrl={imageUrl} />
                    )
            }
        </div>
    )
}

export default Berry;