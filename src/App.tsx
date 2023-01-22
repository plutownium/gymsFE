import React, { useState } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

import "./App.scss";
import PageRoutes from "./router/Router";
import SidebarStateProvider from "./context/SidebarContext";
import LocationsProvider from "./context/LocationsContext";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { RevealedURLProvider } from "./context/RevealedURLContext";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "";
// TODO before production: put access token on server and retrieve it on page load

function App() {
    return (
        <div className="App">
            {/* <SidebarStateProvider value={{ isOpen: false, toggleIsOpen: toggleIsOpen }}> */}
            <AuthProvider>
                <SidebarStateProvider>
                    <LocationsProvider>
                        <FavoritesProvider>
                            <RevealedURLProvider>
                                <PageRoutes />
                            </RevealedURLProvider>
                        </FavoritesProvider>
                    </LocationsProvider>
                </SidebarStateProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
