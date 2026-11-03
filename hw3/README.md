# Homework 3 - Jacob Campbell

## How to run tutorials!

### socketIO


```sh
$ cd socketIO
$ node index.js
listening on *:3000
```

Then you can type in the chatbox supa ez

### typescript

This was all web based tutorial so please view each exercise and the completed code inside of /typescript

---

### Homework 3 Actual

```sh
cd hw3/actual-homework
npm start
```

Open http://localhost:3000/home on your web browser.

A REST Countries API with four routes:

- **/home**: Welcome page
- **/countries**: Returns a list of all countries in the world, their capitals, and their currency names and symbols.
- **/populous**: Returns a list of all countries with at least 50 million population.
- **/regions**: Returns the number of countries and the names of each country in each region of the world.

The app uses the official REST Countries v5 API at https://api.restcountries.com/countries/v5 with a free API key. Put `RESTCOUNTRIES_API=your-key` in `.env` at the repository root (next to `hw3/`). The start and dev scripts load it with Node's built-in `--env-file` option.
