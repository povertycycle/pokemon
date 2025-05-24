import { generateBackground } from "@/utils/colors";
import { useEffect, useState } from "react";

/**
 * Palette generator
 *
 * @param image Image url
 * @param defaultPalette Default palette color failback
 * @param defaultLocalUrl Default local url to be used for the image
 */
export const usePalette = (
    image?: string | null,
    defaultPalette?: string[]
    // defaultLocalUrl?: string
) => {
    const DEFAULT_PALETTE = ["#ffffff", "#000000"];
    const [palette, setPalette] = useState<string[] | undefined>(
        defaultPalette
    );
    // const [localUrl, setLocalUrl] = useState<string>(defaultLocalUrl ?? "");

    useEffect(() => {
        // let url: string;
        if (palette === undefined) {
            if (!!image) {
                // url = image;
                // fetch(image)
                //     .then((res) => res.blob())
                //     .then((res) => URL.createObjectURL(res))
                //     .then((res) => {
                //         url = res;
                //         return generateBackground(res);
                //     })
                generateBackground(image)
                    .then((res) => {
                        setPalette(res);
                        // setLocalUrl(url);
                    })
                    .catch((err) => {
                        setPalette(DEFAULT_PALETTE);
                        // setLocalUrl("");
                    });
            } else {
                setPalette(DEFAULT_PALETTE);
                // setLocalUrl("");
            }
        }
        return () => {
            // console.log(localUrl);
            // URL.revokeObjectURL(localUrl);
        };
    }, []);

    return {
        palette,
        // localUrl
    };
};
