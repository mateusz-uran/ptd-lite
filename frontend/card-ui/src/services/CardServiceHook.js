import axiosInstance from '../api/axiosInstance';
import useAuth from '../api/keycloakHook';

const useCardService = () => {
    const { keycloak } = useAuth();

    const getCards = (username, year, month) => {
        return axiosInstance.get('/card/all', {
            params: {
                username: username,
                year: year,
                month: month
            },
            headers: {
                'Authorization': `Bearer ${keycloak.token}`
            }
        });
    }

    const createCard = (card, year, month, dayOfMonth) => {
        return axiosInstance.post('/card/add', card, {
            params: {
                year: year,
                month: month,
                dayOfMonth: dayOfMonth
            },
            headers: {
                'Authorization': `Bearer ${keycloak.token}`
            }
        })
    }

    const deleteCard = (cardId) => {
        return axiosInstance.delete('/card/delete', {
            params: { cardId: cardId },
            headers: {
                "Authorization": `Bearer ${keycloak.token}`,
            }
        })
    }

    const getTripFromCard = (id) => {
        return axiosInstance.get('/card/trip', {
            params: { id: id },
            headers: {
                "Authorization": `Bearer ${keycloak.token}`,
            }
        })
    };

    const getFuelFromCard = (id) => {
        return axiosInstance.get('/card/fuel', {
            params: { id: id },
            headers: {
                "Authorization": `Bearer ${keycloak.token}`,
            }
        })
    };

    return { getCards, createCard, deleteCard, getTripFromCard, getFuelFromCard };
}
export default useCardService;