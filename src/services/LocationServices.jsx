import { handleResponse } from "../helper/handle-response";
import Config from "../config";
import { authHeader } from "../helper/auth-header";
export const LocationService = {
    getCountry,
    getStates,
    
};
function getCountry() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${Config.SERVER_URL}/Location/GetCountries`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}

function getStates(countryId) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ countryId })
    };

    return fetch(`${Config.SERVER_URL}/Location/GetStates`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}