import React from "react";
import { IAssociation } from "../../interface/Association.interface";
import { calculateWalkTimeInMinutes } from "../../util/calcWalkTime";
import ApartmentCardActions from "../apartmentCard/ApartmentCardActions";

import "./DetailsBar.scss";

interface DeailsBarProps {
    pic?: any; // todo: how to say itll be a jpg/png?
    apartmentId: number;
    address: string | undefined;
    nearbyGyms: IAssociation[] | undefined;
    // url: string | undefined;
    activeIndex: number | null;
    detailNumber: number;
    setActiveIndex: Function;
    distanceToNearestGym: number;
}
//TODO: between 1200 and 390 px, show less details: only addr, gymName, walkTime, link (4 values, not 6)
const DetailsBar: React.FC<DeailsBarProps> = ({
    pic,
    apartmentId,
    address,
    nearbyGyms,
    activeIndex,
    detailNumber,
    setActiveIndex,
    distanceToNearestGym,
}) => {
    const closestGym = nearbyGyms ? nearbyGyms.sort(compare)[0] : { gym: { name: "Data missing", url: "Data missing" }, distanceInKM: 0 };
    const gymUrl = closestGym.gym?.url;

    function compare(a: IAssociation, b: IAssociation): number {
        if (a.distanceInKM < b.distanceInKM) {
            return -1;
        }
        if (a.distanceInKM > b.distanceInKM) {
            return 1;
        }
        return 0;
    }

    const walkTimeFraction = calculateWalkTimeInMinutes(distanceToNearestGym);

    const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

    function walkTimeInMinutes(walkTimeFraction: number) {
        let minOrMins = viewportWidth < 600 ? "min" : "minute";
        // presumes values < 1 will be converted into seconds.
        const truncated = Math.trunc(walkTimeFraction);
        if (walkTimeFraction > 2) return `${truncated} ${minOrMins}s`;
        else if (walkTimeFraction === 1) return `1 ${minOrMins}`;
        else throw Error("You aren't supposed to be able to get here");
    }

    function walkTimeInSeconds(walkTimeFraction: number) {
        const asSeconds = walkTimeFraction * 60;
        const truncated = Math.trunc(asSeconds);
        return `${truncated} sec`;
    }

    function getMetersFromKM(km: number): number {
        const asMeters = km * 1000;
        const justMeters = Math.trunc(asMeters);
        return justMeters;
    }

    return (
        <div
            onClick={() => {
                setActiveIndex(detailNumber);
            }}
            className={`grid grid-cols-9 md:grid-cols-12 flex justify-between bg-white mt-2.5 px-5 sm:px-7 ${
                activeIndex === detailNumber ? "detailsBarHighlighted h-20" : "h-12"
            }`}
        >
            <div className="col-span-3 flex justify-center items-center">
                {/* <p className="grayText detailsBarText">{address}</p> */}
                <p className="grayText detailsBarText">{address}</p>
            </div>
            <div className="col-span-3 hidden md:flex justify-center items-center">
                <p className="grayText detailsBarText">{getMetersFromKM(distanceToNearestGym)} meters</p>
            </div>
            <div className="col-span-3 flex justify-center items-center">
                <p className="grayText detailsBarText">
                    {walkTimeFraction > 1 ? walkTimeInMinutes(walkTimeFraction) : walkTimeInSeconds(walkTimeFraction)}
                </p>
            </div>

            {/* // todo: add 'favorite' and 'get URL' buttons */}
            <div className="col-span-3 flex justify-center">
                <ApartmentCardActions apartmentId={apartmentId} />
            </div>
        </div>
    );
};

export default DetailsBar;
