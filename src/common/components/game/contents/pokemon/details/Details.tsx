import React, { memo } from "react";

const Details: React.FC<{ pokeId: string | null }> = ({ pokeId }) => {
    return (
        <div className="h-full flex absolute left-0 top-0 z-[1] transition-width duration-[500ms]" >
        </div>
    )
}

type DisplayerProps = {
    palette: string[]
}

const Displayer = memo(({ palette }: DisplayerProps) => {
    return (
        //         <div className={`w-full flex h-full`}>
        //             <div id={SCROLL_ID} className={`w-full flex flex-col justify-start items-start relative z-[1] pl-4 gap-8 h-full overflow-y-scroll ${styles.overflowWhite}`}>
        //                 {/* <Bio data={secondary.spritesData} species={species} primary={{ base_experience: main.base_experience, height: main.height, weight: main.weight }} held_items={main.held_items} /> */}
        //                 <Moves moveVersions={secondary.moveVersions} />
        //                 <Encounters pal_park={species.pal_park_encounters} />
        //                 <EvolutionDisplay chain={species.evolution_chain} />
        //             </div>
        //             <ScrollNavigator />
        //         </div>
        //     </div>
        <></>
    )
}, arePropsEquals);

function arePropsEquals(a: DisplayerProps, b: DisplayerProps) {
    // return (a.data.main.name === b.data.main.name);
    return true
}

export default Details;