const gatewayBaseUrl = 'http://localhost:8201/';

export const endpoints = {

    login: `${gatewayBaseUrl}api/auth/login`,
    register: `${gatewayBaseUrl}api/auth/registration`,
    saveVendorDetails: `${gatewayBaseUrl}api/auth/saveVendorStationDetails`,
    retriveVendorDetails: `${gatewayBaseUrl}api/auth/retriveVendorStationDetails`,
    updateVendorDetails: `${gatewayBaseUrl}api/auth/updateVendorStationDetails`,
    retriveDetailsByCity: `${gatewayBaseUrl}api/auth/uservendorretrieve`,
    retriveDetailsByPincode: `${gatewayBaseUrl}api/auth/uservendorretrieve`,
    predictTime: `${gatewayBaseUrl}api/auth/predictTime`,
    bookSlot: `${gatewayBaseUrl}api/auth/slotbooking`,
    validateandupdatepassword: `${gatewayBaseUrl}api/auth/validateandupdatepassword`,
    retrivelatandlong: `${gatewayBaseUrl}api/auth/retrivelatandlong`,
    userbookinghistory: `${gatewayBaseUrl}api/auth/userbookinghistory`,
    feedback: `${gatewayBaseUrl}api/auth/feedback`,
    getfeedback: `${gatewayBaseUrl}api/auth/retrivefeedback`,
    vendorbookinghistory: `${gatewayBaseUrl}api/auth/vendorbookinghistory`,
    
}