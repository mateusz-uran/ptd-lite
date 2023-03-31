import { useKeycloak } from "@react-keycloak/web";

export default function AuthorizedElement({ roles, children }) {
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

    return isAutherized() && children
}