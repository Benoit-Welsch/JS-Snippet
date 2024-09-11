import { it, expect } from 'bun:test';
import { buildUrlWithQuery } from '.';

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

