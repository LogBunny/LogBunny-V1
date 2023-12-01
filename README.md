<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">LogBunny</h3>

  <p align="center">
    A logger for all your needs
    <br />
    <br />
    <a href="https://github.com/github_username/repo_name">View Demo</a>
    ·
    <a href="https://github.com/dyte-submissions/november-2023-hiring-Lioncat2002/issues">Report Bug</a>
    ·
    <a href="https://github.com/dyte-submissions/november-2023-hiring-Lioncat2002/issues">Request Feature</a>
  </p>
</div>

![image](https://github.com/dyte-submissions/november-2023-hiring-Lioncat2002/assets/74904820/26d87796-7c20-471d-8f69-d50d3132a37b)

<!-- ABOUT THE PROJECT -->
## About The Project
Sabertooth is a drop in realtime logger with an interactive dashboard

### Demo


https://github.com/dyte-submissions/november-2023-hiring-Lioncat2002/assets/74904820/4ba1bfba-3db6-406c-9bc4-c26a435b608a



<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

- NextJS
- ExpressJS

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Backend
- Move into the backend directory and run
  
npm
  ```sh
  npm install
  ```
yarn
  ```sh
  yarn
  ```
- Add the environment variables based on the .example-env or as mentioned below
```env
PORT=
MONGO_URI=
REDIS_HOST=
REDIS_PASS=
REDIS_PORT=
```
- Build the project first with

npm
  ```sh
  npm run build
  ```
yarn
  ```sh
  yarn build
  ```
- Run the project with

npm
  ```sh
  npm run dev
  ```
yarn
  ```sh
  yarn dev
  ```

### Frontend
- Move into the frontend directory and run
  
npm
  ```sh
  npm install
  ```
yarn
  ```sh
  yarn
  ```
- Run the project with

npm
  ```sh
  npm run dev
  ```
yarn
  ```sh
  yarn dev
  ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

- You can checkout the documentation and endpoints at:
https://documenter.getpostman.com/view/22341383/2s9Ye8eu4T
- Checkout the deployment on:
    - Frontend: https://sabertooth-seven.vercel.app/
    - Backend: https://sabertooth.fly.dev/

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## System Design
There are three endpoints
- /ingest
- /stream
- /logs
### /ingest endpoint
  - POST request, does two things,
      1. Adds the log into a BullMQ queue for later processing and insertion into the database
      2. Adds the data into a Redis publisher channel
### /stream endpoint
  - GET request, realtime, Keep-Alive connection, subscribes to the Redis channel and shows the latest data live. You can append various query parameters to filter the logs
### /logs endpoint
  - GET request, gets the entire log from the database. You can append various query parameters to filter the logs

#### For **/stream** and **/logs** endpoints,

**Possible parameters:**
- level:debug
- msg_regex:^redis$ --> Supports all regex
- trace_id:a traceid
- from_timestamp:2023-12-16T12:34 --> Must be timestamp
- to_timestamp:2023-12-16T12:34 --> Must be timestamp

Example url: https://sabertooth.fly.dev/logs?from=2023-10-16T12:34&to=2025-12-16T12:34&level=info&resource_id=ew123eaa&trace_id=ed23133&span_id=eq23aa&commit=9bffcdd&parent_resource_id=awq12&msg_regex=^redis$

<!-- ROADMAP -->
## Roadmap

- [x] Searching on entire logfile
- [x] Implement search within specific date ranges.
- [x] Utilize regular expressions for search.
- [x] Allow combining multiple filters.
- [x] Provide real-time log ingestion and searching capabilities.
- [ ] Implement role-based access to the query interface.
- [ ] Batching entries to reduce number of db insertion calls

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.md` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@twitter_handle]([https://twitter.com/twitter_handle](https://twitter.com/LionCatDev2002)) - sankhayan2002@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>
