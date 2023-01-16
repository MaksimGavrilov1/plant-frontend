import AuthenticationService, { USER_TOKEN } from "./AuthenticationService";

function secureGetFetch(url) {
    if (AuthenticationService.isUserLoggedIn) {
        return fetch(url, {
            headers: {
                'Authorization': sessionStorage.getItem(USER_TOKEN)
            }
        })
    } else {
        return Promise.reject(new Error("Not authorized"))
    }
}
export default secureGetFetch