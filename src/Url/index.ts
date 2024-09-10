export const buildUrlWithQuery = (
  inUrl: string,
  query: Record<string, string | string[] | undefined>,
) => {
  const url = new URL(inUrl);
  Object.keys(query).forEach((key) => {
    const currentQuery = query[key];
    if (Array.isArray(currentQuery)) {
      currentQuery.forEach((qArr) => url.searchParams.append(key, qArr));
    } else {
      if (currentQuery)
        url.searchParams.set(key, currentQuery);
    }
  });
  return url;
};
