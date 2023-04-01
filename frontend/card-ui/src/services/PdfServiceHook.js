import useAuth from '../api/keycloakHook';
import axiosInstance from '../api/axiosInstance';

const usePdfService = () => {
    const { keycloak } = useAuth();

    const generatePdf = (pdfRequest) => {
        return axiosInstance.post("/pdf/generate", pdfRequest, {
            headers: {
                'Authorization': `Bearer ${keycloak.token}`
            }
        });
    }

    const roleBasedPath = () => {
        return axiosInstance.get("/pdf/upload", {
            headers: {
                'Authorization': `Bearer ${keycloak.token}`
            }
        });
    }

    return { generatePdf, roleBasedPath };
}
export default usePdfService;