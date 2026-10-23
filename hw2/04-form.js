const express = require('express');

const app = express();
const port = process.env.PORT || 5001;
// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered
app.use(express.urlencoded({ extended: false }));
const form = `<p>This is my form!</p>
  <form action="/submit" method="POST">
    <label for="username">Username:</label>
    <input id="username" type="text" name="username">
    <label for="email">Email:</label>
    <input id="email" type="email" name="email">
    <button type="submit">Submit Form</button>
  </form>`;

app
  .get('/form', (req, res) => {
    res.status(200).type('html').send(form);
  })
  .post('/submit', (req, res) => {
    res.status(200).type('json').json({
      username: req.body.username,
      email: req.body.email,
    });
  })
  .use((req, res) => {
    res.status(404).type('html').send('404 - page not found');
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
