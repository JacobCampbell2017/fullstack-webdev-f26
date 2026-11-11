import path from 'node:path';
// This line good because less than 4 imports
import express, { Request, Response } from 'express';
// PR review (lanluu-hub): multiline imports, one per line.
import {
  capitalNames,
  Country,
  countryName,
  currencyNames,
  getCountries,
  groupRegions,
  populousCountries,
  sortCountries,
} from './countries';

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../public')));
app.locals.countryName = countryName;
app.locals.capitalNames = capitalNames;
app.locals.currencyNames = currencyNames;

app.get('/', (request, response) => response.redirect('/home'));
app.get('/home', (request, response) => response.render('home', { title: 'Welcome' }));

// PR review (keitabacon): each route gets its own app.get
const showCountries = (
  render: (response: Response, countries: Country[]) => void,
) => async (request: Request, response: Response) => {
  try {
    render(response, await getCountries());
  } catch (error) {
    console.error(error);
    response.status(502).render('error', { title: 'Countries unavailable' });
  }
};

app.get('/countries', showCountries((response, countries) => response.render('countries', {
  title: 'All countries', countries: sortCountries(countries),
})));
app.get('/populous', showCountries((response, countries) => response.render('populous', {
  title: 'Population of at least 50 million', countries: populousCountries(countries),
})));
app.get('/regions', showCountries((response, countries) => response.render('regions', {
  title: 'Regions', regions: groupRegions(countries),
})));

app.use((request, response) => response.status(404).render('error', { title: 'Page not found' }));
app.listen(3000, () => console.log('Visit http://localhost:3000/home'));
