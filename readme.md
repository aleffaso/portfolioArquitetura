# Portfolio - Architecture Projects

<p>
    <img src="public/assets/img/wallpaper.png">
</p>

## Overview
The main purpose of this project is to create a webpage to a cliente about her architecture projects.

<hr>

## Libraries 

- Bcrypt => Crypt password;
- Body-parser => Bypass json data;
- DotEnv => Work with envkeys;
- EJS => Render HTML;
- Express => Flexible framework;
- Express-session => create specific routes for admins controller;
- JWT: Json Web Token => Security Access 
- Mysql2 => Data base;
- Nodemon => Update server when save;
- Sequelize => Manipulate database;
- Slugify => Replaces spaces with hyphen from saved text;
- TinyMCE => Manage blog hyper text

<hr>

## Set up `docker-compose.yml` file

- `DATABASE_PASSWORD=yourPassword` <= services: web
- `POSTGRES_PASSWORD=yourPassword` <= services: db

<hr>

## Running the application

To run the app you'll need [Docker](https://www.docker.com/products/docker-desktop/). After that, follow the steps below in your `terminal`:

- Run: `git clone https://github.com/aleffaso/portfolioArquitetura.git`

- Run: `docker-compose build`;
- Run: `docker-compose up`;

- Link: You can access the web page on `http://localhost:3000/`

- The application is also running at this [link](https://thaynasantos.herokuapp.com/) on Heroku

<hr>


## Licenses
<br>
<p>
    <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white">
</p>
