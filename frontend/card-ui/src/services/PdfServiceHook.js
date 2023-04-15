import { useAuth0 } from '@auth0/auth0-react';
import axiosInstance from '../api/axiosInstance';
import { getAuthConfig } from '../api/authToken';

const usePdfService = () => {
    const { getAccessTokenSilently } = useAuth0();

    const generatePdf = async (pdfRequest, onUploadProgress) => {
        const config = await getAuthConfig(getAccessTokenSilently);
        return axiosInstance.post("/pdf/generate", pdfRequest, {
            headers: {
                'Authorization': `Bearer ${config}`
            },
            responseType: "blob",
            onUploadProgress,
        });
    }

    return { generatePdf };
}
export default usePdfService;