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
   CAPAS DEL MAPA

   Guardaremos aquí los elementos que dibujamos.

   Esto nos permitirá borrarlos fácilmente cuando
   cambiemos entre:
   - TODO
   - DÍA 1
   - DÍA 2
   - CAMPINGS
   - SUPERMERCADOS
========================================================= */

const routeLayer = L.layerGroup().addTo(map);


/* =========================================================
   DIBUJAR UN DÍA EN EL MAPA
========================================================= */

function drawDayRoute(day) {
  routeLayer.clearLayers();
  const routeCoordinates = [];


  /* =======================================================
     RECORRER TODAS LAS ACTIVIDADES
  ======================================================= */

  day.activities.forEach(activity => {
    if (!activity.location) {
      return;
    }

    /*
      Extraemos las coordenadas de la actividad.
    */
     
    const coordinates = [
      activity.location.lat,
      activity.location.lng
    ];


    /*
      Guardamos las coordenadas para construir
      posteriormente la ruta.
    */
     
    routeCoordinates.push(coordinates);


    /* =====================================================
       CREAR MARCADOR
    ===================================================== */

    const marker = L.marker(coordinates);

    /*
      Popup que aparece cuando pulsamos
      sobre el marcador.
    */
    marker.bindPopup(`

      <strong>
        ${activity.icon} ${activity.title}
      </strong>

      <br>

      ${activity.location.name}

      <br><br>

      ${activity.description}

    `);


    /*
      Añadimos el marcador a nuestra capa.
    */
    marker.addTo(routeLayer);

  });


  /* =======================================================
     DIBUJAR LÍNEA ENTRE LAS PARADAS
  ======================================================= */
  if (routeCoordinates.length >= 2) {

    const routeLine = L.polyline(
      routeCoordinates,
      {
        weight: 4,
        opacity: 0.7
      }
    );


    routeLine.addTo(routeLayer);

  }


  /* =======================================================
     ENCUADRAR EL DÍA
  ======================================================= */

  /*
    Si tenemos puntos en el mapa, Leaflet calcula
    automáticamente el zoom necesario para que
    podamos ver toda la ruta del día.

    ESTO es el fitBounds del que hablábamos antes.

    Aquí sí tiene sentido porque estamos viendo
    específicamente UN día.
  */
  if (routeCoordinates.length > 0) {

    map.fitBounds(
      routeCoordinates,
      {
        padding: [60, 60]
      }
    );

  }

}


/* =========================================================
   MOSTRAR DÍA 1 AL INICIAR

   De momento dibujamos el Día 1.

   Después crearemos los botones:
   TODO · DÍA 1 · DÍA 2 · ...
========================================================= */
drawDayRoute(tripDays[0]);
