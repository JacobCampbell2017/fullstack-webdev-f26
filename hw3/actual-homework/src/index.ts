import path from 'node:path';
import express from 'express';
import {
  capitalNames, countryName, currencyNames, getCountries, groupRegions, populousCountries, sortCountries,
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

app.get(['/countries', '/populous', '/regions'], async (request, response) => {
  try {
    const countries = await getCountries();
    if (request.path === '/countries') {
      response.render('countries', {
        title: 'All countries', countries: sortCountries(countries),
      });
    } else if (request.path === '/populous') {
      response.render('populous', { title: 'Population of at least 50 million', countries: populousCountries(countries) });
    } else {
      response.render('regions', { title: 'Regions', regions: groupRegions(countries) });
    }
  } catch (error) {
    console.error(error);
    response.status(502).render('error', { title: 'Countries unavailable' });
  }
});

app.use((request, response) => response.status(404).render('error', { title: 'Page not found' }));
app.listen(3000, () => console.log('Visit http://localhost:3000/home'));
