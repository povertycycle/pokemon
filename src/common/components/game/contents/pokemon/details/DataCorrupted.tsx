import Loading from "@/common/components/_utils/Loading";

type DataCorruptedProps = {
    pokemon: string | null,
}

const DataCorrupted: React.FC<DataCorruptedProps> = ({ pokemon }) => {
    return (
        <div className="w-full h-full text-base-white flex items-center justify-center text-[3rem]">
            {
                // !pokemon ?
                //     "Select a pokemon" :
                //     (
                // data.main === null || data.secondary === null || data.species ?
                //     "Pokemon data corrupted! Please contact developer regarding this issue." :
                //     <Loading />
                // )
            }
        </div>
    )
}

export default DataCorrupted;