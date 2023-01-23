import { useState, useEffect, useMemo } from "react";
import { handleError } from "../util/handleError";
import { useAuth } from "../context/AuthContext";
import { LogInAuth } from "../interface/payload/LogInAuth.interface";
import { SignUpAuth } from "../interface/payload/SignUpAuth.interface";
import { UserProfile } from "../interface/UserProfile.interface";
import axios from "axios";
import { getEndpoint } from "../util/getEndpoint";
import { makeHeaders } from "../util/makeHeaders";

export function useSignUpWithEmailAPI(): {
    signUpData: UserProfile | undefined;
    signUpErr: string;
    signUpIsLoaded: boolean;
    runSignUp: Function;
    backendMsg: string;
} {
    const [backendMsg, setBackendMsg] = useState("");
    const [signUpData, setSignUpData] = useState<UserProfile | undefined>(undefined);
    const [signUpErr, setSignUpErr] = useState("");
    const [signUpIsLoaded, setSignUpIsLoaded] = useState(false);
    const [payload, setPayload] = useState<SignUpAuth | undefined>(undefined);

    function runSignUp(name: string, email: string, password: string, confirmPassword: string) {
        setSignUpIsLoaded(false);
        setPayload({ name, email, password, confirmPassword, acceptsTerms: true });
    }

    useEffect(() => {
        if (!signUpIsLoaded && payload) {
            (async () => {
                try {
                    setSignUpErr(""); // remove old errors
                    const response = await axios.post(getEndpoint("/auth/register"), {
                        ...payload,
                    });
                    const { message, accountDetails } = response.data;
                    setSignUpData(accountDetails);
                    setBackendMsg(message);
                } catch (error) {
                    const msg = handleError(error);
                    setSignUpErr(msg);
                } finally {
                    setSignUpIsLoaded(true);
                    setPayload(undefined); // so it doesn't re-run.
                }
            })();
        }
    }, [signUpIsLoaded, payload]);

    return { signUpData, signUpErr, signUpIsLoaded, runSignUp, backendMsg };
}

export function useLoginWithEmailAPI(): {
    loginData: UserProfile | undefined;
    loginErr: string;
    loginIsLoaded: boolean;
    runLogin: Function;
} {
    const [loginData, setLoginData] = useState<UserProfile | undefined>(undefined);
    const [loginErr, setLoginErr] = useState("");
    const [loginIsLoaded, setLoginIsLoaded] = useState(false);
    const [payload, setPayload] = useState<LogInAuth | undefined>(undefined);

    const { setAccessToken } = useAuth();

    function runLogin(email: string, password: string) {
        setLoginIsLoaded(false);
        setPayload({ email, password });
    }

    useEffect(() => {
        if (payload) {
            (async () => {
                try {
                    setLoginErr(""); // remove old errors
                    const response = await axios.post(getEndpoint("/auth/authenticate"), { ...payload }, { withCredentials: true });
                    const { acctId, email, name, isVerified, credits, role, favoriteCity, jwtToken } = response.data;
                    setLoginData({ acctId, email, name, isVerified, role, credits, favoriteCity });
                    console.log(jwtToken, "storing jwt, 83rm");
                    setAccessToken(jwtToken);
                } catch (error) {
                    console.log(error, "84rm");
                    const msg = handleError(error);
                    console.log(msg, "86rm");
                    setLoginErr(msg);
                } finally {
                    setLoginIsLoaded(true);
                    setPayload(undefined); // so it doesn't re-run.
                }
            })();
        }
    }, [payload, setAccessToken]);

    return { loginData, loginErr, loginIsLoaded, runLogin };
}

export function useRefreshJwtAPI(): {
    // refreshedUser: UserProfile | undefined;
    refreshErr: string;
    refreshIsLoaded: boolean;
    runRefreshJwt: Function;
} {
    // const [refreshedUser, setRefreshedUser] = useState<UserProfile | undefined>(undefined);
    const [refreshErr, setRefreshErr] = useState("");
    const [refreshIsLoaded, setRefreshIsLoaded] = useState(false);
    const [run, setRun] = useState(false);

    const { setAccessToken, setProfile } = useAuth();

    function runRefreshJwt() {
        setRefreshIsLoaded(false);
        setRun(true);
    }

    useEffect(() => {
        if (run) {
            (async () => {
                try {
                    setRefreshErr(""); // clear old error
                    const path = getEndpoint("/auth/refresh-token");
                    console.log(path, "121rm");
                    const response = await axios.post(path, {}, { withCredentials: true });
                    const { acctId, email, name, role, isVerified, credits, favoriteCity, jwtToken } = response.data;
                    // console.log(jwtToken, "setting access token, 125rm");
                    setAccessToken(jwtToken ? jwtToken : "");
                    // console.log({ acctId, email, name, role, isVerified, credits, favoriteCity }, "127rm");
                    setProfile({ acctId, email, name, role, isVerified, credits, favoriteCity });
                } catch (error) {
                    console.warn("failed to refresh token");
                    const msg = handleError(error);
                    setRefreshErr(msg);
                } finally {
                    setRefreshIsLoaded(true);
                    setRun(false);
                }
            })();
        }
    }, [run, setAccessToken]);

    return { refreshErr, refreshIsLoaded, runRefreshJwt };
}

export function useLogOutAPI(): { success: boolean; error: string; loaded: boolean; runLogOut: Function } {
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [run, setRun] = useState(false);

    const { setAccessToken, accessToken } = useAuth();

    function runLogOut() {
        setRun(true);
    }
    // todo: what should this method return?
    useEffect(() => {
        if (run) {
            (async () => {
                try {
                    // server has "withCredential: true" and the access token automatically attached.
                    const response = await axios.post(getEndpoint("/auth/revoke-token"), {}, { withCredentials: true, ...makeHeaders(accessToken) });
                    setAccessToken("");
                    setSuccess(true);
                } catch (error) {
                    const msg = handleError(error);
                    setError(msg);
                } finally {
                    setLoaded(true);
                    setRun(false);
                }
            })();
        }
    }, [run, accessToken]);

    return { success, error, loaded, runLogOut };
}
