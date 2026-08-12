/* =========================================================
   DATOS DEL VIAJE

   Este archivo contiene la INFORMACIÓN del viaje.

   No decide cómo se ve la página.
   No crea botones.
   No cambia el HTML.

   Simplemente almacena los datos que después utilizará
   app.js para construir cada día.
========================================================= */


const tripDays = [

  /* =======================================================
     DÍA 1 · MIÉRCOLES 9
  ======================================================= */

  {
    id: 1,

    /* Información que aparece en la navegación */
    navDate: "MIÉ 9",

    /* Información principal del día */
    date: "MIÉRCOLES 9 DE SEPTIEMBRE",
    title: "Círculo Dorado",

    intro:
      "Nuestro primer día en Islandia. Camper, paisajes volcánicos y aguas termales.",


    /* -----------------------------------------------------
       ESTADÍSTICAS DEL DÍA
    ----------------------------------------------------- */

    stats: [
      {
        value: "190",
        label: "KM"
      },

      {
        value: "3H 20",
        label: "CONDUCIENDO"
      },

      {
        value: "7–8H",
        label: "DE RUTA"
      },

      {
        value: "RELAX",
        label: "RITMO DEL DÍA"
      }
    ],


    /* -----------------------------------------------------
       ACTIVIDADES DEL DÍA
    ----------------------------------------------------- */

    activities: [

      /* Recogida camper */
      {
        time: "12:00",
        icon: "🚐",

        category: "INICIO",
        title: "Recogida de la camper",

        description:
          "Recogemos la camper, organizamos equipaje y dejamos todo listo para empezar la ruta.",

        tags: [
          "⏱ 1 h",
          "📍 Keflavík",
          "🟢 Sin reserva",
          "⚠️ Hora por confirmar"
        ]
      },


      /* Þingvellir */
      {
        time: "14:00",
        icon: "🌋",

        category: "PARQUE NACIONAL",
        title: "Þingvellir",

        description:
          "Primera parada del viaje y paseo por una de las zonas geológicas más importantes de Islandia.",

        tags: [
          "⏱ 1 h 30",
          "🥾 Fácil",
          "📸 Muy top"
        ],

        actions: [
          {
            text: "📍 Maps",
            url: "#"
          },

          {
            text: "ℹ️ Detalles",
            url: "#"
          }
        ]
      },


      /* Geysir */
      {
        time: "16:30",
        icon: "💦",

        category: "GEOTERMIA",
        title: "Geysir",

        description:
          "Parada breve en la zona geotérmica para ver Strokkur en erupción.",

        tags: [
          "⏱ 45 min",
          "🟢 Sin reserva"
        ]
      },


      /* Gullfoss */
      {
        time: "18:00",
        icon: "🌊",

        category: "CASCADA",
        title: "Gullfoss",

        description:
          "Una de las cascadas más famosas del país y última gran parada del Círculo Dorado.",

        tags: [
          "⏱ 1 h",
          "📸 Top"
        ]
      },


      /* Secret Lagoon */
      {
        time: "20:00",
        icon: "♨️",

        category: "RELAX",
        title: "Secret Lagoon",

        description:
          "Terminamos el día bañándonos en aguas termales antes de ir al camping.",

        tags: [
          "⏱ 1 h 30",
          "🟠 Mejor reservar"
        ],

        /* Hace que esta tarjeta tenga un estilo especial */
        featured: true,

        actions: [
          {
            text: "🎟 Reservar",
            url: "#",
            primary: true
          },

          {
            text: "📍 Maps",
            url: "#"
          }
        ]
      }

    ]
  },


  /* =======================================================
     DÍA 2 · JUEVES 10

     De momento lo dejamos casi vacío.
     Después meteremos el itinerario real.
  ======================================================= */

  {
    id: 2,

    navDate: "JUE 10",

    date: "JUEVES 10 DE SEPTIEMBRE",

    title: "Costa Sur",

    intro:
      "Cascadas, costa sur y nuestra primera experiencia sobre el hielo.",

    stats: [],

    activities: []
  },


  /* =======================================================
     DÍA 3
  ======================================================= */

  {
    id: 3,

    navDate: "VIE 11",

    date: "VIERNES 11 DE SEPTIEMBRE",

    title: "Glaciares",

    intro:
      "Uno de los días más espectaculares del viaje.",

    stats: [],

    activities: []
  },


  /* =======================================================
     DÍA 4
  ======================================================= */

  {
    id: 4,

    navDate: "SÁB 12",

    date: "SÁBADO 12 DE SEPTIEMBRE",

    title: "Islandia",

    intro: "Día 4 del viaje.",

    stats: [],

    activities: []
  },


  /* =======================================================
     DÍA 5
  ======================================================= */

  {
    id: 5,

    navDate: "DOM 13",

    date: "DOMINGO 13 DE SEPTIEMBRE",

    title: "Islandia",

    intro: "Día 5 del viaje.",

    stats: [],

    activities: []
  },


  /* =======================================================
     DÍA 6
  ======================================================= */

  {
    id: 6,

    navDate: "LUN 14",

    date: "LUNES 14 DE SEPTIEMBRE",

    title: "Último día",

    intro: "Últimas horas en Islandia.",

    stats: [],

    activities: []
  }

];
