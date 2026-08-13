/* =========================================================
   PUNTOS ÚTILES DEL VIAJE
   Este archivo contiene lugares que no forman parte
   directamente del itinerario de cada día.

   De momento:
   - Campings
   - Supermercados

   Más adelante:
   - Gasolineras
   - Piscinas
   - Duchas
   - Talleres
========================================================= */


/* =========================================================
   CAMPINGS
========================================================= */

const campsites = [

  {
    name: "Hella Camping",

    location: {
      lat: 63.8350,
      lng: -20.4000
    },

    description:
      "Camping útil para dormir después del Círculo Dorado.",

    tags: [
      "🚐 Camper",
      "🚿 Duchas",
      "📍 Hella"
    ]
  }

];


/* =========================================================
   SUPERMERCADOS
========================================================= */

const supermarkets = [

  {
    name: "Bónus Selfoss",

    location: {
      lat: 63.9330,
      lng: -20.9970
    },

    description:
      "Supermercado práctico para hacer una compra grande durante la ruta.",

    tags: [
      "🛒 Compra grande",
      "💰 Económico",
      "📍 Selfoss"
    ]
  }

];


/* =========================================================
   PRUEBA

   Esto aparecerá en la consola y nos permitirá
   comprobar que places.js se ha cargado.
========================================================= */

console.log("✅ places.js cargado");

console.log("Campings:", campsites);
console.log("Supermercados:", supermarkets);
