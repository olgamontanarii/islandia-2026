/* =========================================================
   DATOS DEL VIAJE

   Este archivo contiene toda la información del itinerario.

   Aquí guardamos:
   - días
   - actividades
   - trayectos en camper
   - coordenadas
   - reservas
   - parkings
   - información importante

   app.js utilizará estos datos para construir la web.
========================================================= */


const tripDays = [

  /* =======================================================
     DÍA 1 · MIÉRCOLES 9
  ======================================================= */

  {
    id: 1,

    /* Información de la navegación */
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
       ACTIVIDADES Y TRAYECTOS

       type: "activity" = actividad
       type: "drive"    = trayecto en camper

       El orden dentro de este array es exactamente
       el orden en el que aparecerán en la web.
    ----------------------------------------------------- */

    activities: [


      /* ===================================================
         ACTIVIDAD · RECOGIDA CAMPER
      =================================================== */

      {
        type: "activity",

        time: "12:00",

        icon: "🚐",

        category: "INICIO",

        title: "Recogida de la camper",


        /* Localización para el mapa */
        location: {

          name: "Keflavík",

          lat: 63.9850,

          lng: -22.6056,

          /* Más adelante pondremos el enlace real */
          mapsUrl: "#"

        },


        description:
          "Recogemos la camper, organizamos equipaje y dejamos todo listo para empezar la ruta.",


        tags: [

          "⏱ 1 h",

          "📍 Keflavík",

          "🟢 Sin reserva",

          "⚠️ Hora por confirmar"

        ],


        /* Información práctica importante */
        important: [

          "Comprobar combustible",

          "Revisar calefacción y gas",

          "Guardar equipaje antes de salir"

        ]

      },


      /* ===================================================
         TRAYECTO · KEFLAVÍK → ÞINGVELLIR
      =================================================== */

      {
        type: "drive",

        icon: "🚐",

        from: "Keflavík",

        to: "Þingvellir",

        km: 105,

        minutes: 90,


        /* Enlace real a Google Maps más adelante */
        mapsUrl: "#",


        /* Carreteras principales */
        roads: [

          "41",

          "1",

          "36"

        ],


        /*
          Instrucciones que podremos consultar incluso
          aunque no tengamos cobertura.
        */
        offlineDirections: [

          "Salir de Keflavík por la carretera 41 en dirección Reykjavík.",

          "Continuar hasta enlazar con la carretera 1.",

          "Tomar la carretera 36 hacia Þingvellir.",

          "Seguir las indicaciones del Parque Nacional."

        ],


        /* Información sobre dónde aparcar al llegar */
        parking: {

          info:
            "Usar uno de los parkings oficiales del Parque Nacional.",

          mapsUrl: "#"

        }

      },


      /* ===================================================
         ACTIVIDAD · ÞINGVELLIR
      =================================================== */

      {
        type: "activity",

        time: "14:00",

        icon: "🌋",

        category: "PARQUE NACIONAL",

        title: "Þingvellir",


        location: {

          name: "Þingvellir",

          lat: 64.2559,

          lng: -21.1300,

          mapsUrl: "#"

        },


        description:
          "Primera parada del viaje y paseo por una de las zonas geológicas más importantes de Islandia.",


        tags: [

          "⏱ 1 h 30",

          "🥾 Fácil",

          "📸 Muy top"

        ],


        parking: {

          info:
            "Parking oficial del Parque Nacional.",

          mapsUrl: "#"

        },


        important: [

          "Llevar cortavientos",

          "Hay senderos fáciles",

          "Conviene tener calzado impermeable"

        ]

      },


      /* ===================================================
         TRAYECTO · ÞINGVELLIR → GEYSIR
      =================================================== */

      {
        type: "drive",

        icon: "🚐",

        from: "Þingvellir",

        to: "Geysir",

        km: 60,

        minutes: 50,

        mapsUrl: "#",


        roads: [

          "36",

          "365",

          "37",

          "35"

        ],


        offlineDirections: [

          "Salir de Þingvellir por la carretera 36.",

          "Continuar por la 365.",

          "Seguir hacia Laugarvatn.",

          "Tomar la carretera 37.",

          "Continuar por la carretera 35 hasta Geysir."

        ],


        parking: {

          info:
            "Parking junto al área de visitantes de Geysir.",

          mapsUrl: "#"

        }

      },


      /* ===================================================
         ACTIVIDAD · GEYSIR
      =================================================== */

      {
        type: "activity",

        time: "16:30",

        icon: "💦",

        category: "GEOTERMIA",

        title: "Geysir",


        location: {

          name: "Geysir",

          lat: 64.3104,

          lng: -20.3024,

          mapsUrl: "#"

        },


        description:
          "Parada breve en la zona geotérmica para ver Strokkur en erupción.",


        tags: [

          "⏱ 45 min",

          "🟢 Sin reserva"

        ],


        parking: {

          info:
            "Parking junto al centro de visitantes.",

          mapsUrl: "#"

        }

      },


      /* ===================================================
         TRAYECTO · GEYSIR → GULLFOSS
      =================================================== */

      {
        type: "drive",

        icon: "🚐",

        from: "Geysir",

        to: "Gullfoss",

        km: 10,

        minutes: 10,

        mapsUrl: "#",


        roads: [

          "35"

        ],


        offlineDirections: [

          "Salir de Geysir por la carretera 35.",

          "Continuar aproximadamente 10 km.",

          "Seguir las indicaciones hacia Gullfoss."

        ],


        parking: {

          info:
            "Parking principal de Gullfoss.",

          mapsUrl: "#"

        }

      },


      /* ===================================================
         ACTIVIDAD · GULLFOSS
      =================================================== */

      {
        type: "activity",

        time: "18:00",

        icon: "🌊",

        category: "CASCADA",

        title: "Gullfoss",


        location: {

          name: "Gullfoss",

          lat: 64.3271,

          lng: -20.1199,

          mapsUrl: "#"

        },


        description:
          "Una de las cascadas más famosas del país y última gran parada del Círculo Dorado.",


        tags: [

          "⏱ 1 h",

          "📸 Top"

        ],


        parking: {

          info:
            "Parking principal junto al centro de visitantes.",

          mapsUrl: "#"

        },


        important: [

          "Puede haber bastante viento",

          "El suelo puede estar mojado",

          "Llevar impermeable"

        ]

      },


      /* ===================================================
         TRAYECTO · GULLFOSS → SECRET LAGOON
      =================================================== */

      {
        type: "drive",

        icon: "🚐",

        from: "Gullfoss",

        to: "Secret Lagoon",

        km: 32,

        minutes: 30,

        mapsUrl: "#",


        roads: [

          "35",

          "30"

        ],


        offlineDirections: [

          "Salir de Gullfoss por la carretera 35.",

          "Continuar hacia Flúðir.",

          "Tomar la carretera 30.",

          "Seguir las indicaciones hacia Secret Lagoon."

        ],


        parking: {

          info:
            "Parking en el propio recinto.",

          mapsUrl: "#"

        }

      },


      /* ===================================================
         ACTIVIDAD · SECRET LAGOON
      =================================================== */

      {
        type: "activity",

        time: "20:00",

        icon: "♨️",

        category: "RELAX",

        title: "Secret Lagoon",


        location: {

          name: "Secret Lagoon",

          lat: 64.1377,

          lng: -20.3097,

          mapsUrl: "#"

        },


        description:
          "Terminamos el día bañándonos en aguas termales antes de ir al camping.",


        tags: [

          "⏱ 1 h 30",

          "🟠 Mejor reservar"

        ],


        /*
          Esta propiedad hace que la tarjeta
          aparezca visualmente destacada.
        */
        featured: true,


        /* Información de reserva */
        booking: {

          status: "recommended",

          advice:
            "Mejor reservar si vemos que quedan pocas plazas.",

          url: "#"

        },


        parking: {

          info:
            "Parking gratuito en el recinto.",

          mapsUrl: "#"

        },


        important: [

          "Llevar bañador",

          "Llevar toalla",

          "Revisar horario de última entrada"

        ]

      }

    ]

  },


  /* =======================================================
     DÍA 2 · JUEVES 10
  ======================================================= */

  {
    id: 2,

    navDate: "JUE 10",

    date: "JUEVES 10 DE SEPTIEMBRE",

    title: "Costa Sur",

    intro:
      "Cascadas, costa sur y nuestra primera experiencia sobre el hielo.",


    /*
      Lo completaremos cuando trabajemos
      específicamente el Día 2.
    */
    stats: [],

    activities: []

  },


  /* =======================================================
     DÍA 3 · VIERNES 11
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
     DÍA 4 · SÁBADO 12
  ======================================================= */

  {
    id: 4,

    navDate: "SÁB 12",

    date: "SÁBADO 12 DE SEPTIEMBRE",

    title: "Islandia",

    intro:
      "Día 4 del viaje.",

    stats: [],

    activities: []

  },


  /* =======================================================
     DÍA 5 · DOMINGO 13
  ======================================================= */

  {
    id: 5,

    navDate: "DOM 13",

    date: "DOMINGO 13 DE SEPTIEMBRE",

    title: "Islandia",

    intro:
      "Día 5 del viaje.",

    stats: [],

    activities: []

  },


  /* =======================================================
     DÍA 6 · LUNES 14
  ======================================================= */

  {
    id: 6,

    navDate: "LUN 14",

    date: "LUNES 14 DE SEPTIEMBRE",

    title: "Último día",

    intro:
      "Últimas horas en Islandia.",

    stats: [],

    activities: []

  }

];


/* =========================================================
   PRUEBA

   Podemos ver este mensaje en la consola para comprobar
   que data.js se ha cargado correctamente.
========================================================= */

console.log("✅ data.js cargado correctamente");

console.log("Datos del viaje:", tripDays);
