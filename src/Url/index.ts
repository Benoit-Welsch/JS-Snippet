export const buildUrlWithQuery = (
  inUrl: string,
  query: Record<string, string | string[] | number | number[] | boolean | undefined>,
) => {
  const url = new URL(inUrl);
  Object.keys(query).forEach((key) => {
    const currentQuery = query[key];
    if (Array.isArray(currentQuery)) {
      currentQuery.forEach((qArr) => url.searchParams.append(key, qArr.toString()));
    } else {
      if (currentQuery !== undefined && currentQuery !== null)
        url.searchParams.set(key, currentQuery.toString());
    }
  });
  return url;
};

class Uri {

  constructor(private url: string, private query: Record<string, string[]>) { }

  fetchJson = async (query: Record<string, string | string[] | undefined>) => {
    const response = await fetch(buildUrlWithQuery(this.url, query).toString());
    return response.json();
  }
}