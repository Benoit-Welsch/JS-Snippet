import { it, expect, describe } from 'bun:test';
import { buildUrlWithQuery, Uri } from '.';

describe('Url', () => {
  it('Should get a url with query', () => {
    const query = {
      p: 2,
      brand: ['sony', 'microsoft', 'nintendo'],
      s: 'game',
      private: false,
    };
    const url = buildUrlWithQuery('https://lv0.eu/', query);
    expect(url.toString()).toBe(
      'https://lv0.eu/?p=2&brand=sony&brand=microsoft&brand=nintendo&s=game&private=false',
    );
  });

  it('Should create a Uri and get a response', async () => {
    const uri = new Uri(
      'https://lv0.eu/',
      'POST',
      {
        p: 2,
        brand: ['sony', 'microsoft', 'nintendo'],
        s: 'game',
        private: false,
      },
      {
        p: 2,
        brand: ['sony', 'microsoft', 'nintendo'],
        s: 'game',
        private: false,
      },
    ).fetch();


    const response = await (await uri).json();
    console.log(response);

    expect(response).toBeDefined();
  });
});

