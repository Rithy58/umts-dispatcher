# umts-dispatcher [![Production Status](https://img.shields.io/travis/Rithy58/umts-dispatcher/master.svg?label=production)](https://travis-ci.org/Rithy58/umts-dispatcher) [![Staging Status](https://img.shields.io/travis/Rithy58/umts-dispatcher/staging.svg?label=staging)](https://travis-ci.org/Rithy58/umts-dispatcher)

This is a web application for UMass Transit Services dispatcher interface. This project includes a node.js server for the backend, a postgres database, and Angular2 for the front end. A live example can be found here: https://umts-staging.herokuapp.com/shifts

## Setup

To run this project, first clone this repository. Then, install the related dependencies by running the following from your shell:
```
npm install
```

The project relies on a .env file not included in the repository. The file must be created using the following format:
```
PORT=[Server port]
PGUSER=[database username]
PGPASSWORD=[database password]
PGHOST=[database url]
PGDATABASE=[database name]
PGPORT=[database port]
```

The database schema this project uses is the folllowing: 

CREATE TABLE route (
  number integer PRIMARY KEY,
  valid_bus_types text
);

CREATE TABLE driver (
  id SERIAL PRIMARY KEY,
  name text,
  phone text,
  late_count INTEGER
);

CREATE TABLE detour (
  id SERIAL PRIMARY KEY,
  path text,
  is_active BOOLEAN,
  routes INTEGER[]
);

CREATE TABLE shift(
  id SERIAL PRIMARY KEY,
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  start_location text,
  end_location text,
  driver_id INTEGER,
  bus_id text,
  route INTEGER
);

CREATE TABLE bus(
  id text PRIMARY KEY,
  type text,
  defects text
);


CREATE TABLE incidents (
  id SERIAL PRIMARY KEY,
  shift_id integer,
  description text
);

## Running the server
Once you have configured the environment and database and installed the dependencies, the server can be run by executing:
```
npm start
```


## Testing
The testing setup currently uses a remote database for excecution. The database information is in testDB.js. Note that in the current setup, only the database name and url are specified, as we kept the port, username and password the same as the production .env variables. The config{} json in both modules/db.js and modules/testDB.js are where these fields can be declared, but the default is to fallback on the PG environment variables in the .env file. 

To run our unit tests, execute:
```
npm test
```
