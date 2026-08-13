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
     ESTADÍSTICAS DEL DÍA
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
     ACTIVIDADES + TRAYECTOS

     Aquí distinguimos entre:
     - type: "activity"
     - type: "drive"
  ------------------------------------------------------- */

  const timelineHTML = (day.activities || [])
    .map(item => {

      /*
        Si es un trayecto en camper,
        utilizamos el diseño de trayecto.
      */
      if (item.type === "drive") {
        return createDriveHTML(item);
      }


      /*
        Si no es drive, lo tratamos como actividad.
      */
      return createActivityHTML(item);

    })
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
         TIMELINE DEL DÍA
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
          timelineHTML ||
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
     INFORMACIÓN IMPORTANTE
  ------------------------------------------------------- */

  const importantHTML = (activity.important || [])
    .map(item => `
      <li>${item}</li>
    `)
    .join("");


  /* -------------------------------------------------------
     PARKING
  ------------------------------------------------------- */

  const parkingHTML = activity.parking
    ? `
      <div class="activity-extra">

        <strong>🅿️ Parking</strong>

        <p>
          ${activity.parking.info}
        </p>

        ${
          activity.parking.mapsUrl &&
          activity.parking.mapsUrl !== "#"
            ? `
              <a
                href="${activity.parking.mapsUrl}"
                class="action-link"
                target="_blank"
              >
                📍 Abrir parking
              </a>
            `
            : ""
        }

      </div>
    `
    : "";


  /* -------------------------------------------------------
     RESERVA
  ------------------------------------------------------- */

  const bookingHTML = activity.booking
    ? `
      <div class="activity-extra">

        <strong>🎟 Reserva</strong>

        <p>
          ${activity.booking.advice || ""}
        </p>

        ${
          activity.booking.url &&
          activity.booking.url !== "#"
            ? `
              <a
                href="${activity.booking.url}"
                class="action-link primary"
                target="_blank"
              >
                🎟 Reservar
              </a>
            `
            : ""
        }

      </div>
    `
    : "";


  /* -------------------------------------------------------
     BOTÓN MAPS
  ------------------------------------------------------- */

  const mapsHTML =
    activity.location &&
    activity.location.mapsUrl &&
    activity.location.mapsUrl !== "#"
      ? `
        <a
          href="${activity.location.mapsUrl}"
          class="action-link"
          target="_blank"
        >
          📍 Maps
        </a>
      `
      : "";


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


        <!-- BOTONES PRINCIPALES -->
        ${
          mapsHTML
            ? `
              <div class="activity-actions">
                ${mapsHTML}
              </div>
            `
            : ""
        }


        <!-- PARKING -->
        ${parkingHTML}


        <!-- RESERVA -->
        ${bookingHTML}


        <!-- INFORMACIÓN IMPORTANTE -->
        ${
          importantHTML
            ? `
              <div class="activity-extra">

                <strong>
                  ℹ️ Importante
                </strong>

                <ul>
                  ${importantHTML}
                </ul>

              </div>
            `
            : ""
        }

      </div>

    </article>

  `;
}


/* =========================================================
   CREAR HTML DE UN TRAYECTO EN CAMPER
========================================================= */

function createDriveHTML(drive) {

  /* -------------------------------------------------------
     CARRETERAS
  ------------------------------------------------------- */

  const roadsHTML = (drive.roads || [])
    .map(road => `
      <span class="road-number">
        ${road}
      </span>
    `)
    .join("");


  /* -------------------------------------------------------
     INSTRUCCIONES OFFLINE
  ------------------------------------------------------- */

  const directionsHTML = (drive.offlineDirections || [])
    .map((direction, index) => `
      <li>
        <strong>${index + 1}.</strong>
        ${direction}
      </li>
    `)
    .join("");


  /* -------------------------------------------------------
     MAPS
  ------------------------------------------------------- */

  const mapsHTML =
    drive.mapsUrl &&
    drive.mapsUrl !== "#"
      ? `
        <a
          href="${drive.mapsUrl}"
          class="drive-action"
          target="_blank"
        >
          📍 Abrir ruta en Maps
        </a>
      `
      : "";


  /* -------------------------------------------------------
     PARKING AL LLEGAR
  ------------------------------------------------------- */

  const parkingHTML = drive.parking
    ? `
      <div class="drive-parking">

        <strong>
          🅿️ Al llegar
        </strong>

        <span>
          ${drive.parking.info}
        </span>

      </div>
    `
    : "";


  /* -------------------------------------------------------
     TRAYECTO COMPLETO
  ------------------------------------------------------- */

  return `

    <article class="drive">

      <!-- Línea visual izquierda -->
      <div class="drive-line">

        <span class="drive-icon">
          🚐
        </span>

      </div>


      <!-- Contenido -->
      <div class="drive-card">

        <p class="drive-label">
          TRAYECTO EN CAMPER
        </p>


        <h4>
          ${drive.from}
          <span>→</span>
          ${drive.to}
        </h4>


        <!-- DATOS PRINCIPALES -->
        <div class="drive-stats">

          <span>
            🛣️ ${drive.km} km
          </span>

          <span>
            ⏱️ ${formatMinutes(drive.minutes)}
          </span>

        </div>


        <!-- CARRETERAS -->
        ${
          roadsHTML
            ? `
              <div class="drive-roads">

                <strong>
                  Carreteras
                </strong>

                <div>
                  ${roadsHTML}
                </div>

              </div>
            `
            : ""
        }


        <!-- PARKING -->
        ${parkingHTML}


        <!-- BOTONES -->
        <div class="drive-actions">

          ${mapsHTML}


          ${
            directionsHTML
              ? `
                <button
                  class="drive-action offline-route-button"
                  type="button"
                >
                  🧭 Ruta sin conexión
                </button>
              `
              : ""
          }

        </div>


        <!-- INSTRUCCIONES OFFLINE
             Ocultas por defecto -->
        ${
          directionsHTML
            ? `
              <div class="offline-route hidden">

                <div class="offline-route-header">

                  <strong>
                    🧭 Cómo llegar sin conexión
                  </strong>

                  <span>
                    ${drive.from} → ${drive.to}
                  </span>

                </div>


                <ol>
                  ${directionsHTML}
                </ol>

              </div>
            `
            : ""
        }

      </div>

    </article>

  `;
}


/* =========================================================
   CONVERTIR MINUTOS EN "1 h 30 min"
========================================================= */

function formatMinutes(minutes) {

  const hours =
    Math.floor(minutes / 60);


  const remainingMinutes =
    minutes % 60;


  /*
    Menos de una hora:
    30 → "30 min"
  */
  if (hours === 0) {
    return `${remainingMinutes} min`;
  }


  /*
    Hora exacta:
    60 → "1 h"
  */
  if (remainingMinutes === 0) {
    return `${hours} h`;
  }


  /*
    Hora + minutos:
    90 → "1 h 30 min"
  */
  return `${hours} h ${remainingMinutes} min`;
}


/* =========================================================
   CAMBIAR EL DÍA ACTIVO
========================================================= */

function setActiveDay(selectedButton) {

  dayButtons.forEach(button => {
    button.classList.remove("active");
  });


  selectedButton.classList.add("active");
}


/* =========================================================
   BOTONES DE LOS DÍAS
========================================================= */

dayButtons.forEach((button, index) => {

  button.addEventListener("click", () => {

    /*
      MAPA tiene también clase .day.
      Lo ignoramos aquí.
    */
    if (button.classList.contains("map-tab")) {
      return;
    }


    const selectedDay =
      tripDays[index];


    if (!selectedDay) {
      return;
    }


    setActiveDay(button);


    /* Ocultamos mapa */
    mapSection.classList.add("hidden");


    /* Mostramos itinerario */
    content.classList.remove("hidden");


    renderDay(selectedDay);

  });

});


/* =========================================================
   ABRIR MAPA DESDE UN DÍA
========================================================= */

function openDayMap(dayId) {

  const selectedDay =
    tripDays.find(day => day.id === dayId);


  if (!selectedDay) {
    return;
  }


  /* Navegación superior */
  dayButtons.forEach(button => {
    button.classList.remove("active");
  });


  mapButton.classList.add("active");


  /* Mostrar mapa */
  content.classList.add("hidden");

  mapSection.classList.remove("hidden");


  /* Filtros del mapa */
  const mapFilterButtons =
    document.querySelectorAll(".map-filter");


  mapFilterButtons.forEach(button => {
    button.classList.remove("active");
  });


  const selectedFilter =
    document.querySelector(
      `.map-filter[data-map-filter="${dayId}"]`
    );


  if (selectedFilter) {
    selectedFilter.classList.add("active");
  }


  setTimeout(() => {

    map.invalidateSize();

    drawDayRoute(selectedDay);

  }, 150);

}


/* =========================================================
   BOTÓN SUPERIOR MAPA
========================================================= */

mapButton.addEventListener("click", () => {

  /* Navegación */
  dayButtons.forEach(button => {
    button.classList.remove("active");
  });


  mapButton.classList.add("active");


  /* Mostrar mapa */
  content.classList.add("hidden");

  mapSection.classList.remove("hidden");


  /* Activar filtro TODO */
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


  setTimeout(() => {

    map.invalidateSize();

    drawAllRoutes();

  }, 150);

});


/* =========================================================
   CLICS DINÁMICOS DENTRO DEL ITINERARIO

   Aquí controlamos:
   - Ver ruta del día
   - Ruta sin conexión
========================================================= */

content.addEventListener("click", event => {

  /* -------------------------------------------------------
     VER RUTA DEL DÍA
  ------------------------------------------------------- */

  const routeButton =
    event.target.closest(".day-route-button");


  if (routeButton) {

    const dayId =
      Number(routeButton.dataset.day);


    openDayMap(dayId);

    return;
  }


  /* -------------------------------------------------------
     ABRIR / CERRAR RUTA OFFLINE
  ------------------------------------------------------- */

  const offlineButton =
    event.target.closest(".offline-route-button");


  if (offlineButton) {

    /*
      Buscamos la tarjeta de trayecto donde
      está el botón que acabamos de pulsar.
    */
    const driveCard =
      offlineButton.closest(".drive-card");


    if (!driveCard) {
      return;
    }


    /*
      Dentro de esa misma tarjeta buscamos
      las instrucciones offline.
    */
    const offlineRoute =
      driveCard.querySelector(".offline-route");


    if (!offlineRoute) {
      return;
    }


    /*
      Mostrar / ocultar.
    */
    offlineRoute.classList.toggle("hidden");


    /*
      Cambiamos el texto del botón.
    */
    if (offlineRoute.classList.contains("hidden")) {

      offlineButton.textContent =
        "🧭 Ruta sin conexión";

    } else {

      offlineButton.textContent =
        "✕ Cerrar instrucciones";

    }

  }

});


/* =========================================================
   CARGA INICIAL
========================================================= */

renderDay(tripDays[0]);
