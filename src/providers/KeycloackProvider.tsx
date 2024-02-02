import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { keycloak } from '../keycloakConfig';
import { setAuthenticated, setToken, setUserDetails } from '../features/auth/authSlice';


export const KeycloackProvider = ({ children }: {
    children: React.ReactNode
}) => {
    const dispatch = useDispatch();

    useEffect(() => {

        const updateToken = (refresh = false) => {
            if (refresh) {
                keycloak.updateToken(70).then((refreshed) => {
                    if (refreshed) {
                        dispatch(setToken(keycloak.token));
                    }
                });
            }
        }

        keycloak.onTokenExpired = async () => {
            updateToken();
        };

        const initKeycloack = async () => {
            try {
                const isAuthenticated = await keycloak.init({
                    onLoad: "login-required",
                });

                if (isAuthenticated) {
                    dispatch(setAuthenticated(true));
                    dispatch(setToken(keycloak.token));

                    const userInfo = await keycloak.loadUserInfo();
                    dispatch(setUserDetails(userInfo));
                } else {
                    dispatch(setAuthenticated(false));
                }
            } catch (e) {
                console.log("Keycloack initialization error", e);
                dispatch(setAuthenticated(false));
            }
        }

        keycloak.onTokenExpired = () => {
            return null;
        };

        initKeycloack();
    }, [dispatch]);

    return <>{children}</>;
};