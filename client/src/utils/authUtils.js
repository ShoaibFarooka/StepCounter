import Cookies from "js-cookie";

const isAuthenticated = () => {
    const token = Cookies.get('fixit-jwt-token');
    //console.log(token)
    return !!token
}

export { isAuthenticated }
