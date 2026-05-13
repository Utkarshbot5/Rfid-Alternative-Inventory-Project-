import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/releases';

export const fetchReleases = () => async (dispatch) => {
    try {
        const response = await axios.get(API_BASE_URL);
        const products = response.data.map((product, index) => ({
            number: index + 1,
            transactionId: product.transactionId,
            stockId: product.rfid,
            releaseQuantity: product.releaseQuantity,
            releasePrice: product.releasePrice,
            time: product.timestamp,
        }));
        dispatch({ type: 'FETCH_RELEASES_SUCCESS', payload: products });
    } catch (error) {
        dispatch({ type: 'FETCH_RELEASES_FAILURE', error });
    }
};

export const updateRelease = (transactionId, updatedData) => async (dispatch) => {
    try {
        await axios.put(`${API_BASE_URL}/${transactionId}`, updatedData);
        dispatch({ type: 'UPDATE_RELEASE_SUCCESS', payload: updatedData });
    } catch (error) {
        dispatch({ type: 'UPDATE_RELEASE_FAILURE', error });
    }
};

export const deleteRelease = (transactionId) => async (dispatch) => {
    try {
        await axios.delete(`${API_BASE_URL}/${transactionId}`);
        dispatch({ type: 'DELETE_RELEASE_SUCCESS', payload: transactionId });
    } catch (error) {
        dispatch({ type: 'DELETE_RELEASE_FAILURE', error });
    }
};
