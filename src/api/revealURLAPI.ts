import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useServer } from "../context/ServerContext";
import { IHousing } from "../interface/Housing.interface";
import { AddFavorite } from "../interface/payload/AddFavorite.interface";
import { GenericAcctId } from "../interface/payload/GenericAcctId.interface";
import { GenericHousingIdPayload } from "../interface/payload/GenericHousingIdPayload.interface";
import { handleError } from "../util/handleError";

export function useGetRevealedURLsAPI(): { revealedURLs: IHousing[]; revealedURLsIsLoaded: boolean; err: string; runUpdateRevealedURLs: Function } {
    const [revealedURLs, setRevealedURLs] = useState<IHousing[]>([]);
    const [revealedURLsIsLoaded, setRevealedURLsIsLoaded] = useState(false);
    const [err, setErr] = useState("");
    // const [payload, setPayload]=useState<RevealedURLs | undefined>(undefined);

    function runUpdateRevealedURLs() {
        setRevealedURLsIsLoaded(false);
        // setPayload({acctId})
    }

    const server = useServer();
    const { setAccessToken } = useAuth();

    useEffect(() => {
        if (!revealedURLsIsLoaded) {
            (async () => {
                try {
                    setErr(""); // clear old error
                    const response = await server!.get("/housing/real-url-list");
                    const { revealedURLs } = response.data;
                    setRevealedURLs(revealedURLs);
                } catch (error) {
                    console.warn("failed to refresh token");
                    const msg = handleError(error);
                    setErr(msg);
                } finally {
                    setRevealedURLsIsLoaded(true);
                    // setPayload(undefined)
                }
            })();
        }
    }, [setAccessToken, server, revealedURLsIsLoaded]);

    return { revealedURLs, revealedURLsIsLoaded, err, runUpdateRevealedURLs };
}

export function useRevealURLAPI(): { revealedURL: IHousing | undefined; loaded: boolean; err: string; runRevealURL: Function } {
    const [revealedURL, setRevealedURL] = useState<IHousing | undefined>(undefined);
    const [loaded, setLoaded] = useState(false);
    const [err, setErr] = useState("");
    const [payload, setPayload] = useState<GenericHousingIdPayload | undefined>(undefined);

    function runRevealURL(housingId: number) {
        setPayload({ housingId });
    }

    const server = useServer();
    const { setAccessToken } = useAuth();

    useEffect(() => {
        if (payload) {
            (async () => {
                try {
                    setErr(""); // clear old error
                    const response = await server!.delete("/profile/pick/housing", { data: { ...payload } });
                    const { revealedURL } = response.data;
                    setRevealedURL(revealedURL);
                } catch (error) {
                    console.warn("failed to refresh token");
                    const msg = handleError(error);
                    setErr(msg);
                } finally {
                    setLoaded(true);
                    setPayload(undefined);
                }
            })();
        }
    }, [payload, setAccessToken, server]);

    return { revealedURL, loaded, err, runRevealURL };
}