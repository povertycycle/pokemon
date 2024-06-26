import { useEffect, useState } from "react";
import { ItemData } from "./constants";
import { getAllItems } from "../../database/itemsDB";
import Loading from "../../utils/Loading";
import Empty from "../../utils/Empty";
import Display from "./Display";
import styles from "@/common/styles/transitions.module.scss";

const ItemsDatabase: React.FC = () => {
    const [items, setItems] = useState<ItemData[] | null | undefined>();

    useEffect(() => {
        getAllItems().then(res => {
            setItems(res);
        });
    }, [])

    return (
        <div className={`absolute z-[0] w-full h-full overflow-hidden flex items-center justify-center top-0 ${styles.fadeIn}`}>
            {
                items === undefined ?
                    <Loading /> :
                    (
                        items === null || Object(items).length === 0 ?
                            <Empty /> :
                            <Display items={items} />
                    )
            }
        </div>
    )
}

export default ItemsDatabase;