/* =========================================================
   DATOS DEL VIAJE · ISLANDIA 2026
========================================================= */

const tripDays = [

  /* =======================================================
     DÍA 1 · MIÉRCOLES 9
  ======================================================= */

  {
    id: 1,

    navDate: "MIÉ 9",

    date: "MIÉRCOLES 9 DE SEPTIEMBRE",

    title: "Círculo Dorado",

    intro:
      "Nuestro primer día en Islandia. Camper, paisajes volcánicos y aguas termales.",


    /* -----------------------------------------------------
       RESUMEN DEL DÍA
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


    /* =====================================================
       ACTIVIDADES + TRAYECTOS
    ===================================================== */

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


        location: {

          name: "Keflavík",

          lat: 63.9850,

          lng: -22.6056,

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

        mapsUrl: "#",


        roads: [

          "41",

          "1",

          "36"

        ],


        offlineDirections: [

          "Salir de Keflavík por la carretera 41 en dirección Reykjavík.",

          "Continuar hasta enlazar con la carretera 1.",

          "Tomar la carretera 36 hacia Þingvellir.",

          "Seguir las indicaciones hacia el Visitor Center de Þingvellir y P1 Hakið."

        ],


        parking: {

          name: "P1 Hakið",

          info:
            "Parking junto al Visitor Center de Þingvellir y la parte alta de Almannagjá. Será nuestro punto de llegada al parque.",

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

          name: "P1 Hakið",

          info:
            "Parking junto al Visitor Center y la parte alta de Almannagjá.",

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

          "Continuar por la carretera 365.",

          "Seguir hacia Laugarvatn.",

          "Continuar por la carretera 37.",

          "Tomar la carretera 35 en dirección Geysir.",

          "Al llegar, seguir las indicaciones hacia el área de aparcamiento del Geysir Center."

        ],


        parking: {

          name: "Geysir Center Parking",

          info:
            "Aparcamiento del área de visitantes de Geysir, frente a la zona geotérmica.",

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

          name: "Geysir Center Parking",

          info:
            "Aparcamiento junto al Geysir Center y frente al acceso a la zona geotérmica.",

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

          "Continuar aproximadamente 10 km en dirección Gullfoss.",

          "Seguir las indicaciones hacia Gullfoss.",

          "Al llegar, dirigirse al aparcamiento superior junto al Visitor Center."

        ],


        parking: {

          name: "Gullfoss Upper Parking",

          info:
            "Parking superior junto al Gullfoss Visitor Center. Desde aquí se accede fácilmente a los miradores.",

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

          name: "Gullfoss Upper Parking",

          info:
            "Parking superior junto al centro de visitantes y los accesos principales a los miradores.",

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

          "Continuar en dirección a Flúðir.",

          "Tomar la carretera 30.",

          "Entrar en Flúðir y seguir las indicaciones hacia Secret Lagoon / Gamla Laugin.",

          "Aparcar en el propio recinto de Secret Lagoon."

        ],


        parking: {

          name: "Secret Lagoon Parking",

          info:
            "Parking del propio recinto de Secret Lagoon (Gamla Laugin).",

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


        featured: true,


        booking: {

          status: "recommended",

          advice:
            "Mejor reservar si vemos que quedan pocas plazas.",

          url: "#"

        },


        parking: {

          name: "Secret Lagoon Parking",

          info:
            "Parking en el propio recinto de Secret Lagoon.",

          mapsUrl: "#"

        },


        important: [

          "Llevar bañador",

          "Llevar toalla",

          "Revisar horario de última entrada"

        ]

      },


      /* ===================================================
         TRAYECTO · SECRET LAGOON → HELLA
      =================================================== */

      {
        type: "drive",

        icon: "🚐",

        from: "Secret Lagoon",

        to: "Hella Camping",

        km: 47,

        minutes: 40,

        mapsUrl: "#",


        roads: [

          "30",

          "1"

        ],


        offlineDirections: [

          "Salir de Flúðir por la carretera 30.",

          "Continuar hacia el sur hasta enlazar con la carretera 1.",

          "Tomar la carretera 1 en dirección Hella.",

          "Entrar en Hella y seguir hasta el camping."

        ],


        parking: {

          name: "Hella Camping",

          info:
            "Final del Día 1. Pernoctamos aquí con la camper.",

          mapsUrl: "#"

        }

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
   COMPROBACIÓN
========================================================= */

console.log("✅ data.js cargado correctamente");
console.log("Datos del viaje:", tripDays);
