# Webapp mit Node.js-Backend #

<br>

This repository contains two variants of a simple web-app (without and with
[Ajax](https://en.wikipedia.org/wiki/Ajax_(programming))) with a backend
based on [express](https://www.npmjs.com/package/express) for *Node.js*.
The usecase of both variants of the app is it to perform queries on a tiny subset of
the German codes for vehicle registration plates (e.g. code "B" stands for "Berlin").

<br>

----

## Running the application ##

<br>

After cloning or downloading the repository you have to download express and its dependencies by
executing the following command:
````
    npm install
````
<br>

To start the server component of the application in the variant *without Ajax* you have to
execute the script "ohne" (German for "without"):
````
    npm run ohne
````

After this you can open the web application at http://localhost:8080 .

<br>

For starting the server component in the variant *with Ajax* (make sure that the other variant
is no longer running) you have to execute the script "mit" (German for "with"):
````
    npm run mit
````

This variant of the web application is also to be accessed at http://localhost:8080 .

<br>

The dependencies and the two scrips "ohne" and "mit" are both defined in the file `package.json`.

<br>

----

## License ##

<br>

See the [LICENSE file](LICENSE.md) for license rights and limitations (BSD 3-Clause License)
for the files in this repository.

The Ajax variant of the application contains [jQuery](https://jquery.org) which is published
under the terms of [MIT license](https://jquery.org/license/).

<br>
