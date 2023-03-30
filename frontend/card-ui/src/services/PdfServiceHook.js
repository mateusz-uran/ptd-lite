import useAuth from '../api/keycloakHook';
import axiosInstance from '../api/axiosInstance';

const usePdfService = () => {
    const { keycloak } = useAuth();

    const generatePdf = (card) => {
        return axiosInstance.post("/pdf/generate", card, {
            headers: {
                'Authorization': `Bearer ${keycloak.token}`
            }
        });
    }

    const readFile = (username) => {
        return axiosInstance.get("/pdf/file",  {
            params: { username: username },
            headers: {
                'Authorization': `Bearer ${keycloak.token}`
            }
        });
    }

    return { generatePdf, readFile };
}
export default usePdfService;