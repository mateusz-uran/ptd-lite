import { useKeycloak } from '@react-keycloak/web';

export default function useAuth() {
    const { keycloak } = useKeycloak();
    return { keycloak };
}