export const setCookie = (name: string, value: string | number) => {
  document.cookie = `${name}=${value}`
}

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) return parts?.pop()?.split(';').shift();
}