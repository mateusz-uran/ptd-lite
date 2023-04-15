import { useAuth0 } from '@auth0/auth0-react';
import axiosInstance from '../api/axiosInstance';
import { getAuthConfig } from '../api/authToken';

const useFuelService = () => {
    const { getAccessTokenSilently } = useAuth0();

    const createFuel = async (id, fuel) => {
        const config = await getAuthConfig(getAccessTokenSilently);
        return axiosInstance.post("/fuel", fuel, {
            params: { id: id },
            ...config
        });
    }

    const deleteFuel = async (id) => {
        const config = await getAuthConfig(getAccessTokenSilently);
        return axiosInstance.delete("/fuel", {
            params: { id: id },
            ...config
        })
    }

    return { createFuel, deleteFuel };
}
export default useFuelService;