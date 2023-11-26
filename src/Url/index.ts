const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

export const buildUrlWithQuery = (
  inUrl: string,
  query: Record<string, string | string[]>,
) => {
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

export const isIp = (ip: string) => {
  return ipRegex.test(ip);
};
