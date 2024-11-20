export interface Query {
  [key: string]: string | string[] | number | number[] | boolean | undefined;
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const buildUrlWithQuery = (inUrl: string, query: Query) => {
  const url = new URL(inUrl);
  Object.keys(query).forEach((key) => {
    const currentQuery = query[key];
    if (Array.isArray(currentQuery)) {
      currentQuery.forEach((qArr) =>
        url.searchParams.append(key, qArr.toString()),
      );
    } else {
      if (currentQuery !== undefined && currentQuery !== null)
        url.searchParams.set(key, currentQuery.toString());
    }
  });
  return url;
};

export class Uri {
  constructor(
    private url: string,
    private method: Method,
    private query: Query,
    private body: Query,
    private headers: Record<string, string> = {},
  ) { }

  get urlWithQuery() {
    return buildUrlWithQuery(this.url, this.query).toString();
  }

  fetchJson = async () => {
    return (await this.fetch()).json();
  };

  fetch = () => {
    return fetch(buildUrlWithQuery(this.url, this.query).toString(), {
      method: this.method,
      body: JSON.stringify(this.body),
      headers: this.headers,
    });
  };
}
