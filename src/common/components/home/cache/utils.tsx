import { CACHE_PERMISSION_ID, CACHE_STATUS } from "../../../constants/main"

export const cacheIsAllowed = () => {
    return true;
    // return localStorage.getItem(CACHE_PERMISSION_ID) === CACHE_STATUS.ALLOW
}