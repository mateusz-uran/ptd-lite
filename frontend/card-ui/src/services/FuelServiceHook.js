import useAuth from '../api/keycloakHook';
import axiosInstance from '../api/axiosInstance';

const useFuelService = () => {
    const { keycloak } = useAuth();

    const createFuel = (id, fuel) => {
        return axiosInstance.post("/fuel", fuel, {
            params: { id: id },
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${keycloak.token}`
            }
        });
    }

    const deleteFuel = (id) => {
        return axiosInstance.delete("/fuel", {
            params: { id: id },
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${keycloak.token}`
            }
        })
    }

    return { createFuel, deleteFuel };
}
export default useFuelService;