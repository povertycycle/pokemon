import Image from "next/image";

const Spinner: React.FC = () => {
    return (
        <Image className="text-white w-[48px] sm:w-[64px] aspect-square" src={"/pokemon/img/spinner.svg"} alt="" width={48} height={48} />
    )
}

export default Spinner;