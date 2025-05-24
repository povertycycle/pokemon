import { useContext, useState } from "react";
import { EncounterData } from "../../../interfaces/pokemon";
import { useInView } from "@/utils/hooks";
import { getEncounterData } from "../../../database/encounters";
import { Spinner } from "@/components/loaders/Spinner";
import { Unavailable } from "@/components/errors/Unavailable";
import { BASE_API_URL_POKEMON } from "@/constants/game/urls";
import { PaletteContext } from "@/stores/contexts";
import { getVersionData } from "../../../utils/versions";

type EncounterProps = {
    id: number;
    data?: EncounterData | null;
};

/**
 * Encounter details
 */
export const Encounter: React.FC<EncounterProps> = (props) => {
    const [data, setData] = useState<EncounterData | null | undefined>(
        props.data
    );
    const ref = useInView({
        onIntoView: () => {
            if (data === undefined) {
                getEncounterData(props.id)
                    .then((res) => {
                        setData(res);
                    })
                    .catch((err) => {
                        setData(null);
                    });
            }
        },
    });

    return (
        <div ref={ref}>
            {data === undefined ? (
                <Spinner />
            ) : data === null ? (
                <Unavailable url={BASE_API_URL_POKEMON} />
            ) : (
                <Display data={data} />
            )}
        </div>
    );
};

/**
 * Display list
 */
const Display: React.FC<{ data: EncounterData }> = ({ data }) => {
    const {
        dark: { background },
    } = useContext(PaletteContext);
    const details = Object.entries(data);

    return (
        <>
            {details.length === 0 ? (
                <span className="mx-auto text-sm sm:text-base italic text-gray-400 px-2">
                    No encounter found
                </span>
            ) : (
                details.map(([versions, encounter], i) => (
                    <div
                        className="flex-col w-full flex sm:break-inside-avoid-column [&:not(:first-child)]:mt-4 sm:[&:not(:first-child)]:mt-2"
                        key={versions}
                    >
                        <div className="flex flex-wrap font-medium text-sm sm:text-base bg-black/10">
                            {versions.split(";").map((version) => (
                                <Version key={version} version={version} />
                            ))}
                        </div>
                        <div
                            className="flex flex-col py-2 sm:py-1 text-xxs sm:text-sm"
                            style={{ background: `${background}1a` }}
                        >
                            {Object.entries(encounter).map(
                                ([location, details]) => (
                                    <div
                                        className="flex flex-col px-3 py-1"
                                        key={location}
                                    >
                                        <div className="text-xs sm:text-base capitalize font-medium">
                                            {location.replaceAll("-", " ")}
                                        </div>
                                        <ul className="list-disc px-5 sm:pt-1">
                                            {Object.entries(details).map(
                                                ([method, data], k) => (
                                                    <li key={k}>
                                                        <span className="font-medium">
                                                            {data.chance}
                                                        </span>
                                                        % chance by{" "}
                                                        <span className="font-medium">
                                                            {METHODS[method]}
                                                        </span>{" "}
                                                        <span className="whitespace-nowrap font-medium bg-black/10 rounded-full px-2 sm:px-3">
                                                            Lv{" "}
                                                            {data.level.replace(
                                                                "-",
                                                                " - "
                                                            )}
                                                        </span>{" "}
                                                        <br />
                                                        {!!data.conditions && (
                                                            <span>
                                                                Requirements:{" "}
                                                                {data.conditions
                                                                    .map(
                                                                        (
                                                                            condition
                                                                        ) =>
                                                                            CONDITIONS[
                                                                                condition
                                                                            ]
                                                                    )
                                                                    .join(", ")}
                                                            </span>
                                                        )}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                ))
            )}
        </>
    );
};

/**
 * Header display
 */
const Version: React.FC<{ version: string }> = ({ version }) => {
    const { name, background } = getVersionData(version, { opacity: "33" });

    return (
        <div className="grow px-4 text-center py-1" style={{ background }}>
            {name}
        </div>
    );
};

/**
 * Method names
 */
const METHODS: Record<string, string> = {
    walk: "walking in tall grass or a cave",
    "old-rod": "fishing with an Old Rod",
    "good-rod": "fishing with a Good Rod",
    "super-rod": "fishing with a Super Rod",
    surf: "surfing",
    "rock-smash": "smashing rocks",
    headbutt: "headbutting trees",
    "dark-grass": "walking in dark grass",
    "grass-spots": "walking in rustling grass",
    "cave-spots": "walking in dust clouds",
    "bridge-spots": "walking in bridge shadows",
    "super-rod-spots": "fishing in dark spots",
    "surf-spots": "surfing in dark spots",
    "yellow-flowers": "walking in yellow flowers",
    "purple-flowers": "walking in purple flowers",
    "red-flowers": "walking in red flowers",
    "rough-terrain": "walking on rough terrain",
    gift: "receiving as a gift",
    "gift-egg": "receiving egg as a gift",
    "only-one": "a static encounter (only one chance)",
    pokeflute: "plaing Pokéflute",
    "headbutt-low": "headbutting a low encounter rate tree",
    "headbutt-normal": "headbutting a normal encounter rate tree",
    "headbutt-high": "headbutting a high encounter rate tree",
    "squirt-bottle": "using the Squirt Bottle on a Sudowoodo",
    "wailmer-pail": "using the Wailmer Pail on a Sudowoodo",
    seaweed: "diving on seaweed",
    "roaming-grass": "roaming on any overworld patch of grass",
    "roaming-water": "roaming on any overworld water tile",
    "devon-scope": "using Devon Scope",
    "feebas-tile-fishing": "fishing in a Feebas Tile",
};

/**
 * Encounter conditions
 */
const CONDITIONS: Record<string, string> = {
    "swarm-yes": "During a swarm",
    "swarm-no": "Not during a swarm",
    "time-morning": "In the morning",
    "time-day": "During the day",
    "time-night": "At night",
    "radar-on": "Using PokéRadar",
    "radar-off": "Not using PokéRadar",
    "slot2-none": "No game in slot 2",
    "slot2-ruby": "Ruby in slot 2",
    "slot2-sapphire": "Sapphire in slot 2",
    "slot2-emerald": "Emerald in slot 2",
    "slot2-firered": "FireRed in slot 2",
    "slot2-leafgreen": "LeafGreen in slot 2",
    "radio-off": "Radio off",
    "radio-hoenn": "Hoenn radio",
    "radio-sinnoh": "Sinnoh radio",
    "season-spring": "During Spring",
    "season-summer": "During Summer",
    "season-autumn": "During Autumn",
    "season-winter": "During Winter",
    "starter-bulbasaur": "Bulbasaur as starter",
    "starter-squirtle": "Squirtle as starter",
    "starter-charmander": "Charmander as starter",
    "starter-chespin": "Chespin as starter",
    "starter-fennekin": "Fennekin as starter",
    "starter-froakie": "Froakie as starter",
    "tv-option-blue": "Chose 'Blue' on the TV news report",
    "tv-option-red": "Chose 'Red' on the TV news report",
    "story-progress-awakened-beasts":
        "Awakened the legendary beasts at Burned Tower",
    "story-progress-beat-galactic-coronet":
        "Visited Lake Verity after defeating Team Galactic at Mt. Coronet",
    "story-progress-oak-eterna-city": "Talked to Professor Oak at Eterna City",
    "story-progress-vermilion-copycat":
        "Visited the Pokémon Fan Club with Copycat's doll",
    "story-progress-met-tornadus-thundurus":
        "Met Tornadus or Thundurus in a cutscene",
    "story-progress-beat-elite-four-round-two":
        "Beat the Elite 4 for the second time",
    "story-progress-hall-of-fame": "Enter the Hall of Fame",
    "story-progress-none": "None",
    "story-progress-national-dex": "Acquired National Pokédex",
    "other-none": "None",
    "other-snorlax-11-beat-league":
        "Beat the Pokémon league after knocking out Snorlax at Route 11",
    "other-virtual-console": "Playing on the Virtual Console Release",
    "story-progress-cure-eldritch-nightmares":
        "Cure the nightmares of Eldritch's Son",
    "other-talk-to-cynthias-grandmother": "Talk to Cynthia's grandmother",
    "item-none": "No item requirement",
    "item-adamant-orb": "Have Adamant Orb in bag",
    "item-lustrous-orb": "Have Lustrous Orb in bag",
    "item-helix-fossil": "Have Helix Fossil in bag",
    "item-dome-fossil": "Have Dome Fossil in bag",
    "item-old-amber": "Have Old Amber in bag",
    "item-root-fossil": "Have Root Fossil in bag",
    "item-claw-fossil": "Have Claw Fossil in bag",
    "story-progress-defeat-jupiter": "Defeat Jupiter",
    "story-progress-beat-team-galactic-iron-island":
        "Defeat Team Galactic at Iron Island",
    "other-correct-password": "Input correct password",
    "story-progress-zephyr-badge": "Obtained Zephyr badge",
    "story-progress-beat-red": "Defeat Red",
    "other-received-kanto-starter": "received a Kanto Starter",
    "story-progress-receive-tm-from-claire": "received TM59 From Claire",
    "other-regirock-regice-registeel-in-party":
        "Have Regirock, Regice and Registeel in the party",
    "weekday-sunday": "Sunday",
    "weekday-monday": "Monday",
    "weekday-tuesday": "Tuesday",
    "weekday-wednesday": "Wednesday",
    "weekday-thursday": "Thursday",
    "weekday-friday": "Friday",
    "weekday-saturday": "Saturday",
    "first-party-pokemon-high-friendship":
        "The first Pokémon in the player's party has a high friendship stat",
    "story-progress-defeat-mars": "Beat Mars for the first time",
    "item-odd-keystone": "Have Odd Keystone in bag",
    "other-talked-to-32-people-underground":
        "Has talked to at least 32 people in the underground",
    "story-progress-returned-machine-part":
        "Returned Machine Part to Power Plant",
    "other-event-arceus-in-party": "Have an Event Arceus in the party",
};
