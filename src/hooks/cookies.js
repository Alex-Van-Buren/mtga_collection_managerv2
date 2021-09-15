/**
 * Sets a cookie.
 * @param {string} key The cookie key. Used as a string.
 * @param {string} value The cookie value. Used as a string.
 * @param {number} [expireDays=366] (Optional) Number of days before this cookie expires (max 366);
 * @param {string} [path="/"] (Optional) The path the cookie belongs to. E.g. "/" -> home, "/help" -> The help page.
 */
export function setCookie(key, value, expireDays=366, path="/") {
    document.cookie = `${key}=${value}; expires=${getCookieTime(expireDays)}; path=${path};`;
}

/**
 * Deletes a cookie with the specified key (on the given path if specified).
 * @param {string} key The cookie key to be deleted.
 * @param {string} [path="/"] (Optional) The path to delete the cookie from.
 */
export function deleteCookie(key, path="/") {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
}

/**
 * Return all cookies as an object. Matches cookies with alphanumeric characters, "-", and "_";
 */
export function getCookies() {

    // Parse cookie string
    let cookies = document.cookie;
    const cookieRegex = /([\w-]+)\s*=\s*([\w-]+)/g;
    const matches = [...cookies.matchAll(cookieRegex)];

    // Make object of cookies
    let results = {};
    for (const match of matches) {
        results[match[1]] = match[2];
    }

    return results;
}

/** 
 * Get the correct time string for setting a cookie expiration time given the number of days until the cookie should expire.
 */
function getCookieTime(days) {
    let temp = new Date();
    temp.setTime(temp.getTime() + days*86400000);
    return temp.toUTCString();
}
