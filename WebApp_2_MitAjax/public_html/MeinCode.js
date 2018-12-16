/*jshint esversion: 6 */

/*
 * This file is licensed under the terms of the BSD 3-Clause License.
 */

/**
 * Callback-Funktion fuer Ajax-Request; wird ausgeführt, wenn
 * HTTP-Response zu Ajax-Request vom Browser empfangen wurde.
 * 
 * API-Doku zu $.get(): http://api.jquery.com/jQuery.get/
 */
function ajaxCallbackFunktion(ajaxResultData) { "use strict";

    $("#ergebnis").text(ajaxResultData);
}


/*
 * Event-Handler für den Such-Button, setzt Ajax-Request ab.
 */
function onSuchButton() { "use strict";

    $("#ergebnis").text(""); // Ergebnis-Anzeige löschen

    const suchfeldEingabe    = $("#kfzKuerzel").val().trim();

    const urlFuerAjaxRequest = "/suchen?kfz_kuerzel=" + suchfeldEingabe;


    // Absetzen Ajax-Request
    $.get(urlFuerAjaxRequest, ajaxCallbackFunktion);
    console.log("Ajax-Request mit folgender URL abgesetzt: " + urlFuerAjaxRequest);
}


/*
 * Event-Handler für "Document-Ready"-Event, registriert
 * den Event-Handler für den "Suchen"-Button.
 */
function onDocumentReadyHandler() { "use strict";

    $("#suchenButton").click( onSuchButton );

    console.log("Event-Handler für Document-Ready-Event abgearbeitet.");
}


$( document ).ready( onDocumentReadyHandler );
