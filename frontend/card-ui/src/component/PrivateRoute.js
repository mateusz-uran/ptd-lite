import { useKeycloak } from '@react-keycloak/web';
import React from 'react';
import { Navigate, redirect } from "react-router-dom";

export function PrivateRoute(props) {
    const { component: Component, roles, ...rest } = props;

    const { keycloak, } = useKeycloak()

    const isAutherized = () => {
        if (keycloak && roles) {
            return roles.some(r => {
                const realm = keycloak.hasRealmRole(r);
                return realm;
            });
        }
        return false;
    }

    return isAutherized(roles) ? <Component {...rest}/> : <Navigate to={"/"} />;
}

