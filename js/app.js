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

/*
  Buscamos todos los botones que tengan la clase .day.
*/
const dayButtons = document.querySelectorAll(".day");


/*
  Buscamos el contenedor principal.

  Aquí iremos sustituyendo el contenido cuando
  el usuario cambie de día.
*/
const content = document.querySelector(".content");


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
   EVENTOS DE LOS BOTONES
========================================================= */

dayButtons.forEach((button, index) => {

  /*
    Escuchamos el clic sobre cada botón.
  */
  button.addEventListener("click", () => {

    /*
      index vale:
      0 para Día 1
      1 para Día 2
      2 para Día 3
      etc.

      Por eso podemos utilizarlo directamente
      para buscar el día dentro de tripDays.
    */
    const selectedDay = tripDays[index];


    /* Cambiamos visualmente el botón activo */
    setActiveDay(button);


    /* Mostramos el nuevo día */
    renderDay(selectedDay);

  });

});
