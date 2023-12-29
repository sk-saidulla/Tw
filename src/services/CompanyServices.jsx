import { handleResponse } from "../helper/handle-response";
import Config from "../config";
import { authHeader } from "../helper/auth-header";
export const CompanyServices = {    
    getCompanyAllData,
    getCompanyDetails,
    updateCompany  
};
function getCompanyAllData() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${Config.SERVER_URL}/company/GetCompanyAllData`, requestOptions)
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}
function getCompanyDetails() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${Config.SERVER_URL}/company/GetCompanyDetails`, requestOptions)
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}

function updateCompany(
    companyName,
    address,
    aliasName,
    mailingName,
    countryId,
    stateId,
    pincode,
    phoneNo,
    mobileno,
    whatsappno,
    website,
    pan,
    isGstApplicable,
    gstnumber,
    gstUserName,
    gstStateCode,
    gstapplicablefrom,
    isTdsApplicable,
    tinNumber,
    tdsapplicablefrom,
    isEInvoiceApplicable,
    eInvoiceUserName,
    eInvoicePassword,
    isEwayBillApplicable,
    ewayBillUserName,
    ewayBillPassword
) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({
            companyName,
            address,
            aliasName,
            mailingName,
            countryId,
            stateId,
            pincode,
            phoneNo,
            mobileno,
            whatsappno,
            website,
            pan,
            isGstApplicable,
            gstnumber,
            gstUserName,
            gstStateCode,
            gstapplicablefrom,
            isTdsApplicable,
            tinNumber,
            tdsapplicablefrom,
            isEInvoiceApplicable,
            eInvoiceUserName,
            eInvoicePassword,
            isEwayBillApplicable,
            ewayBillUserName,
            ewayBillPassword
        })
    };
    return fetch(`${Config.SERVER_URL}/company/UpdateCompany`, requestOptions)
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}