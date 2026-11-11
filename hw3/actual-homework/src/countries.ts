export interface Country {
  names?: { common?: string };
  capitals?: { name?: string }[];
  currencies?: { code?: string; name?: string; symbol?: string }[];
  population?: number;
  flag?: { url_png?: string; description?: string };
  region?: string;
}

interface Region {
  name: string;
  countries: Country[];
}

export const countryName = (country: Country): string => country.names?.common || 'Unknown country';

export const sortCountries = (countries: Country[]): Country[] => [...countries].sort(
  (first, second) => countryName(first).localeCompare(countryName(second), 'en'),
);

export const populousCountries = (countries: Country[]): Country[] => countries
  .filter((country) => (country.population ?? 0) >= 50000000)
  .sort((first, second) => (second.population ?? 0) - (first.population ?? 0));

export const groupRegions = (countries: Country[]): Region[] => {
  const regions = new Map<string, Country[]>();
  sortCountries(countries).forEach((country) => {
    const region = country.region?.trim() || 'Unknown region';
    const members = regions.get(region) ?? [];
    members.push(country);
    regions.set(region, members);
  });
  return [...regions.entries()]
    .map(([name, members]) => ({ name, countries: members }))
    .sort((first, second) => first.name.localeCompare(second.name, 'en'));
};

export const capitalNames = (country: Country): string => (country.capitals ?? [])
  .map((capital) => capital.name || 'Unavailable')
  .join(', ') || 'Unavailable';

export const currencyNames = (country: Country): string => (country.currencies ?? [])
  .map((currency) => `${currency.name || currency.code || 'Unknown currency'} (${currency.symbol || 'symbol unavailable'})`)
  .join(', ') || 'Unavailable';

const fetchCountries = async (): Promise<Country[]> => {
  const apiKey = process.env.RESTCOUNTRIES_API;
  // PR review (keitabacon): braces on if statements (Airbnb blocks-braces).
  if (!apiKey) {
    throw new Error('Set RESTCOUNTRIES_API in the repository root .env file');
  }

  const countries: Country[] = [];
  let more = true;
  while (more) {
    const url = new URL('https://api.restcountries.com/countries/v5');
    url.searchParams.set('limit', '100');
    url.searchParams.set('offset', String(countries.length));
    url.searchParams.set('response_fields', 'names.common,capitals,currencies,population,flag,region');
    // PR review (keitabacon): await in loop is intentional, see reason below.
    // Pages must be fetched in order
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(15000),
    });
    // PR review (keitabacon): braces on if statements (Airbnb blocks-braces).
    if (!response.ok) {
      throw new Error(`REST Countries returned ${response.status}`);
    }
    // eslint-disable-next-line no-await-in-loop
    const body = await response.json() as {
      data?: { objects?: Country[]; meta?: { more?: boolean } };
    } | null;
    const page = body?.data?.objects;
    if (!Array.isArray(page) || typeof body?.data?.meta?.more !== 'boolean'
      || !page.every((country) => country && typeof country === 'object')
      || (body.data.meta.more && page.length === 0)) {
      throw new Error('REST Countries returned invalid country data');
    }
    countries.push(...page);
    more = body.data.meta.more;
  }
  return countries;
};

let cachedCountries: Promise<Country[]> | undefined;

// PR review (lanluu-hub): cache the dataset instead of refetching on every route.
export const getCountries = (): Promise<Country[]> => {
  cachedCountries ??= fetchCountries().catch((error) => {
    cachedCountries = undefined;
    throw error;
  });
  return cachedCountries;
};
