import { Sprites, SpritesData } from "../../../interface";
import { Dispatch, SetStateAction } from "react";
import styles from "@/common/styles/custom.module.scss";

const GEN_COLORS: { [key: string]: string } = {
    "generation-i": "linear-gradient(90deg, #870000 0%, #8a8700 50%, #004187 100%)",


    "generation-ii": "linear-gradient(90deg, #90bcc2 0%, #c3a400 50%, #939393 100%)",
    "generation-iii": "linear-gradient(90deg, #0c4398 0%, #3a5f0b 25%, #399357 50%, #aa4806 75%, #950614 100%)",
    "generation-iv": "linear-gradient(90deg, #998102 0%, #9a9a8e 25%, #bababa 50%, #9ba3a4 76%, #4d909f 100%)",
    "generation-v": "linear-gradient(90deg, #000000 0%, #afafaf 100%)",
    "generation-vi": "linear-gradient(90deg, #6f0c15 0%, #b64000 33%, #29a77b 66%, #0a377e 100%)",
    "generation-vii": "linear-gradient(90deg, #d76902 0%, #b98301 33%, #017bb6 66%, #3c0774 100%)",
    "generation-viii": "linear-gradient(90deg, #074674 0%, #5435a4 33%, #a80061 66%, #9f0000 100%)",
    "others": "linear-gradient(90deg, #c79e01 0%, #249968 50%, #20578b 100%)",
}

type NavigationProps = {
    sprites: SpritesData | null;
    active: string | null;
    setActive: Dispatch<SetStateAction<string | null>>;
}

const Navigation: React.FC<NavigationProps> = ({ sprites, active, setActive }) => {
    function formatGenTitle(gen: string) {
        const num = gen.split("-").at(-1);

        return `Generation ${(num ?? "0").toUpperCase()}`
    }

    return (
        <div className={`relative z-[1] h-full overflow-y-scroll w-[256px] p-2 ${styles.overflowWhite}`}>
            {
                sprites && Object.entries(sprites.versions).map((entry: [string, Sprites], i: number) => (
                    <div key={i} className="w-full flex flex-col">
                        <div className="w-full text-base leading-4 text-center py-1 px-2 rounded-[6px]" style={{ background: GEN_COLORS[entry[0]] }}>
                            {formatGenTitle(entry[0])}
                        </div>
                        {
                            Object.entries(entry[1]).map((sprite: [string, string], j: number) => (
                                <div key={j} className="text-[1.25rem] leading-6">
                                    {
                                        sprite[0]
                                    }
                                </div>
                            ))
                        }
                    </div>
                ))
            }


            <div className="flex flex-col">
                <div className="w-full text-[1.25rem] leading-5 text-base-white text-center py-2 px-4 border-2 border-base-white" style={{ background: GEN_COLORS.others }}>Others</div>
                {
                    sprites && Object.entries(sprites.others).map((entry: [string, string], i: number) => (
                        <div key={i} className="px-2 bg-black/25 text-base-white">
                            {entry[0]}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Navigation;
