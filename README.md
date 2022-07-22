# NOTES-REST-API

Create, Read and Update Notes

## Requirements

1. Mac OS (feel free to use any OS).
2. [NodeJS](https://nodejs.org/en/download/).
3. [MySQL](https://www.mysql.com/downloads/).
   1. [TablePlus](https://tableplus.com/) (Feel free to use any database management tool)
4. [Git](https://git-scm.com/).

## Setup

#### NodeJS:

1. Download and Install [NodeJS](https://nodejs.org/en/download/) on your OS.

#### MySQL:

1. Download and Install [MySQL](https://www.mysql.com/downloads/) on your OS. Follow the documentation to start up your MySQL server.
2. Download and Install [TablePlus](https://tableplus.com/) on your Mac OS.
3. Launch TablePlus database management GUI client and create a new connection to your local database.
   1. Create a new database called "notes-api".
   2. Store the database variables in your OS environment by running:
   ```bash
   export DB_HOST=YOUR-DATABASE-HOST
   ```
   ```bash
   export DB_USER=YOUR-DATABASE-USER
   ```
   ```bash
   export DATABASE_NAME=notes-api
   ```
   ```bash
   export DB_PASSWORD=YOUR-DATABASE-PASSWORD
   ```
   ```bash
   export DB_PORT=YOUR-DATABASE-PORT
   ```

#### Git:

1. Download and Install [Git](https://git-scm.com/) on your OS.
2. Launch your terminal and clone the project by running:

```bash
git clone https://github.com/cooleraid/notes-api.git
```

## Usage

Navigate to the project directory in your terminal and install the project's dependencies and migrations.

```bash
npm install
```

```bash
npm run migrate
```

Set the project's PORT by running:

```bash
export PORT=1501
```

Note: Replace "1501" with your preferred PORT.

Start the project's dev server by running:

```bash
npm run dev
```
## REST API Documentation

The REST API is documented using postman and can be accessed [here](https://chinotes-api.herokuapp.com/v1/doc).

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.