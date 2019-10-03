/*jshint esversion: 6 */

/*
 * Dieses Modul simuliert eine Datenbank mit den amtlichen KFZ-Kennzeichen
 * in Deutschland.
 *
 * Für Liste der KFZ-Kennzeichen siehe z.B. http://tinyurl.com/y96szljq
 * (PDF-Datei vom Kraftfahr-Bundesamt).
 *
 * This file is licensed under the terms of the BSD 3-Clause License.
 */


/**
 * Dieses Objekt soll für jedes aus der Textdatei eingelesene KFZ-Kürzel
 * ein Attribut bekommen, das einen String mit der Langbedeutung referenziert.
 *
 * <b>Achtung:</b> Die Attribut-Namen sind case-sensitiv, deshalb alle Attribut-Namen
 *                 in Großbuchstaben (z.B. "KA" statt "Ka" oder "ka").
 *
 * KFZ-Kennzeichen können aus einem bis drei Buchstaben bestehen und auch Umlaute enthalten.
 */
let kfzKennzeichen = null;


/**
 * Funktion zum Initialisieren des Objekts <tt>kfzKennzeichen</tt>,
 * welches als Attribut-Namen die bekannten KFZ-Kennzeichen hat,
 * die einen String mit dem jeweiligen Stadt- oder Landkreis-Namen
 * referenzieren.
 *
 * Diese Funktion sollte nur einmal im Programmablauf aufgerufen
 * werden.
 */
function ladeDatenbank() {

    if (kfzKennzeichen === null) {

        kfzKennzeichen = {};

        // KFZ-Kennzeichen als Objekt-Eigenschaften hinzufügen
        kfzKennzeichen.A   = "Augsburg";
        kfzKennzeichen.B   = "Berlin";
        kfzKennzeichen.BA  = "Bamberg";
        kfzKennzeichen.BAD = "Baden-Baden";
        kfzKennzeichen.HD  = "Heidelberg ";
        kfzKennzeichen.HN  = "Heilbronn";
        kfzKennzeichen.KA  = "Karlsruhe";
        kfzKennzeichen.MA  = "Mannheim";
        kfzKennzeichen.Z   = "Zwickau";

        let zaehler = 0;
        for (let kfzKurz in kfzKennzeichen) { zaehler++; }
        console.log(`\nDatenbank mit ${zaehler} KFZ-Kennzeichen "geladen".\n`);

    } else {

        console.log("\nWARNUNG: Datenbank sollte zum wiederholten Male geladen werden.\n");
    }
}

// Datenbank vor erstem Zugriff einladen, also "Eager Loading" statt "Lazy Loading".
ladeDatenbank();


 /**
  * Funktion zur Abfrage von KFZ-Kennzeichen-Kürzeln.
  *
  * @param kfzKennzeichenKuerzel  KFZ-Kennzeichen-Kürzel als String, für das die Bedeutung
  *                               in der "Datenbank" gesucht werden soll.
  *
  * @return  Liefert String mit Langbedeutung zurück (z.B. "Karlsruhe" für "KA"),
  *          oder Fehlermeldung.
  */
exports.abfrage = function(kfzKennzeichenKuerzel) {

   console.log(`Abfrage für KFZ-Kennzeichen "${kfzKennzeichenKuerzel}".`);

   // Überprüfen, ob Argument "kfzKennzeichenKuerzel" tatsächlich
   // ein String ist (sonst dürfen wir Methode toUpperCase() nicht
   // aufrufen).
   if (typeof(kfzKennzeichenKuerzel) !== "string") {

       console.log("\nWARNUNG: KfzKennzeichenDB::abfrage() wurde KFZ-Kürzel mit falschen Datentyp übergeben.\n");
       return "Fehler: Keinen zulässigen String als Kürzel eingegeben.";
   }

   // Sicherstellen, dass abzufragendes Kürzel nur aus Großbuchstaben besteht
   kfzKennzeichenKuerzel = kfzKennzeichenKuerzel.toUpperCase();

   // Ggf. noch führende/nachfolgende Leerzeichen entfernen
   kfzKennzeichenKuerzel = kfzKennzeichenKuerzel.trim();

   if (kfzKennzeichenKuerzel.length === 0) {

       console.log("Leere Anfrage erhalten.");
       return "Leere Anfrage";
   }


   // *** Eigentliche Suche nach Kürzel. ***
   // Achtung: Zugriff auf erst zur Laufzeit feststehende Property-Namen
   //          ist Case-Sensitive.
   const ergebnis = kfzKennzeichen[kfzKennzeichenKuerzel];
   if (ergebnis) {

        console.log(`Treffer: "${kfzKennzeichenKuerzel}" steht für "${ergebnis}".\n`);
        return ergebnis;

   } else {

        console.log(`Nichts gefunden für "${kfzKennzeichenKuerzel}".\n`);
        return "Kein Treffer";
   }
};
