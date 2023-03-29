import useAuth from '../api/keycloakHook';
import axiosInstance from '../api/axiosInstance';

const useTripService = () => {
    const { keycloak } = useAuth();

    const createFixed = (id, trips) => {
        return axiosInstance.post('/trip', trips, {
            params: { cardId: id },
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${keycloak.token}`
            }
        });
    }

    const deleteManyTrips = (selectedTripId) => {
        return axiosInstance.delete("/trip", {
            data: selectedTripId,
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${keycloak.token}`
            }
        });
    }

    return { createFixed, deleteManyTrips };
}
export default useTripService;