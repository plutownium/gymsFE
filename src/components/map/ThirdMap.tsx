import mapboxgl from "mapbox-gl";
import React, { useRef, useEffect, useState, useContext } from "react";
import { MapProps } from "react-map-gl";
import { ISidebarContext, SidebarStateContext } from "../../context/SidebarStateProvider";

import useWindowSize from "../../util/useWindowSize";

import "./ThirdMap.scss";

// Be sure to replace this with your own token
const MAPBOX_TOKEN: string = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "";
mapboxgl.accessToken = MAPBOX_TOKEN;

interface MapboxProps {
    center: [number, number];
    // zoom: number;
}

const ThirdMap: React.FC<MapboxProps> = ({ center }) => {
    const { isOpen, toggleIsOpen } = useContext(SidebarStateContext) as ISidebarContext;

    const [width, height] = useWindowSize();

    const isOnMobile = width < 768;
    console.log(isOpen, "18rm");

    const mapContainer = useRef(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [long, setLong] = useState(-73.5);
    const [lat, setLat] = useState(45.5);
    const [zoom, setZoom] = useState(13);

    function resizeMap() {
        if (map === null || map.current === null) return;
        map.current.resize();
        console.log("resizing! 26rm");
    }

    window.addEventListener("resize", resizeMap);

    useEffect(() => {
        resizeMap();
    }, [isOpen]);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: "mapContainer",
            style: "mapbox://styles/mapbox/streets-v11",
            center: [long, lat],
            zoom: zoom,
            attributionControl: false,
        }).addControl(new mapboxgl.AttributionControl({ compact: true }));
    });

    function decideWidth(isOpen: boolean, isOnMobile: boolean): string {
        if (isOnMobile) {
            // because on mobile, the map is in a fixed position regardless if the sidebar is open or not
            return "mapWidthSidebarClosed";
        } else if (isOpen) {
            return "mapWidthSidebarOpen";
        } else {
            return "mapWidthSidebarClosed";
        }
    }

    return (
        <div id="mapContainerOuter" className={`${decideWidth(isOpen, isOnMobile)} w-full mapHeight mr-2`}>
            <div id="mapContainer" ref={mapContainer}></div>
        </div>
    );
};

export default ThirdMap;
