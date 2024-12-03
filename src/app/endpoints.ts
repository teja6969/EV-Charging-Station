const gatewayBaseUrl = 'http://localhost:8201/';

export const endpoints = {

    login: `${gatewayBaseUrl}api/auth/login`,
    register: `${gatewayBaseUrl}api/auth/registration`,
    saveVendorDetails: `${gatewayBaseUrl}api/auth/saveVendorStationDetails`,
    retriveVendorDetails: `${gatewayBaseUrl}api/auth/retriveVendorStationDetails`,
    updateVendorDetails: `${gatewayBaseUrl}api/auth/updateVendorStationDetails`,
}