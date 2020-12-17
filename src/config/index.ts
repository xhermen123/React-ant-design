const LOCAL_HOSTNAME = "localhost"
const LOCAL_IP = "192.168"
const DEV_HOSTNAME = "staging"

////////////////////////////////////////
// BACKEND API //
////////////////////////////////////////
export const apiUrl = (): string => {
    const PROD_URL = 'https://api.subtask.com';
    const DEV_URL = 'https://staging-api.subtask.com';

    // DO NOT MODIFY!!! If you need to call the staging api make sure you change it back before pushing to github
    const LOCAL_URL = 'http://localhost:8765/api';

    if (window.location.hostname.includes(LOCAL_HOSTNAME)) {
        return LOCAL_URL
    } 
    if (window.location.hostname.includes(LOCAL_IP)) {
        return `http://${window.location.hostname}:8000`
    }
    if (window.location.hostname.includes(DEV_HOSTNAME) || window.location.hostname.includes('vg-') || window.location.hostname.includes('firebase')) {
        return DEV_URL
    }
    return PROD_URL
}

////////////////////////////////////////
// GOOGLE //
///////////////////////////////////////
export const GOOGLE_CLIENT_ID='1090341333435-dsnjslm1bg3sblmu8407lltl9mhgnso9.apps.googleusercontent.com'
export const GOOGLE_API_KEY='AIzaSyC6lD9rxE5Numn2vRMr2m93lGzT1ipYisI'

////////////////////////////////////////
// FACEBOOK //
////////////////////////////////////////
export const FACEBOOK_APP_ID='542421312844067'

////////////////////////////////////////
// ALGOLIA //
////////////////////////////////////////
export const ALOGLIA_APP_ID = 'N10EPJQ06G'
export const ALOGLIA_API_KEY = 'dfca981396cc4875b4a40701b897be52'

export const algoliaVenueIndex = (): string => {
    const PROD_NAME = 'production_VENUES';
    const DEV_NAME = 'staging_VENUES';
    const LOCAL_NAME = 'local_VENUES';

    if (window.location.hostname.includes(LOCAL_HOSTNAME)) {
        return LOCAL_NAME
    } 
    if (window.location.hostname.includes(LOCAL_IP)) {
        return LOCAL_NAME
    }
    if (window.location.hostname.includes(DEV_HOSTNAME) || window.location.hostname.includes('vg-') || window.location.hostname.includes('firebase')) {
        return DEV_NAME
    }
    return PROD_NAME
}

