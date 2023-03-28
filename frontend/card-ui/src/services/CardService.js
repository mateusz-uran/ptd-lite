import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:8181/api/card",
    headers: {
        "Content-type": "application/json"
    }
});

const getCardByUserAndMonth = (username, year, month) => {
    return http.get('/all', {
        params:
        {
            username: username,
            year: year,
            month: month
        }
    })
}

const create = (card, year, month, dayOfMonth) => {
    return http.post('/add', card, {
        params:
        {
            year: year,
            month: month,
            dayOfMonth: dayOfMonth
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