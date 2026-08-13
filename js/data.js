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

const dayButtons = document.querySelectorAll(".day");

const content = document.querySelector(".content");

const mapButton = document.querySelector(".map-tab");

const mapSection = document.querySelector("#map-section");


/* =========================================================
   MOSTRAR UN DÍA
========================================================= */

function renderDay(day) {

  const statsHTML = (day.stats || [])
    .map(stat => `
      <div class="stat">
        <strong>${stat.value}</strong>
        <span>${stat.label}</span>
      </div>
    `)
    .join("");


  const timelineHTML = (day.activities || [])
    .map(item => {

      if (item.type === "drive") {
        return createDriveHTML(item);
      }

      return createActivityHTML(item);

    })
    .join("");


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
      <div class="activity-extra parking-info">

        <strong>
          🅿️ ${activity.parking.name || "Parking"}
        </strong>

        <p>
          ${activity.parking.info || ""}
        </p>

        ${
          activity.parking.mapsUrl &&
          activity.parking.mapsUrl !== "#"
            ? `
              <a
                href="${activity.parking.mapsUrl}"
                class="action-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                📍 Abrir parking en Maps
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

        <strong>
          🎟 Reserva
        </strong>

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
                rel="noopener noreferrer"
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
     MAPS DE LA ACTIVIDAD
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
          rel="noopener noreferrer"
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

      <div class="activity-time">
        ${activity.time || ""}
      </div>


      <div class="activity-dot"></div>


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
          mapsHTML
            ? `
              <div class="activity-actions">
                ${mapsHTML}
              </div>
            `
            : ""
        }


        ${parkingHTML}


        ${bookingHTML}


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
   CREAR HTML DE UN TRAYECTO
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
     MAPS DEL TRAYECTO
  ------------------------------------------------------- */

  const mapsHTML =
    drive.mapsUrl &&
    drive.mapsUrl !== "#"
      ? `
        <a
          href="${drive.mapsUrl}"
          class="drive-action"
          target="_blank"
          rel="noopener noreferrer"
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

        <div>

          <strong>
            🅿️ ${drive.parking.name || "Parking al llegar"}
          </strong>

          <span>
            ${drive.parking.info || ""}
          </span>

        </div>

        ${
          drive.parking.mapsUrl &&
          drive.parking.mapsUrl !== "#"
            ? `
              <a
                href="${drive.parking.mapsUrl}"
                class="drive-action"
                target="_blank"
                rel="noopener noreferrer"
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
     TRAYECTO COMPLETO
  ------------------------------------------------------- */

  return `

    <article class="drive">

      <div class="drive-line">

        <span class="drive-icon">
          🚐
        </span>

      </div>


      <div class="drive-card">

        <p class="drive-label">
          TRAYECTO EN CAMPER
        </p>


        <h4>
          ${drive.from}
          <span>→</span>
          ${drive.to}
        </h4>


        <div class="drive-stats">

          <span>
            🛣️ ${drive.km} km
          </span>

          <span>
            ⏱️ ${formatMinutes(drive.minutes)}
          </span>

        </div>


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


        ${parkingHTML}


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
   FORMATEAR MINUTOS
========================================================= */

function formatMinutes(minutes) {

  const hours =
    Math.floor(minutes / 60);


  const remainingMinutes =
    minutes % 60;


  if (hours === 0) {
    return `${remainingMinutes} min`;
  }


  if (remainingMinutes === 0) {
    return `${hours} h`;
  }


  return `${hours} h ${remainingMinutes} min`;
}


/* =========================================================
   CAMBIAR DÍA ACTIVO
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

    if (button.classList.contains("map-tab")) {
      return;
    }


    const selectedDay =
      tripDays[index];


    if (!selectedDay) {
      return;
    }


    setActiveDay(button);


    mapSection.classList.add("hidden");

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


  dayButtons.forEach(button => {
    button.classList.remove("active");
  });


  mapButton.classList.add("active");


  content.classList.add("hidden");

  mapSection.classList.remove("hidden");


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

  dayButtons.forEach(button => {
    button.classList.remove("active");
  });


  mapButton.classList.add("active");


  content.classList.add("hidden");

  mapSection.classList.remove("hidden");


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
   CLICS DINÁMICOS
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
     RUTA OFFLINE
  ------------------------------------------------------- */

  const offlineButton =
    event.target.closest(".offline-route-button");


  if (offlineButton) {

    const driveCard =
      offlineButton.closest(".drive-card");


    if (!driveCard) {
      return;
    }


    const offlineRoute =
      driveCard.querySelector(".offline-route");


    if (!offlineRoute) {
      return;
    }


    offlineRoute.classList.toggle("hidden");


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
