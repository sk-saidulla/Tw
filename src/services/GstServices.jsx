import { handleResponse } from "../helper/handle-response";
import Config from "../config";
import { authHeader } from "../helper/auth-header";
export const GstServices = {
    getGstLocations
};
function getGstLocations() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${Config.SERVER_URL}/gst/getgstlocations`, requestOptions)
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}