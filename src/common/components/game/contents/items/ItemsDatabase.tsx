// import { useEffect, useState } from "react";
// import Empty from "../../../_utils/Empty";
// import Display from "./Display";
// import styles from "@/common/styles/transitions.module.scss";
// import { Spinner } from "@/components/loaders/Spinner";

// const ItemsDatabase: React.FC = () => {
//     const [items, setItems] = useState<any[] | null | undefined>();

//     useEffect(() => {
//         // getAllItems().then(res => {
//         //     setItems(res);
//         // });
//     }, [])

//     return (
//         <div className={`absolute z-0 w-full h-full overflow-hidden flex items-center justify-center top-0 ${styles.fadeIn}`}>
//             {
//                 items === undefined ?
//                     <Spinner /> :
//                     (
//                         items === null || Object(items).length === 0 ?
//                             <Empty /> :
//                             <Display items={items} />
//                     )
//             }
//         </div>
//     )
// }

// export default ItemsDatabase;
