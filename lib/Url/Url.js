const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

/**
 * Return a url with object based query
 * @param  {string} inUrl
 * @param  {{[key: string]: string | string[]}} query
 */
export const buildUrlWithQuery = (inUrl, query) => {
  const url = new URL(inUrl);
  Object.keys(query).forEach((key) => {
    const currentQuery = query[key];
    if (Array.isArray(currentQuery)) {
      currentQuery.forEach((qArr) => url.searchParams.append(key, qArr));
    } else {
      url.searchParams.set(key, currentQuery);
    }
  });
  return url;
};

/**
 * @param  {string} ip
 */
export const isIp = (ip) => {
  return ipRegex.test(ip);
};