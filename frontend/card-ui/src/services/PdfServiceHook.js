import useAuth from '../api/keycloakHook';
import axiosInstance from '../api/axiosInstance';

const usePdfService = () => {
    const { keycloak } = useAuth();

    const generatePdf = (pdfRequest, onUploadProgress) => {
        return axiosInstance.post("/pdf/generate", pdfRequest, {
            headers: {
                'Authorization': `Bearer ${keycloak.token}`
            },
            responseType: "blob",
            onUploadProgress,
        });
    }

    return { generatePdf };
}
export default usePdfService;