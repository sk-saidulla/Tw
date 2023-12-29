const currentUser=JSON.parse(localStorage.getItem('currentUser')) ;
export function authHeader() {
    if (currentUser && currentUser.token) {
        return {
            Authorization: `Bearer ${currentUser.token}`,
            'Content-Type': 'application/json'
        };
    }
    else {
        return {};
    }
}
export function authUploadHeader() {   
    if (currentUser && currentUser.token) {
        return {
            Authorization: `Bearer ${currentUser.token}`
        };
    }
    else {
        return {};
    }
}
