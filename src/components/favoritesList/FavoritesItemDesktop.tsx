import React, { useContext } from "react";
import { useAuth } from "../../context/AuthContext";
import { CreditsModalContext, ICreditsModalContext } from "../../context/CreditsModalContext";
import Button from "../button/Button";
import Garbage from "../../assets/waste.png";
import { calculateWalkTimeInMinutes, walkTimeInMinutes, walkTimeInSeconds } from "../../util/calcWalkTime";

interface FavoritesItemProps {
    address: string;
    distanceToGym: number; // pythagoras long, lat difference
    removeFavorite: Function;
    hasBeenRevealed: boolean;
    runRevealUrl: Function;
}

const FavoritesItemDesktop: React.FC<FavoritesItemProps> = ({
    address,
    distanceToGym,
    removeFavorite,
    hasBeenRevealed,
    runRevealUrl,
}: FavoritesItemProps) => {
    const { outOfCredits } = useAuth();
    const { openAddCreditsModal } = useContext(CreditsModalContext) as ICreditsModalContext;

    const walkTimeFraction = calculateWalkTimeInMinutes(distanceToGym);

    const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

    // hidden md:grid
    return (
        <div className="mt-3 py-2 pl-2 h-24 md:h-12 hidden md:grid grid-cols-9 bg-white rounded-lg">
            <div className="w-full h-1/2 md:h-full pl-1 col-span-3">
                <div className="h-full flex items-center">
                    <p className="text-left whitespace-nowrap text-ellipsis	overflow-hidden">{address}</p>
                </div>
            </div>
            <div className="h-1/2 md:h-full col-span-2 flex justify-center items-center ">
                <p> {walkTimeFraction > 1 ? walkTimeInMinutes(walkTimeFraction, viewportWidth, 1100) : walkTimeInSeconds(walkTimeFraction)} </p>
            </div>
            <div
                className="col-span-2"
                onClick={() => {
                    removeFavorite();
                }}
            >
                <div className="hidden lg:block">
                    <Button type="Opaque" text="Remove" size="Small" />
                </div>
                <div className="ml-12 h-full block lg:hidden flex justify-center items-center">
                    {/* // show trash icon on mobile to save space */}
                    <img src={Garbage} alt="trash" width={15} height={15} />
                </div>
            </div>
            <div
                className="col-span-2"
                onClick={() => {
                    if (outOfCredits) {
                        openAddCreditsModal();
                        return;
                    }
                    runRevealUrl();
                }}
            >
                {hasBeenRevealed ? <Button type="GreyedOut" text="Loaded" size="Small" /> : <Button type="Opaque" text="Get URL" size="Small" />}
            </div>
        </div>
    );
};
export default FavoritesItemDesktop;
