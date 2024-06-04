import { ItemData } from "./constants"

type DetailsProps = {
    item: ItemData | null
}

const Details: React.FC<DetailsProps> = ({ item }) => {
    return (
        <div className="w-[20%] h-full bg-x-dark">
            {
                !item ?
                    <div className="text-base-white w-full h-full flex items-center justify-center text-[2rem]">
                        Select an item
                    </div> :
                    <></>
            }
        </div>
    )
}

export default Details;