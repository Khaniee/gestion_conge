import { whoami } from "../services/auth"
import { notify, NOTIFY_LEVEL } from "../services/notify"

const HTTP_401_UNAUTHORIZED = 401;

export const checkAuthentification = async (router) => {
    try {
        await whoami();
    } catch (error) {
        console.log(error);
        if (error.response && error.response.status == HTTP_401_UNAUTHORIZED) {
            router.navigate('/login');
        }
    }
}