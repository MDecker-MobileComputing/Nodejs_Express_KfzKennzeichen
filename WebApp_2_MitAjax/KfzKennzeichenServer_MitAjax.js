#!/usr/bin/env node

/*jshint esversion: 6 */

/*
 * Diese Datei stellt das "Server-Backend" für eine Webapp dar.
 *
 * This file is licensed under the terms of the BSD 3-Clause License.
 */


// Espress-Framework laden und instanziieren.
const express     = require("express");
const meineWebApp = express();


// Statische Dateien publizieren
meineWebApp.use("/", express.static("WebApp_2_MitAjax/public_html") );


// "Datenbank"-Objekt laden.
const kfzKennzeichenDB = require("../KfzKennzeichenDatenbank/KfzKennzeichenDB.js");


/*
 * Handler für Suchanfrage nach KFZ-Kürzel via Ajax.
 * Das zu suchende KFZ-Kürzel muss in einem URL-Parameter
 * mit dem Namen "kfz_kuerzel" enthalten sein.
 * Beispiel für Suche nach HH: /suchen?kfz_kuerzel=KA
 */
function meinRequestHandler(request, response) {
    
    const kfzKuerzel = request.query.kfz_kuerzel;
    
    const ergebnis   = kfzKennzeichenDB.abfrage( kfzKuerzel );
    
    // Statt einer kompletten HTML-Seite geben wir jetzt nur den
    // "nackten" Ergebnis-String zurück (Ajax-Antwort).
    response.send( ergebnis );
}

meineWebApp.get("/suchen",  meinRequestHandler);



// Start des Servers
const portNummer = 8080;
const meinServer = meineWebApp.listen(portNummer, function() {

    console.log("\nWeb-Server gestartet auf Port-Nummer " + portNummer + " (Variante MIT Ajax).\n");
});
