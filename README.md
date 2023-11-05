<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="#">
    <img src="https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png" alt="Logo" width="150">
  </a>

<h2 align="center">NodeJS Simple Login</h2>

  <p align="center">Simple Login and CRUD app made with NodeJS and Express for IntelliNext assignment<br>
    <a href="#">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#api-documentation">API Documentation</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]]()

Base NodeJS+Express API with connection to PostgreSQL database that implements a simple login with JWT and a CRUD of
users. Made for development assignment at IntelliNext

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [![Next][express-shield]][express-url]
* [![Next][pgsql-shield]][pgsql-url]

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* [Node JS v18](https://nodejs.org/en)
* [PostgreSQL](https://www.postgresql.org)

### Installation

1. Clone the repo
   ```sh
   gh repo clone NeutronBlast/Node-Simple-Login
   ```
2. Install packages
   ```sh
    npm install
   ```
3. Create a .env file on the root path of the project with the following variables
   ```
   POSTGRES_URL=postgresql://[USER]:[PASSWORD]@localhost:5432/nodejs-simple-login
   NODE_ENV=[ENV]
   APP_URL=http://localhost:3000
   JWT_SECRET=[SECRET_KEY]
   DATABASE_CERT_PATH=./cacert.pem
   ```

4. Go to `config/db` folder and execute `creates.sql` in a database called `nodejs-simple-login` 
5. Initiate API
   ```sh
    npm run dev
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## API Documentation
<!-- USAGE EXAMPLES SCREENSHOTS -->

You can check the API documentation by clicking [here](https://github.com/NeutronBlast/Node-Simple-Login/tree/main/docs)


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [Jest](https://jestjs.io)

<p align="right">(<a href="#top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[product-screenshot]: assets/ss.png
[express-shield]: https://img.shields.io/badge/express-4-ffffff?style=for-the-badge&logo=express&logoColor=green
[express-url]: https://expressjs.com/es/
[pgsql-shield]: https://img.shields.io/badge/postgresql-16-blue?style=for-the-badge&logo=postgresql&logoColor=blue
[pgsql-url]: https://www.postgresql.org
