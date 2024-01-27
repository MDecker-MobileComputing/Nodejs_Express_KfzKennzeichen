#!/usr/bin/env node

/*jshint esversion: 6 */

/*
 * Diese Datei stellt das "Server-Backend" für eine Webapp dar.
 *
 * This file is licensed under the terms of the BSD 3-Clause License.
 */


// Express-Framework laden und instanziieren.
const express     = require("express");
const meineWebApp = express();


// Statische Dateien publizieren
meineWebApp.use("/", express.static("WebApp_1_OhneAjax/public_html") );


// "Datenbank"-Objekt laden.
const kfzKennzeichenDB = require("../KfzKennzeichenDatenbank/KfzKennzeichenDB.js");

/*
 * Handler für Suchanfrage nach KFZ-Kürzel.
 * Das zu suchende KFZ-Kürzel muss in einem URL-Parameter
 * mit dem Namen "kfz_kuerzel" enthalten sein.
 * Beispiel für Suche nach HH: /suchen?kfz_kuerzel=KA
 */
function meinRequestHandler(request, response) {

    const kfzKuerzel = request.query.kfz_kuerzel;

    const ergebnis = kfzKennzeichenDB.abfrage(kfzKuerzel);

    response.send( "<!DOCTYPE html>\n<html lang=\"de\">\n"                                 +
                   "<head>\n"                                                              +
                   "  <title>Ergebnis</title>\n"                                           +
                   "  <link rel=\"stylesheet\" type=\"text/css\" href=\"MeinStil.css\">\n" +
                   "</head>\n<body>\n"                                                     +
                   "  <h1>Ergebnis</h1>\n"                                                 +
                   "  <p>Ergebnis für \"" + kfzKuerzel + "\": " + ergebnis + "</p>\n"      +
                   "  <a href=\"index.html\">Zurück</a>\n"                                 +
                   "</body>" );
}

meineWebApp.get("/suchen", meinRequestHandler);



// Start des Servers
const portNummer = 8080;
const meinServer = meineWebApp.listen(portNummer, function() {

    console.log("\nWeb-Server gestartet auf Port-Nummer " + portNummer + " (Variante OHNE Ajax).\n");
});
