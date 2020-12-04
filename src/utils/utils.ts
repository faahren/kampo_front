export const getCookie = (cname: string) => {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      const value = c.substring(name.length, c.length);
      if (value === 'true') {
        return true;
      }
      if (value === 'false') {
        return false;
      }
      return value;
    }
  }
  return false;
};

export const setCookie = (name: string, token: string) => {
  const CookieDate: Date = new Date();
  CookieDate.setFullYear(CookieDate.getFullYear() + 1);
  document.cookie = `${name}=${token}; path=/; expires=${CookieDate.toUTCString()};`;
};

export const deleteCookie = (name: string) => {
  const CookieDate: Date = new Date();
  CookieDate.setFullYear(CookieDate.getFullYear() - 1);
  document.cookie = `${name}=; path=/; expires=${CookieDate.toUTCString()};`;
};