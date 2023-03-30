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

    return { generatePdf };
}
export default usePdfService;