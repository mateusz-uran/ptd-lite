import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:8181/api/card",
});

const getCardByUserAndMonth = (username, year, month, token) => {
    return http.get('/all', {
        params:
        {
            username: username,
            year: year,
            month: month
        },
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    })
}

const create = (card, year, month, dayOfMonth, token) => {
    return http.post('/add', card, {
        params:
        {
            year: year,
            month: month,
            dayOfMonth: dayOfMonth
        },
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    });
}

const getTripFromCard = id => {
    return http.get('/trip', { params: { id: id } })
};

const getFuelFromCard = id => {
    return http.get('/fuel', { params: { id: id } })
};

const deleteCard = cardId => {
    return http.delete('/delete', { params: { cardId: cardId } })
};

const CardService = {
    getCardByUserAndMonth,
    create,
    getTripFromCard,
    getFuelFromCard,
    deleteCard,
};

export default CardService;