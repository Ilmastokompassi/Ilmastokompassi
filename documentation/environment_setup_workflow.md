# Environment setup

Create .env file to the root of your backend folder and copy [.env.example](/backend/.env.example) file's content to your newly created '.env' file.

Change the content to be the database URL and secret key you are using.

## Database setup

If you have installed your Postgress with installation [script](https://github.com/hy-tsoha/local-pg), start terminal:

```
start-pg.sh
```

Open new terminal window/tab:

```
psql
CREATE DATABASE ilmastokompassi;
\connect ilmastokompassi;
```

Either close psql connection with `\q` or open a new terminal window/tab and create tables to your newly created database:

```
psql -d ilmastokompassi < backend/src/schema.sql
```

Insert example climate profiles to the database:

```
psql -d ilmastokompassi < backend/src/climateprofiles.sql
```

Update your .env file's DATABASE_URI:

```
DATABASE_URI=postgresql:///ilmastokompassi

```

Or if you have installed psycopg2 dependency:

```

DATABASE_URI=postgresql+psycopg2:///ilmastokompassi
```
