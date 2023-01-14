import jwt from "jsonwebtoken";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

//
import { UserProfile } from "../interface/UserProfile.interface";
import { useRefreshJwtAPI } from "../api/authAPI";

type AuthContextType = {
    accessToken: string;
    isLoggedIn: Function;
    setAccessToken: Function;

    profile: UserProfile | undefined;
};

const authContextDefaultValues: AuthContextType = {
    accessToken: "",
    isLoggedIn: () => {},
    setAccessToken: () => {},
    profile: undefined,
};

const AuthContext = createContext<AuthContextType>(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}

type AuthContextProps = {
    children: ReactNode;
};

export function AuthProvider({ children }: AuthContextProps) {
    const [accessToken, setAccessToken] = useState<string>("");
    const [profile, setProfile] = useState<UserProfile | undefined>(undefined);

    const { runRefreshJwt } = useRefreshJwtAPI();

    useEffect(() => {
        // refresh the access token if it's about to expire or has expired.
        if (accessToken !== "") {
            const decodedToken = jwt.decode(accessToken, { complete: true });
            const dateNow = new Date();
            // null check: appeasing typescript
            if (decodedToken === null) {
                // invalid token
                return;
            }
            // more appeasing typescript.
            if (typeof decodedToken.payload === "string" || decodedToken.payload.exp === undefined) {
                // invalid token
                return;
            }
            // according to // https://stackoverflow.com/questions/51292406/check-if-token-expired-using-this-jwt-library
            // the payload.exp has to be * 1000 for whatever reason
            const tokenExpiryTime = new Date(decodedToken.payload.exp * 1000);
            const millisecondsPerMinute = 1000 * 60;
            const twoMinutes = millisecondsPerMinute * 2;
            const soon = new Date(dateNow.getTime() - twoMinutes);
            const tokenWillExpireSoon = tokenExpiryTime < soon;
            if (tokenWillExpireSoon) {
                runRefreshJwt();
            }
        }
    }, [accessToken]);

    const isLoggedIn = () => {
        return !!accessToken;
    };

    const exportedValues = {
        accessToken,
        setAccessToken,
        profile,
        isLoggedIn,
    };

    return <AuthContext.Provider value={exportedValues}>{children}</AuthContext.Provider>;
}