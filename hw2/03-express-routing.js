const express = require('express');

const app = express();
const port = process.env.PORT || 5001;

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

// const routes = ['welcome', 'redirect', 'redirected', 'cache', 'cookie', 'other'];

// Add your code here

app
  .get('/welcome', (req, res) => {
    res.status(200).type('html').send('<p>Welcome to my express page</p>');
  })
  .get('/redirect', (req, res) => {
    res.redirect('/redirected');
  })
  .get('/redirected', (req, res) => {
    res.status(200).type('html').send('<p>get redirected nerd</p>');
  })
  .get('/cache', (req, res) => {
    res
      .status(200)
      .type('html')
      .set({ 'cache-control': 'max-age=86400' })
      .send('<p>this resource was cached</p>');
  })
  .get('/cookie', (req, res) => {
    res.status(200).type('text').cookie('hello', 'world').send('cookies... yummm');
  })
  .use((req, res) => {
    res.status(404).type('html').send('404 - page not found');
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
