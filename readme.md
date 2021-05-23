# searchTest

#### The service

`searchTest` is an experimental service for various search methods. Currently only the minimal API is implemented. The data source is in the text file `names.txt`.

#### Version info

node v.14

#### How to run

To run the service locally execute the following commands in the root folder of the project:

1. Install all the npm packages for the project:

    ```sh
    npm install
    ```

2. Start the project:
    ```sh
    npm run start-server
    ```
3. Use your favourite API tool like Postman or Insomnia to access following endpoints:

    ```sh
    GET: http://localhost:2021/read
    ```

	To read the file contents.
	__

    ```sh
    POST: http://localhost:2021/search/simple
    ```

    With json body like: {"keyword": "Luci Mercado"} to try the simple search.
	__
    ```sh
    POST http://localhost:2021/search/simple-fuzzy
    ```

    With json body like: {"keyword": "Matthew Dark"} to try the fuzzy search with the help of Fuse lib.
