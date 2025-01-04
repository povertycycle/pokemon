import Image from "next/image";

type SpinnerProps = {
    size?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ size }) => {
    return (
        <Image style={{ ...(!!size && { width: `${size}px`, height: `${size}px` }) }} className="text-white w-[48px] sm:w-[64px] aspect-square" src={"/img/spinner.svg"} alt="" width={48} height={48} />
    )
}

export default Spinner;