console.log("✅ app.js cargado correctamente");
console.log("Días disponibles:", tripDays);
/* =========================================================
   APLICACIÓN DEL ITINERARIO

   Este archivo contiene la LÓGICA de la web.

   data.js = qué información tenemos
   app.js  = qué hacemos con esa información
========================================================= */


/* =========================================================
   ELEMENTOS DEL HTML QUE VAMOS A MODIFICAR
========================================================= */

/* Todos los botones de navegación */
const dayButtons = document.querySelectorAll(".day");


/* Contenido del itinerario */
const content = document.querySelector(".content");


/* Botón especial del mapa */
const mapButton = document.querySelector(".map-tab");


/* Sección donde estará el mapa */
const mapSection = document.querySelector("#map-section");


/* =========================================================
   FUNCIÓN PRINCIPAL: MOSTRAR UN DÍA
========================================================= */

function renderDay(day) {

  /*
    Construimos las estadísticas.

    .map() recorre cada estadística del array y la
    convierte en HTML.
  */
  const statsHTML = day.stats
    .map(stat => `
      <div class="stat">
        <strong>${stat.value}</strong>
        <span>${stat.label}</span>
      </div>
    `)
    .join("");


  /*
    Ahora hacemos exactamente lo mismo con
    las actividades.
  */
  const activitiesHTML = day.activities
    .map(activity => createActivityHTML(activity))
    .join("");


  /*
    Sustituimos TODO lo que hay dentro de <main>
    por el contenido correspondiente al día seleccionado.
  */
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

        <div class="stats">
          ${statsHTML}
        </div>
         <!-- =====================================
              ACCIONES DEL DÍA
             ====================================== -->
      <div class="day-actions">
        <button class="day-route-button" data-day="${day.id}" > 🗺️ Ver ruta del día </button>
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
        ${activitiesHTML}
      </div>

    </section>

  `;
}


/* =========================================================
   CREAR UNA ACTIVIDAD
========================================================= */

function createActivityHTML(activity) {

  /*
    Creamos las etiquetas:
    duración, dificultad, reserva, etc.
  */
  const tagsHTML = (activity.tags || [])
    .map(tag => `
      <span>${tag}</span>
    `)
    .join("");


  /*
    Creamos los botones de la actividad.

    Si una actividad no tiene botones,
    utilizamos un array vacío [].
  */
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


  /*
    Devolvemos el HTML completo de una actividad.
  */
  return `

    <article class="activity">

      <div class="activity-time">
        ${activity.time}
      </div>

      <div class="activity-dot"></div>


      <div class="
        activity-card
        ${activity.featured ? "featured" : ""}
      ">

        <div class="activity-top">

          <span class="activity-icon">
            ${activity.icon}
          </span>

          <div>

            <p class="activity-label">
              ${activity.category}
            </p>

            <h4>
              ${activity.title}
            </h4>

          </div>

        </div>


        <p class="activity-description">
          ${activity.description}
        </p>


        <div class="activity-tags">
          ${tagsHTML}
        </div>


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
   CAMBIAR EL BOTÓN ACTIVO
========================================================= */

function setActiveDay(selectedButton) {

  /*
    Primero quitamos "active" de TODOS los botones.
  */
  dayButtons.forEach(button => {
    button.classList.remove("active");
  });


  /*
    Después añadimos "active" solamente
    al botón que acabamos de pulsar.
  */
  selectedButton.classList.add("active");
}


/* =========================================================
   BOTONES DE LOS DÍAS
========================================================= */

dayButtons.forEach((button, index) => {

  button.addEventListener("click", () => {

    /*
      IMPORTANTE:

      Dentro de .day ahora también está el botón MAPA.

      El mapa NO corresponde a un elemento de tripDays,
      por eso comprobamos que este botón no sea .map-tab.
    */
    if (button.classList.contains("map-tab")) {
      return;
    }


    /* Día correspondiente */
    const selectedDay = tripDays[index];


    /* Marcamos el día seleccionado */
    setActiveDay(button);


    /* Ocultamos el mapa por si estaba abierto */
    mapSection.classList.add("hidden");


    /* Volvemos a mostrar el itinerario */
    content.classList.remove("hidden");


    /* Dibujamos el día seleccionado */
    renderDay(selectedDay);

  });

});

/* =========================================================
   ABRIR EL MAPA DESDE UN DÍA

   Esta función se ejecutará cuando pulsemos:

   "🗺 Ver ruta del día"
========================================================= */

function openDayMap(dayId) {

  /* Buscamos el día correspondiente */
  const selectedDay =
    tripDays.find(day => day.id === dayId);


  /* Si por algún motivo no existe, paramos */
  if (!selectedDay) {
    return;
  }


  /* =======================================================
     CAMBIAR A LA PESTAÑA MAPA
  ======================================================= */

  /* Quitamos "active" de la navegación superior */
  dayButtons.forEach(button => {
    button.classList.remove("active");
  });


  /* Activamos MAPA */
  mapButton.classList.add("active");


  /* Ocultamos el itinerario */
  content.classList.add("hidden");


  /* Mostramos la sección del mapa */
  mapSection.classList.remove("hidden");


  /* =======================================================
     CAMBIAR EL FILTRO DEL MAPA
  ======================================================= */

  const mapFilterButtons =
    document.querySelectorAll(".map-filter");


  /* Quitamos active de todos los filtros */
  mapFilterButtons.forEach(button => {
    button.classList.remove("active");
  });


  /*
    Buscamos específicamente el botón:

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


  /* =======================================================
     DIBUJAR LA RUTA
  ======================================================= */

  /*
    Esperamos a que el mapa sea visible antes
    de pedirle a Leaflet que calcule su tamaño.
  */
  setTimeout(() => {

    map.invalidateSize();

    drawDayRoute(selectedDay);

  }, 150);

}

/* =========================================================
   PESTAÑA MAPA GENERAL

   Cuando pulsamos "MAPA":
   - ocultamos el itinerario
   - mostramos la sección del mapa

   Cuando volvemos a pulsar un día:
   - mostramos el itinerario
   - ocultamos el mapa
========================================================= */
/* =========================================================
   MOSTRAR MAPA
========================================================= */

mapButton.addEventListener("click", () => {

  /* Quitamos "active" de todos los botones */
  dayButtons.forEach(button => {
    button.classList.remove("active");
  });


  /* Marcamos MAPA como seleccionado */
  mapButton.classList.add("active");


  /* Ocultamos el itinerario */
  content.classList.add("hidden");


  /* Mostramos la sección del mapa */
  mapSection.classList.remove("hidden");

  /*
    Esperamos un instante para que el navegador
    termine de mostrar físicamente el contenedor.

    Después:

    1. Leaflet vuelve a calcular el tamaño.
    2. Volvemos a dibujar la ruta del Día 1.
       Así fitBounds() se ejecuta cuando el mapa
       YA tiene unas dimensiones reales.
  */
  setTimeout(() => {

    map.invalidateSize();

    drawDayRoute(tripDays[0]);

  }, 150);

});

/* =========================================================
   BOTÓN "VER RUTA DEL DÍA"

   Utilizamos delegación de eventos porque este botón
   se genera dinámicamente dentro de renderDay().
========================================================= */

content.addEventListener("click", event => {

  /*
    Comprobamos si lo que hemos pulsado
    es el botón de ruta.
  */
  const routeButton =
    event.target.closest(".day-route-button");


  /*
    Si hemos pulsado cualquier otra cosa,
    no hacemos nada.
  */
  if (!routeButton) {
    return;
  }


  /*
    data-day viene del HTML como texto.

    Lo convertimos a número:

    "1" → 1
  */
  const dayId =
    Number(routeButton.dataset.day);


  /* Abrimos directamente ese día en el mapa */
  openDayMap(dayId);

});

/* =========================================================
   CARGA INICIAL

   En vez de depender del Día 1 escrito manualmente
   en index.html, hacemos que JavaScript lo genere.

   Así la web utiliza siempre data.js como fuente
   de información.
========================================================= */

renderDay(tripDays[0]);
