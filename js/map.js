/* =========================================================
   MAPA GENERAL DEL VIAJE

   Este archivo se encarga únicamente del mapa.

   Leaflet = librería que dibuja el mapa
   map.js  = nuestra configuración del mapa
========================================================= */


/* =========================================================
   CREAR EL MAPA
========================================================= */

/*
  Le decimos a Leaflet:

  "Busca el elemento HTML que tenga id='map'
   y dibuja ahí el mapa."

  setView() recibe:

  [latitud, longitud]
  nivel de zoom

  Estas coordenadas centran el mapa aproximadamente
  sobre Islandia.
*/
const map = L.map("map").setView(
  [64.9, -18.6],
  6
);


/* =========================================================
   CAPA BASE DEL MAPA
========================================================= */

/*
  Leaflet por sí solo sabe colocar marcadores,
  líneas, controles, etc.

  Pero necesita una capa de mapa visual.

  Usamos OpenStreetMap como mapa base.
*/
L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 19,

    attribution:
      '&copy; OpenStreetMap contributors'
  }
).addTo(map);


/* =========================================================
   MARCADORES DE PRUEBA
========================================================= */

/*
  De momento añadimos algunos puntos para comprobar
  que todo funciona.

  Más adelante estos puntos NO estarán escritos aquí.
  Los sacaremos automáticamente de data.js.
*/


/* Keflavík */
L.marker([63.985, -22.6056])
  .addTo(map)
  .bindPopup(`
    <strong>🚐 Keflavík</strong><br>
    Recogida de la camper
  `);


/* Þingvellir */
L.marker([64.2559, -21.1300])
  .addTo(map)
  .bindPopup(`
    <strong>🌋 Þingvellir</strong><br>
    Parque Nacional
  `);


/* Geysir */
L.marker([64.3104, -20.3024])
  .addTo(map)
  .bindPopup(`
    <strong>💦 Geysir</strong><br>
    Zona geotérmica
  `);


/* Gullfoss */
L.marker([64.3271, -20.1199])
  .addTo(map)
  .bindPopup(`
    <strong>🌊 Gullfoss</strong><br>
    Cascada
  `);


/* Secret Lagoon */
L.marker([64.1377, -20.3097])
  .addTo(map)
  .bindPopup(`
    <strong>♨️ Secret Lagoon</strong><br>
    Aguas termales
  `);


/* =========================================================
   RUTA DE PRUEBA
========================================================= */

/*
  Dibujamos una línea entre las paradas.

  IMPORTANTE:
  Esto NO representa todavía la carretera real.

  Es simplemente una línea entre coordenadas para
  comprobar que el sistema funciona.

  Más adelante tendremos una ruta real de conducción.
*/
const dayOneRoute = [

  [63.985, -22.6056],   // Keflavík

  [64.2559, -21.1300], // Þingvellir

  [64.3104, -20.3024], // Geysir

  [64.3271, -20.1199], // Gullfoss

  [64.1377, -20.3097]  // Secret Lagoon

];


L.polyline(
  dayOneRoute,
  {
    weight: 4,
    opacity: 0.7
  }
).addTo(map);
