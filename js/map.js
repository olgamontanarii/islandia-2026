/* =========================================================
   MAPA GENERAL DEL VIAJE
========================================================= */


/* =========================================================
   CREAR EL MAPA
========================================================= */

const map = L.map("map").setView(
  [64.9, -18.6],
  6
);


/* =========================================================
   CAPA BASE
========================================================= */

L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 19,

    attribution:
      '&copy; OpenStreetMap contributors'
  }
).addTo(map);


/* =========================================================
   CAPA DONDE DIBUJAMOS MARCADORES Y RUTAS
========================================================= */

const routeLayer =
  L.layerGroup().addTo(map);


/* =========================================================
   BOTONES DE FILTRO
========================================================= */

const mapFilterButtons =
  document.querySelectorAll(".map-filter");


/* =========================================================
   DIBUJAR UN DÍA
========================================================= */

function drawDayRoute(day) {

  routeLayer.clearLayers();


  const routeCoordinates = [];


  day.activities.forEach(item => {

    /*
      Los trayectos no tienen una localización propia.

      Solo dibujamos elementos que tengan location.
    */
    if (!item.location) {
      return;
    }


    const coordinates = [
      item.location.lat,
      item.location.lng
    ];


    routeCoordinates.push(coordinates);


    const marker =
      L.marker(coordinates);


    marker.bindPopup(`

      <strong>
        ${item.icon || "📍"} ${item.title || item.location.name}
      </strong>

      <br>

      ${item.location.name}

      ${
        item.description
          ? `
            <br><br>
            ${item.description}
          `
          : ""
      }

    `);


    marker.addTo(routeLayer);

  });


  /* Línea entre las actividades */
  if (routeCoordinates.length >= 2) {

    L.polyline(
      routeCoordinates,
      {
        weight: 4,
        opacity: 0.7
      }
    ).addTo(routeLayer);

  }


  /* Encuadrar ese día */
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
   DIBUJAR TODO EL VIAJE
========================================================= */

function drawAllRoutes() {

  routeLayer.clearLayers();


  const allCoordinates = [];


  tripDays.forEach(day => {

    const dayCoordinates = [];


    day.activities.forEach(item => {

      if (!item.location) {
        return;
      }


      const coordinates = [
        item.location.lat,
        item.location.lng
      ];


      dayCoordinates.push(coordinates);

      allCoordinates.push(coordinates);


      const marker =
        L.marker(coordinates);


      marker.bindPopup(`

        <strong>
          ${item.icon || "📍"} ${item.title || item.location.name}
        </strong>

        <br>

        Día ${day.id}

        <br>

        ${item.location.name}

      `);


      marker.addTo(routeLayer);

    });


    /*
      Dibujamos una línea independiente
      por cada día.
    */
    if (dayCoordinates.length >= 2) {

      L.polyline(
        dayCoordinates,
        {
          weight: 4,
          opacity: 0.65
        }
      ).addTo(routeLayer);

    }

  });


  if (allCoordinates.length > 0) {

    map.fitBounds(
      allCoordinates,
      {
        padding: [50, 50]
      }
    );

  }

}


/* =========================================================
   DIBUJAR CAMPINGS
========================================================= */

function drawCampings() {

  routeLayer.clearLayers();


  const coordinates = [];


  campsites.forEach(camping => {

    const point = [
      camping.location.lat,
      camping.location.lng
    ];


    coordinates.push(point);


    const marker =
      L.marker(point);


    marker.bindPopup(`

      <strong>
        ⛺ ${camping.name}
      </strong>

      <br><br>

      ${camping.description}

      <br><br>

      ${(camping.tags || []).join("<br>")}

    `);


    marker.addTo(routeLayer);

  });


  if (coordinates.length > 0) {

    map.fitBounds(
      coordinates,
      {
        padding: [60, 60],
        maxZoom: 11
      }
    );

  }

}


/* =========================================================
   DIBUJAR SUPERMERCADOS
========================================================= */

function drawSupermarkets() {

  routeLayer.clearLayers();


  const coordinates = [];


  supermarkets.forEach(supermarket => {

    const point = [
      supermarket.location.lat,
      supermarket.location.lng
    ];


    coordinates.push(point);


    const marker =
      L.marker(point);


    marker.bindPopup(`

      <strong>
        🛒 ${supermarket.name}
      </strong>

      <br><br>

      ${supermarket.description}

      <br><br>

      ${(supermarket.tags || []).join("<br>")}

    `);


    marker.addTo(routeLayer);

  });


  if (coordinates.length > 0) {

    map.fitBounds(
      coordinates,
      {
        padding: [60, 60],
        maxZoom: 11
      }
    );

  }

}


/* =========================================================
   EVENTOS DE LOS FILTROS
========================================================= */

mapFilterButtons.forEach(button => {

  button.addEventListener("click", () => {

    /* Quitamos active de todos */
    mapFilterButtons.forEach(filterButton => {
      filterButton.classList.remove("active");
    });


    /* Activamos el seleccionado */
    button.classList.add("active");


    const filter =
      button.dataset.mapFilter;


    /* -----------------------------------------------------
       TODO
    ----------------------------------------------------- */

    if (filter === "all") {

      drawAllRoutes();

      return;
    }


    /* -----------------------------------------------------
       CAMPINGS
    ----------------------------------------------------- */

    if (filter === "campings") {

      drawCampings();

      return;
    }


    /* -----------------------------------------------------
       SUPERMERCADOS
    ----------------------------------------------------- */

    if (filter === "supermarkets") {

      drawSupermarkets();

      return;
    }


    /* -----------------------------------------------------
       DÍAS 1–6
    ----------------------------------------------------- */

    const dayId =
      Number(filter);


    const selectedDay =
      tripDays.find(
        day => day.id === dayId
      );


    if (selectedDay) {
      drawDayRoute(selectedDay);
    }

  });

});


/* =========================================================
   MAPA INICIAL
========================================================= */

drawAllRoutes();
