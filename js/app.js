console.log("✅ app.js cargado correctamente");
console.log("Días disponibles:", tripDays);


/* =========================================================
   APLICACIÓN DEL ITINERARIO

   data.js = datos del viaje
   app.js  = lógica de la web
========================================================= */


/* =========================================================
   ELEMENTOS DEL HTML
========================================================= */

/* Todos los botones de navegación superior */
const dayButtons = document.querySelectorAll(".day");


/* Contenido principal del itinerario */
const content = document.querySelector(".content");


/* Botón superior de MAPA */
const mapButton = document.querySelector(".map-tab");


/* Sección completa del mapa */
const mapSection = document.querySelector("#map-section");


/* =========================================================
   MOSTRAR UN DÍA
========================================================= */

function renderDay(day) {

  /* -------------------------------------------------------
     ESTADÍSTICAS
  ------------------------------------------------------- */

  const statsHTML = (day.stats || [])
    .map(stat => `
      <div class="stat">
        <strong>${stat.value}</strong>
        <span>${stat.label}</span>
      </div>
    `)
    .join("");


  /* -------------------------------------------------------
     ACTIVIDADES
  ------------------------------------------------------- */

  const activitiesHTML = (day.activities || [])
    .map(activity => createActivityHTML(activity))
    .join("");


  /* -------------------------------------------------------
     GENERAMOS TODO EL CONTENIDO DEL DÍA
  ------------------------------------------------------- */

  content.innerHTML = `

    <!-- =====================================
         HERO DEL DÍA
    ====================================== -->

    <section class="hero">

      <span class="giant-number">
        ${String(day.id).padStart(2, "0")}
      </span>

      <div class="hero-content">

        <p class="eyebrow">
          DÍA ${String(day.id).padStart(2, "0")} · ${day.date}
        </p>

        <h2>
          ${day.title}
        </h2>

        <p class="intro">
          ${day.intro}
        </p>


        <!-- ESTADÍSTICAS -->
        <div class="stats">
          ${statsHTML}
        </div>


        <!-- ACCIONES DEL DÍA -->
        <div class="day-actions">

          <button
            class="day-route-button"
            data-day="${day.id}"
          >
            🗺️ Ver ruta del día
          </button>

        </div>

      </div>

    </section>


    <!-- =====================================
         TIMELINE
    ====================================== -->

    <section class="timeline-section">

      <div class="section-heading">

        <p class="eyebrow">
          RUTA DEL DÍA
        </p>

        <h3>
          Qué hacemos hoy
        </h3>

      </div>


      <div class="timeline">

        ${
          activitiesHTML ||
          `
            <div class="empty-day">
              Todavía no hemos añadido actividades para este día.
            </div>
          `
        }

      </div>

    </section>

  `;
}


/* =========================================================
   CREAR HTML DE UNA ACTIVIDAD
========================================================= */

function createActivityHTML(activity) {

  /* -------------------------------------------------------
     ETIQUETAS
  ------------------------------------------------------- */

  const tagsHTML = (activity.tags || [])
    .map(tag => `
      <span>${tag}</span>
    `)
    .join("");


  /* -------------------------------------------------------
     BOTONES
  ------------------------------------------------------- */

  const actionsHTML = (activity.actions || [])
    .map(action => `

      <a
        href="${action.url}"
        class="action-link ${action.primary ? "primary" : ""}"
      >
        ${action.text}
      </a>

    `)
    .join("");


  /* -------------------------------------------------------
     ACTIVIDAD COMPLETA
  ------------------------------------------------------- */

  return `

    <article class="activity">

      <!-- Hora -->
      <div class="activity-time">
        ${activity.time || ""}
      </div>


      <!-- Punto de la timeline -->
      <div class="activity-dot"></div>


      <!-- Tarjeta -->
      <div
        class="
          activity-card
          ${activity.featured ? "featured" : ""}
        "
      >

        <div class="activity-top">

          <span class="activity-icon">
            ${activity.icon || "📍"}
          </span>


          <div>

            <p class="activity-label">
              ${activity.category || ""}
            </p>

            <h4>
              ${activity.title || ""}
            </h4>

          </div>

        </div>


        <p class="activity-description">
          ${activity.description || ""}
        </p>


        ${
          tagsHTML
            ? `
              <div class="activity-tags">
                ${tagsHTML}
              </div>
            `
            : ""
        }


        ${
          actionsHTML
            ? `
              <div class="activity-actions">
                ${actionsHTML}
              </div>
            `
            : ""
        }

      </div>

    </article>

  `;
}


/* =========================================================
   CAMBIAR EL DÍA ACTIVO EN LA NAVEGACIÓN
========================================================= */

function setActiveDay(selectedButton) {

  /* Quitamos active de todos */
  dayButtons.forEach(button => {
    button.classList.remove("active");
  });


  /* Activamos el botón seleccionado */
  selectedButton.classList.add("active");
}


/* =========================================================
   BOTONES DE LOS DÍAS
========================================================= */

dayButtons.forEach((button, index) => {

  button.addEventListener("click", () => {

    /*
      El botón MAPA también tiene clase .day.

      Si es MAPA, este bloque no hace nada,
      porque tiene su propio evento más abajo.
    */
    if (button.classList.contains("map-tab")) {
      return;
    }


    /* Día correspondiente */
    const selectedDay = tripDays[index];


    if (!selectedDay) {
      return;
    }


    /* Activamos visualmente el día */
    setActiveDay(button);


    /* Ocultamos mapa */
    mapSection.classList.add("hidden");


    /* Mostramos itinerario */
    content.classList.remove("hidden");


    /* Dibujamos el día */
    renderDay(selectedDay);

  });

});


/* =========================================================
   ABRIR EL MAPA DIRECTAMENTE DESDE UN DÍA

   Ejemplo:
   Día 1 → "Ver ruta del día"
   abre MAPA con DÍA 1 seleccionado
========================================================= */

function openDayMap(dayId) {

  /* Buscamos el día */
  const selectedDay =
    tripDays.find(day => day.id === dayId);


  if (!selectedDay) {
    return;
  }


  /* -------------------------------------------------------
     NAVEGACIÓN SUPERIOR
  ------------------------------------------------------- */

  dayButtons.forEach(button => {
    button.classList.remove("active");
  });


  mapButton.classList.add("active");


  /* -------------------------------------------------------
     MOSTRAR MAPA
  ------------------------------------------------------- */

  content.classList.add("hidden");

  mapSection.classList.remove("hidden");


  /* -------------------------------------------------------
     FILTROS INTERNOS DEL MAPA
  ------------------------------------------------------- */

  const mapFilterButtons =
    document.querySelectorAll(".map-filter");


  mapFilterButtons.forEach(button => {
    button.classList.remove("active");
  });


  /*
    Buscamos:
    data-map-filter="1"
    data-map-filter="2"
    etc.
  */
  const selectedFilter =
    document.querySelector(
      `.map-filter[data-map-filter="${dayId}"]`
    );


  if (selectedFilter) {
    selectedFilter.classList.add("active");
  }


  /* -------------------------------------------------------
     DIBUJAR RUTA
  ------------------------------------------------------- */

  setTimeout(() => {

    /*
      Leaflet recalcula el tamaño porque
      el mapa acaba de pasar de oculto a visible.
    */
    map.invalidateSize();


    /*
      Mostramos solamente la ruta del día.
    */
    drawDayRoute(selectedDay);

  }, 150);

}


/* =========================================================
   BOTÓN SUPERIOR "MAPA"

   Al pulsarlo:
   - abre el mapa
   - marca TODO
   - muestra todas las rutas
========================================================= */

mapButton.addEventListener("click", () => {

  /* -------------------------------------------------------
     NAVEGACIÓN SUPERIOR
  ------------------------------------------------------- */

  dayButtons.forEach(button => {
    button.classList.remove("active");
  });


  mapButton.classList.add("active");


  /* -------------------------------------------------------
     MOSTRAR MAPA
  ------------------------------------------------------- */

  content.classList.add("hidden");

  mapSection.classList.remove("hidden");


  /* -------------------------------------------------------
     ACTIVAR FILTRO TODO
  ------------------------------------------------------- */

  const mapFilters =
    document.querySelectorAll(".map-filter");


  mapFilters.forEach(button => {
    button.classList.remove("active");
  });


  const allFilter =
    document.querySelector(
      '.map-filter[data-map-filter="all"]'
    );


  if (allFilter) {
    allFilter.classList.add("active");
  }


  /* -------------------------------------------------------
     REDIBUJAR MAPA
  ------------------------------------------------------- */

  setTimeout(() => {

    /*
      Corrige el tamaño de Leaflet después
      de mostrar el contenedor.
    */
    map.invalidateSize();


    /*
      MAPA general = todas las rutas.
    */
    drawAllRoutes();

  }, 150);

});


/* =========================================================
   BOTÓN "VER RUTA DEL DÍA"

   El botón se crea dinámicamente dentro de renderDay(),
   por eso usamos delegación de eventos.
========================================================= */

content.addEventListener("click", event => {

  /*
    Buscamos si el clic ocurrió dentro
    de un botón .day-route-button.
  */
  const routeButton =
    event.target.closest(".day-route-button");


  if (!routeButton) {
    return;
  }


  /*
    data-day llega como texto.

    "1" → 1
  */
  const dayId =
    Number(routeButton.dataset.day);


  openDayMap(dayId);

});


/* =========================================================
   CARGA INICIAL
========================================================= */

/*
  Siempre generamos el Día 1 desde data.js.

  Así index.html no necesita contener
  manualmente todo el itinerario.
*/
renderDay(tripDays[0]);
