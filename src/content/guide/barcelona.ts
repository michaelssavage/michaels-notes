import { GUIDE_TAGS, GUIDE_TYPES, GuideTableItem } from "@/types/Guide";

export const items: GuideTableItem[] = [
  {
    title: "Aire Ancient Baths",
    location: "https://maps.app.goo.gl/LTNxRGoMnzFM4wKU6",
    coordinates: { lat: 41.3870318, lng: 2.1786015 },
    link: "https://relax.beaire.com/aire-ancient-baths-barcelona",
    price: "€100+",
    type: GUIDE_TYPES.FUN,
    description: "Thermal baths and spa experience in Ciutat Vella.",
    tags: [GUIDE_TAGS.EXPENSIVE, GUIDE_TAGS.RELAXING],
    image:
      "https://31m9mhhbv2.ucarecd.net/a4a5cdf0-48f2-4180-b460-b6bfc0767aec/aire.jpg",
  },
  {
    title: "Aquarium de Barcelona",
    location: "https://maps.app.goo.gl/ecv77Rp9SeWuUobn7",
    coordinates: { lat: 41.3768344, lng: 2.1819201 },
    link: "https://tickets.aquariumbcn.com/",
    price: "€14",
    type: GUIDE_TYPES.FUN,
    description:
      "Large aquarium with Mediterranean and tropical marine life in Port Vell.",
    tags: [GUIDE_TAGS.LIVING_WORLD],
    image:
      "https://31m9mhhbv2.ucarecd.net/c90da5e6-87f7-4117-9149-48d72b181c84/aquarium.jpg",
  },
  {
    title: "Axe Throwing",
    location: "https://maps.app.goo.gl/VpaFan2JHpS9A97P7",
    coordinates: { lat: 41.3887966, lng: 2.1722123 },
    link: "https://barcelonaaxethrowing.com/",
    price: "€19.50",
    type: GUIDE_TYPES.FUN,
    description: "Indoor axe-throwing games near Plaça de Catalunya.",
    tags: [],
    image:
      "https://31m9mhhbv2.ucarecd.net/d98868c9-db69-43d3-bcd3-1d9494a2df02/axe.jpg",
  },
  {
    title: "Barcelona Botanical Garden",
    type: GUIDE_TYPES.PLACE,
    price: "€5",
    location: "https://maps.app.goo.gl/kQ7AxvQUmq1jDRJ58",
    coordinates: { lat: 41.3621881, lng: 2.1548949 },
    link: "https://museuciencies.cat/en/the-nat/venues/botanical-garden-of-barcelona",
    tags: [
      GUIDE_TAGS.FREE_1ST_SUNDAY,
      GUIDE_TAGS.LIVING_WORLD,
      GUIDE_TAGS.NATURE,
    ],
    description: "Mediterranean plant garden in Sants-Montjuïc.",
    image:
      "https://31m9mhhbv2.ucarecd.net/c7007628-791d-49bb-9f50-9aeec939a8ca/jardinbotanico.jpg",
  },
  {
    title: "Barcelona Zoo",
    price: "€21.40",
    location: "https://maps.app.goo.gl/Y33ARACBXcY2unwV8",
    coordinates: { lat: 41.386281, lng: 2.187145 },
    link: "https://zoobarcelona.cat/en/home",
    type: GUIDE_TYPES.FUN,
    tags: [GUIDE_TAGS.LIVING_WORLD],
    description:
      "Mid-sized city zoo with a wide variety of animals in Parc de la Ciutadella including komodo dragons, hippos, giraffes, hyenas, elephants, lions, red pandas, penguins, orangutans",
    image:
      "https://31m9mhhbv2.ucarecd.net/dc549cd7-91bf-44f7-bd99-6882d0e17b3a/suricata.jpg",
  },
  {
    title: "Basílica del Sagrat Cor Tibidabo",
    type: GUIDE_TYPES.PLACE,
    location: "https://maps.app.goo.gl/wfmdK47p23poZLVM7",
    coordinates: { lat: 41.4220483, lng: 2.1162235 },
    link: "https://tibidabo.cat/en",
    price: "Free - €4+",
    tags: [],
    description:
      "The mountain peak in Sarrià-Sant Gervasi has a church, amusement park, and excellent views of the city. Whether you hike up, take the funicular, or drive, it's worth a visit. Jump on the Talaia, an attraction that has offered a 360° panoramic view of Barcelona 550 meters above sea level, since 1921.",
    image:
      "https://31m9mhhbv2.ucarecd.net/de6da6b0-6f5b-48d9-9042-97cef3b40c1e/tibidabo.webp",
  },
  {
    title: "Bewake Park",
    price: "€39 / 2 hours",
    location: "https://maps.app.goo.gl/WPjEWuqFtC3Luv6j8",
    coordinates: { lat: 41.2711547, lng: 1.9920466 },
    link: "https://bewakepark.com/",
    type: GUIDE_TYPES.ACTIVITY,
    tags: [],
    description: "Cable wakeboarding and water sports park in Castelldefels.",
    image:
      "https://31m9mhhbv2.ucarecd.net/c12a58bc-4bf2-4e23-820d-69566f7181bf/wakeboarding.jpg",
  },
  {
    title: "Biblioteca Gabriel García Márquez",
    price: GUIDE_TAGS.FREE,
    location: "https://maps.app.goo.gl/Rg4cM3gsk8U9QCEx5",
    coordinates: { lat: 41.4172731, lng: 2.1999626 },
    link: "https://ajuntament.barcelona.cat/biblioteques/ca/bibgarciamarquez",
    type: GUIDE_TYPES.PLACE,
    tags: [GUIDE_TAGS.FREE],
    image:
      "https://31m9mhhbv2.ucarecd.net/f47a5448-89c0-4bc8-811b-22b258358a80/library.jpg",
    description:
      "Public library designed by SUMA Arquitectura, and uses exposed wood and glass, creating a warm, modern environment. There's a special comic section showcasing works by Francisco Ibáñez, a local comic artist, with a collection of 500 pieces.",
  },
  {
    title: "Bungee Jump",
    price: "€60 / 2 jumps",
    location: "https://maps.app.goo.gl/nDh9mxgyLUZZCtTa9",
    coordinates: { lat: 41.3457728, lng: 1.7060765 },
    link: "https://www.cataloniaadventures.com/puenting-catalunya/",
    type: GUIDE_TYPES.ACTIVITY,
    tags: [GUIDE_TAGS.DAY_TRIP],
    description:
      "Outdoor bungee jumping experience 130km outside of Barcelona. Experience a 30 meter jump above the river canyon, with a pendulum effect of up to 25 meters.",
    image:
      "https://31m9mhhbv2.ucarecd.net/3ef05610-b45d-40c1-9c61-025f6f9a10b0/bungee.jpg",
  },
  {
    title: "Bunkers del Carmel",
    price: GUIDE_TAGS.FREE,
    location: "https://maps.app.goo.gl/WiNPByzatAMXYZyp6",
    coordinates: { lat: 41.419236, lng: 2.161779 },
    link: "https://www.barcelona.cat/museuhistoria/ca/patrimonis/els-espais-del-museu/turo-de-la-rovira",
    type: GUIDE_TYPES.PLACE,
    tags: [],
    description:
      "MUHBA Turó de la Rovira offers panoramic views of Barcelona from Spanish Civil War bunkers where anti-aircraft guns were installed.",
    image:
      "https://31m9mhhbv2.ucarecd.net/a8837809-7fcc-4294-8f29-9752533384fd/bunkers.jpg",
  },
  {
    title: "CaixaForum",
    price: "€6",
    type: GUIDE_TYPES.PLACE,
    location: "https://maps.app.goo.gl/AhiX6L9Lnt35ARC56",
    coordinates: { lat: 41.371308, lng: 2.149575 },
    link: "https://caixaforum.org/es/barcelona",
    description: "Cultural centre with art exhibitions and events in Montjuïc.",
    image:
      "https://31m9mhhbv2.ucarecd.net/05272c32-4507-4a37-9a25-a5a4ff34a1a0/caixaforum.jpg",
    tags: [],
  },
  {
    title: "Can Framis",
    price: "€10",
    type: GUIDE_TYPES.PLACE,
    location: "https://maps.app.goo.gl/oCAFq3kTCgGNx7Pd8",
    coordinates: { lat: 41.4028922, lng: 2.1924099 },
    link: "https://www.fundaciovilacasas.com/en/museum/can-framis-museum-barcelona",
    description:
      "Contemporary art museum in Poble Nou with temporary exhibitions.",
    image:
      "https://31m9mhhbv2.ucarecd.net/235b79f0-403a-499d-87db-61d679f49bb3/canframis.jpg",
    tags: ["relaxing"],
  },
  {
    title: "Casa Vicens",
    link: "https://casavicens.org/es",
    price: "€21",
    type: GUIDE_TYPES.PLACE,
    tags: [],
    image:
      "https://31m9mhhbv2.ucarecd.net/fdf43859-fbf6-44b5-a8f8-c2bd6eb2d931/CV_ESPACIOS_32.jpg",
    location: "https://maps.app.goo.gl/27Frb6oJ3M98qpdXA",
    coordinates: { lat: 41.4034978, lng: 2.1480706 },
    description:
      "One of Antoni Gaudí's earliest works, it showcases a mix of Moorish, oriental, and natural influences, with colourful ceramic tiles and intricate ironwork. Cool to look at if you're in the area but too expensive for some to enter.",
  },
  {
    title: "Castell de Montjuïc",
    tags: [GUIDE_TAGS.FREE_1ST_SUNDAY],
    price: "€12",
    type: GUIDE_TYPES.PLACE,
    link: "https://ajuntament.barcelona.cat/castelldemontjuic/en/visit/planning-your-visit",
    location: "https://maps.app.goo.gl/TDYFQHaGyGyoCkk78",
    coordinates: { lat: 41.362959, lng: 2.1650636 },
    description: "Historic fortress with city views at the top of Montjuïc.",
    image:
      "https://31m9mhhbv2.ucarecd.net/db4dd0b3-7319-4e8e-8862-df111baff24f/montjuic.jpg",
  },
  {
    title: "CeleBreak",
    location: "App Dependant",
    link: "https://celebreak.com/es/",
    price: "€7 - €20",
    type: GUIDE_TYPES.ACTIVITY,
    tags: [],
    description:
      "Book and play soccer matches with strangers or friends using the CeleBreak app.",
    image:
      "https://31m9mhhbv2.ucarecd.net/3ce004bb-ba71-4560-9382-3b5db645a76d/celebreak.jpg",
  },
  {
    title: "Centre Cívic Convent de Sant Agustí",
    type: GUIDE_TYPES.PLACE,
    location: "https://maps.app.goo.gl/oYJfoYAucbqdjnGF8",
    coordinates: { lat: 41.4892519, lng: 1.8805331 },
    link: "https://conventagusti.com/",
    tags: [GUIDE_TAGS.FREE],
    price: GUIDE_TAGS.FREE,
    description:
      "A restored 14th-century convent in Barcelona's El Born district that hosts exhibitions, concerts, workshops, and activities.",
    image:
      "https://31m9mhhbv2.ucarecd.net/953eafa7-d81b-408f-8d6c-64498f6eff19/civicconvent.jpg",
  },
  {
    title: "Ciutadella Park",
    location: "https://maps.app.goo.gl/3zbVCi4pDm6Ft3Gh8",
    coordinates: { lat: 41.388123, lng: 2.1860152 },
    tags: [GUIDE_TAGS.FREE, GUIDE_TAGS.NATURE],
    price: GUIDE_TAGS.FREE,
    link: "https://www.barcelona.cat/es/que-hacer-en-bcn/parques-y-jardines/parque-de-la-ciutadella-92086011921",
    type: GUIDE_TYPES.PLACE,
    description:
      "Ciutadella Park has a large number of century-old trees and a wide range of elements: the monumental waterfall, 19th-century buildings now used as museums, a lake for rowing boats, pathways and numerous sculptures. It shares the site with the city zoo.",
    image:
      "https://31m9mhhbv2.ucarecd.net/c9aa5517-c58b-49c9-9b0b-8cec17314621/ciutadella.jpg",
  },
  {
    title: "Museo de la Ciencia",
    type: GUIDE_TYPES.PLACE,
    price: "€8",
    location: "https://maps.app.goo.gl/Vke3mwSVLgny5ZW78",
    coordinates: { lat: 41.4131805, lng: 2.1285481 },
    link: "https://maps.app.goo.gl/Fdvn6xJkaYZ5M7RA8",
    tags: [],
    description:
      "Interactive science museum with exhibitions and a planetarium in Sarrià-Sant Gervasi.",
    image:
      "https://31m9mhhbv2.ucarecd.net/4c34dc8a-6fc9-40b4-bb42-01f2104c5e2a/cosmocaixa.jpg",
  },
  {
    title: "Dr. Flow Bar",
    location: "https://maps.app.goo.gl/49Gq84m8dkRWd59n7",
    coordinates: { lat: 41.3843023, lng: 2.1800432 },
    link: "https://www.drflow.es/programacion/",
    tags: [GUIDE_TAGS.LIVE_MUSIC],
    type: GUIDE_TYPES.MUSIC,
    price: "Donation",
    description: "Live music venue located in El Born.",
    image:
      "https://31m9mhhbv2.ucarecd.net/759da686-4c24-433b-8c66-fa859ab73074/flow.jpg",
  },
  {
    title: "Espai Inmersa",
    link: "https://www.espacioinmersa.com/",
    location: "https://maps.app.goo.gl/2SPGLYS7HE68LhdT8",
    coordinates: { lat: 41.3977801, lng: 2.1950663 },
    price: "€12.80 +",
    type: GUIDE_TYPES.PLACE,
    tags: [],
    description:
      "Interactive exhibitions and experiences in Poble Nou. Explore space, the planet, history in a unique way.",
    image:
      "https://31m9mhhbv2.ucarecd.net/87e0f25f-1732-4b3a-b964-fcdc984a800c/inmersa.webp",
  },
  {
    title: "Flamenco theater - Palau Dalmases",
    type: GUIDE_TYPES.FUN,
    price: "€30",
    tags: [GUIDE_TAGS.LIVE_MUSIC],
    link: "https://www.flamencopalaudalmases.com/",
    location: "https://maps.app.goo.gl/H3R6B8XBU1hRH6mw7",
    coordinates: { lat: 41.3843023, lng: 2.1800432 },
    description:
      "Traditional Spanish dance and music performance in Ciutat Vella.",
    image:
      "https://31m9mhhbv2.ucarecd.net/d85f8cf3-3404-45dc-89ff-79d32a65e45a/flamenco.webp",
  },
  {
    title: "Flotarium",
    price: "€75 for 2",
    tags: [GUIDE_TAGS.RELAXING],
    link: "https://www.flotarium.com/tienda/",
    location: "https://maps.app.goo.gl/FJ1cQd61qpTZYkYQ9",
    coordinates: { lat: 41.3972778, lng: 2.1555338 },
    type: GUIDE_TYPES.FUN,
    description: "Sensory deprivation floatation tank experience in Gràcia.",
    image:
      "https://31m9mhhbv2.ucarecd.net/3595af55-9704-4d8c-a966-e492ea1ed0e1/flotarium.webp",
  },
  {
    title: "Fundació Joan Miró",
    price: "€9",
    location: "https://maps.app.goo.gl/WK2VEt35TScS8K7x7",
    coordinates: { lat: 41.3686304, lng: 2.1598509 },
    tags: [GUIDE_TAGS.RELAXING],
    link: "https://www.fmirobcn.org/",
    type: GUIDE_TYPES.FUN,
    description:
      "Showcase of Joan Miro's modern, colorful artworks in hilltop museum with courtyards and terraces in Montjuïc.",
    image:
      "https://31m9mhhbv2.ucarecd.net/f1d20d07-e4c6-4247-aa3b-a891f3af165f/miro.webp",
  },
  {
    title: "Jazz at 23 Robadors",
    price: "€8",
    type: GUIDE_TYPES.FUN,
    link: "https://23robadors.com/programacio/",
    tags: [GUIDE_TAGS.LIVE_MUSIC],
    location: "https://maps.app.goo.gl/Y1MtCGiLZxJQAPEv9",
    coordinates: { lat: 41.379672, lng: 2.170754 },
    description: "Intimate bar offering live jazz music in Raval.",
    image:
      "https://31m9mhhbv2.ucarecd.net/dffa80ae-334b-4a7b-a0bc-f2f117966141/jazz.jpg",
  },
  {
    title: "Le Patio Spa - Hammam & Massage",
    location: "https://maps.app.goo.gl/KEbChegURjpuk7RA9",
    coordinates: { lat: 41.3842349, lng: 2.1551735 },
    link: "https://www.lepatiospa.com/massage-barcelona-eixample",
    price: "€40 - €140",
    type: GUIDE_TYPES.ACTIVITY,
    tags: [GUIDE_TAGS.RELAXING],
    description: "Relaxing spa experience with hammam and massage in Eixample.",
    image:
      "https://31m9mhhbv2.ucarecd.net/bf9a6efd-e9e4-45c8-b74b-bf4b0a9aeb90/spapatio.webp",
  },
  {
    title: "MACBA",
    type: GUIDE_TYPES.ACTIVITY,
    price: "€10,80",
    link: "https://www.macba.cat",
    tags: [GUIDE_TAGS.FREE_AFTER_SATURDAY_4PM],
    location: "https://maps.app.goo.gl/NgbAxXmbCPiVDJFRA",
    coordinates: { lat: 41.3831913, lng: 2.1668668 },
    image:
      "https://31m9mhhbv2.ucarecd.net/20fe39fa-5c00-488e-986e-7a5cf1b00f37/elMACBAporMarcelLiSaenz.jpg",
    description:
      "Museu d'Art Contemporani de Barcelona has built a collection of over 5,000 works, concentrating on post-1945 Catalan and Spanish art, while also including international pieces.",
  },
  {
    title: "Mirador Torre Glòries",
    price: "€18",
    tags: [],
    type: GUIDE_TYPES.PLACE,
    location: "https://maps.app.goo.gl/Cuf9cmmt91Duf1Sq9",
    coordinates: { lat: 41.4035826, lng: 2.1894429 },
    image:
      "https://31m9mhhbv2.ucarecd.net/8d276301-9d69-4a37-8fbe-5f7a075335cc/b5eccf92696c0d58.png",
    link: "https://www.miradortorreglories.com/planifica-tu-visita/comprar-entradas/",
    description:
      "This skyscraper offers panoramic views of the city and features an interactive exhibition that combines art, technology, and data to explore Barcelona's urban life.",
  },
  {
    title: "Montjuïc Cable Car",
    price: "€10.80",
    type: GUIDE_TYPES.ACTIVITY,
    link: "https://www.telefericdemontjuic.cat/en",
    tags: [],
    location: "https://maps.app.goo.gl/Be5ypmRLntBPeqxE7",
    coordinates: { lat: 41.368723, lng: 2.1634884 },
    description:
      "Scenic cable car ride up to Montjuïc Castle for those without a fear of heights.",
    image:
      "https://31m9mhhbv2.ucarecd.net/ad69c7fa-f7ad-4fa1-9ed1-c712267f669a/d781d1511b10b5792c4e848376c3e88f21526barcelonacombomontjuiccablecaraquariumbarcelona12.jpg",
  },
  {
    title: "Museo de Ciencias Naturales de Barcelona",
    tags: [GUIDE_TAGS.FREE_1ST_SUNDAY, GUIDE_TAGS.FREE_AFTER_SUNDAY_3PM],
    type: GUIDE_TYPES.ACTIVITY,
    price: "Free - €6",
    location: "https://maps.app.goo.gl/YpgzH54YpmZAHtNFA",
    coordinates: { lat: 41.4106796, lng: 2.218784 },
    link: "https://museuciencies.cat/en//the-nat/venues/natural-sciences-museum-of-barcelona/useful-information/opening-times-and-admission-fees/",
    description:
      "The Barcelona Natural Science Museum has an innovative offer of activities that combines scientific rigour with a sense of fun, and that includes temporary exhibitions, a Media library, the Science Nest (Niu de Ciència), conferences and workshops.",
    image:
      "https://31m9mhhbv2.ucarecd.net/daaa562e-0119-45ef-af70-9bf932b615e2/museublau.jpg",
  },
  {
    title: "Museo del Diseño de Barcelona",
    price: "€6.20",
    tags: [GUIDE_TAGS.FREE_1ST_SUNDAY],
    location: "https://maps.app.goo.gl/v6bfWM5D4TCVVaRY6",
    coordinates: { lat: 41.402451, lng: 2.1880918 },
    link: "https://www.dissenyhub.barcelona/",
    type: GUIDE_TYPES.PLACE,
    description: "Museum dedicated to design, fashion, and decorative arts.",
    image:
      "https://31m9mhhbv2.ucarecd.net/5b555d44-b135-46e6-88c6-eb1db47a9dab/REF_HUB_CT6A6276jpg.webp",
  },
  {
    title: "Museo Nacional de Arte de Cataluña",
    price: "€12",
    type: GUIDE_TYPES.PLACE,
    location: "https://maps.app.goo.gl/z2jAgAz1KuYa2nULA",
    coordinates: { lat: 41.3684399, lng: 2.15357 },
    link: "https://www.mnac.cat/",
    tags: [
      GUIDE_TAGS.FREE_1ST_SUNDAY,
      GUIDE_TAGS.FREE_AFTER_SATURDAY_3PM,
      GUIDE_TAGS.CANT_MISS,
    ],
    image:
      "https://31m9mhhbv2.ucarecd.net/3bd4cfb5-0475-4029-8906-7adcc6697c5c/museunacionaldartdecatalunyarutadelmodernismedebarcelona2.jpg",
    description:
      "Built between 1927 and 1929 within the style known as Eclectic Monumentalism. It houses collections from over a thousand years of Catalan art: painting, sculpture, arts of the object, drawing and engraving, photography, numismatics and medals",
  },
  {
    title: "Nau Bostik",
    type: GUIDE_TYPES.PLACE,
    tags: [GUIDE_TAGS.LIVE_MUSIC],
    price: GUIDE_TAGS.FREE,
    image:
      "https://31m9mhhbv2.ucarecd.net/54b03177-c84b-4822-a24f-56455006a084/NauBostik.jpg",
    location: "https://maps.app.goo.gl/Bky7avBMcoKVwuTv9",
    coordinates: { lat: 41.4245256, lng: 2.1930322 },
    description:
      "A self-managed meeting and artistic creation space in Barcelona located in the La Sagrera neighborhood. It is housed in a former factory building that was part of the Bostik adhesive company, which has been transformed into a vibrant cultural hub.",
    link: "https://naubostik.com/",
  },
  {
    title: "Observatori Fabra - Dinner with stars",
    link: "https://www.sternalia.com/en/dinners-with-stars.html",
    tags: [],
    location: "https://maps.app.goo.gl/mQgU3BMHx2kojxEx6",
    coordinates: { lat: 41.4184646, lng: 2.1241919 },
    price: "€81.50 - €128",
    type: GUIDE_TYPES.ACTIVITY,
    image:
      "https://31m9mhhbv2.ucarecd.net/75a87700-8671-4cc1-bbbf-688eab2730e7/cenarestrellasbarcelona1_2.jpg",
  },
  {
    title: "Observatori Fabra - Night guided tour",
    price: "€18.50 - €30",
    type: GUIDE_TYPES.PLACE,
    tags: [GUIDE_TAGS.RELAXING],
    description:
      "Every Friday and Saturday between October to May you will have the opportunity to visit the Fabra Observatory, enjoy a conference and the views of Barcelona from the outside of the dome and see the stars through the telescope.",
    link: "https://www.sternalia.com/en/guided-tours-fabra-observatory.html",
    location: "https://maps.app.goo.gl/mQgU3BMHx2kojxEx6",
    coordinates: { lat: 41.4184646, lng: 2.1241919 },
    image:
      "https://31m9mhhbv2.ucarecd.net/13fce4bd-7c23-4edd-9c2a-0696bed6455f/15soparsestrellesobservatorifabra.jpg",
  },
  {
    title: "Observatori Fabra de Barcelona",
    tags: [
      GUIDE_TAGS.FREE_1ST_SUNDAY,
      GUIDE_TAGS.FREE_EVERY_SUNDAY_11AM,
      GUIDE_TAGS.CASH_ONLY,
    ],
    price: "€3",
    type: GUIDE_TYPES.PLACE,
    description:
      "Historic astronomical observatory offering tours and stargazing.",
    link: "https://observatorifabra.cat/visits/",
    location: "https://maps.app.goo.gl/mQgU3BMHx2kojxEx6",
    coordinates: { lat: 41.4184646, lng: 2.1241919 },
    image:
      "https://31m9mhhbv2.ucarecd.net/5b40d9a7-b4b6-4fd6-b9e5-de0fa7946e48/cenarestrellasbarcelona8_2.jpg",
  },
  {
    title: "Padel",
    location: "App Dependant",
    link: "https://playtomic.com/",
    price: "€7 - €20",
    tags: [],
    type: GUIDE_TYPES.ACTIVITY,
    description:
      "Book and play padel matches with strangers or friends using the Playtomic app.",
    image:
      "https://31m9mhhbv2.ucarecd.net/f1af4744-2f8b-4f5e-88a3-0deb107e6da3/06d09b0ba9a34328838ba49ce536de82_169discoveraspectratio_default_0.webp",
  },
  {
    title: "Palau Martorell",
    type: GUIDE_TYPES.PLACE,
    location: "https://maps.app.goo.gl/jrAQMgSNdveGvyKS7",
    coordinates: { lat: 41.379288, lng: 2.1790104 },
    tags: [],
    link: "https://www.palaumartorell.com/en/visita",
    price: "€16",
    description: "Exhibition hall hosting art and cultural events.",
    image:
      "https://31m9mhhbv2.ucarecd.net/76646086-2383-427d-affd-f4045f870854/expoSorolla271_edited.jpg",
  },
  {
    title: "Palo Alto Market",
    type: GUIDE_TYPES.FUN,
    tags: [GUIDE_TAGS.LIVE_MUSIC],
    location: "https://maps.app.goo.gl/SLVni93PmeVEJxtY6",
    coordinates: { lat: 41.4044, lng: 2.2102071 },
    link: "https://palomarketfest.com/en",
    price: "€6.50",
    image:
      "https://31m9mhhbv2.ucarecd.net/c1cdb931-74e1-4b22-93e1-7fd22e226d09/tallerespia_1.png",
    description:
      "A design market with street music, DJ sessions, food trucks, and many exhibitors selling unique products.",
  },
  {
    title: "Parc del Laberint d'Horta",
    price: "€2.23",
    type: GUIDE_TYPES.PLACE,
    link: "https://guia.barcelona.cat/en/detall/parc-del-laberint-d-horta_92086011952.html",
    location: "https://maps.app.goo.gl/9BhXR3c49gvMNje76",
    coordinates: { lat: 41.4399698, lng: 2.1455713 },
    tags: [GUIDE_TAGS.NATURE],
    description: "Historical garden with a maze and romantic architecture.",
    image:
      "https://31m9mhhbv2.ucarecd.net/f7c4ba13-9e5c-4dbe-832e-0dc18b0792bc/image.webp",
  },
  {
    title: "Pedralbés Monastery",
    type: GUIDE_TYPES.PLACE,
    location: "https://maps.app.goo.gl/LevoJkbLsJcpcFoT9",
    coordinates: { lat: 41.3956588, lng: 2.1100623 },
    price: "€5.20",
    tags: [GUIDE_TAGS.FREE_AFTER_SUNDAY_3PM, GUIDE_TAGS.FREE_1ST_SUNDAY],
    link: "https://www.monestirpedralbes.barcelona/en/visit/opening_times_and_admission_fees",
    image:
      "https://31m9mhhbv2.ucarecd.net/ca2b37e8-b15c-45d7-8f20-0d59a654bfc0/202103190853eMonestirdePedralbes29Barcelona2021.jpg",
    description:
      "Gothic monastery with cloisters, gardens, and religious art founded in the 14th Century.",
  },
  {
    title: "Picasso Museum",
    type: GUIDE_TYPES.PLACE,
    location: "https://maps.app.goo.gl/XxLBErKHus1GPgQA6",
    coordinates: { lat: 41.3852746, lng: 2.1783723 },
    link: "https://museupicassobcn.cat/en/plan-your-visit/buy-tickets-and-opening-hours",
    price: "Free - €14",
    tags: [GUIDE_TAGS.FREE_1ST_SUNDAY],
    description:
      "Museum dedicated to Picasso's art during his early life in Barcelona. Free between 4pm and 7pm on Thursday during winter, and free between 7pm and 9pm Thursday, Friday and Saturday during summer.",
    image:
      "https://31m9mhhbv2.ucarecd.net/e34a6c2b-fada-4495-9906-a434b6721a82/picasso.jpg",
  },
  {
    title: "Razzmatazz",
    type: GUIDE_TYPES.MUSIC,
    location: "https://maps.app.goo.gl/QfjV8VvyudB7nnPn9",
    coordinates: { lat: 41.3977323, lng: 2.1911108 },
    link: "https://www.salarazzmatazz.com",
    tags: [GUIDE_TAGS.LIVE_MUSIC],
    price: "€10 - €20",
    description:
      "Large music venue and nightclub in Poble Nou with 5 floors of different styles of music.",
    image:
      "https://31m9mhhbv2.ucarecd.net/8299625a-ce48-45ce-b5d7-83fc5b46ee0c/Razzmatazz_c1.jpg",
  },
  {
    title: "Recinte Modernista de Sant Pau",
    location: "https://maps.app.goo.gl/grFnrFHZ1tM74f5v6",
    coordinates: { lat: 41.4117072, lng: 2.1743395 },
    link: "https://santpaubarcelona.org/en/visita/visita-lliure/",
    price: "€11.90",
    tags: [GUIDE_TAGS.RELAXING],
    type: GUIDE_TYPES.PLACE,
    description: "Modernist hospital complex and UNESCO World Heritage site.",
    image:
      "https://31m9mhhbv2.ucarecd.net/9f1c9a8b-4d4b-40ef-bff2-7d90ede8be90/ticketsforsantpaurecintemodernistabarcelonaT24.jpg",
  },
  {
    title: "Sagrada Familia",
    price: "€31.80",
    type: GUIDE_TYPES.PLACE,
    description:
      "Gaudí's world-famous unfinished masterpiece in Eixample. The tallest basilica in the world has been under construction for over one century.",
    tags: [GUIDE_TAGS.CANT_MISS],
    location: "https://maps.app.goo.gl/qgsz87obhV6R9Hre7",
    coordinates: { lat: 41.4060086, lng: 2.1771642 },
    link: "https://ticketsagradafamilia.com/",
    image:
      "https://31m9mhhbv2.ucarecd.net/8f3d2cac-cb34-42ef-8c72-1818236dd2e4/colorsllumnaixementacolumnesscaled.jpg",
  },
  {
    title: "Sailboat Experience Barcelona",
    location: "https://maps.app.goo.gl/DrDdKV3uPbUPUzg26",
    coordinates: { lat: 41.3877157, lng: 2.1992335 },
    link: "https://www.sailingexperiencebcn.com",
    tags: [],
    type: GUIDE_TYPES.ACTIVITY,
    price: "€39+",
    image:
      "https://31m9mhhbv2.ucarecd.net/d65c06fe-af51-4659-9514-87fc80e27f58/15hoursailingswimming1030x694.jpeg",
    description:
      "Guided sailing trips along Barcelona's coast with time for a plunge in the Mediterranean.",
  },
  {
    title: "Fly & Sail",
    location: "https://maps.app.goo.gl/DrDdKV3uPbUPUzg26",
    coordinates: { lat: 41.3877157, lng: 2.1992335 },
    link: "https://www.sailingexperiencebcn.com/shop/helicopter-costa-tour-sailing-experience-barcelona/",
    tags: [],
    image:
      "https://31m9mhhbv2.ucarecd.net/c1a9ace7-0330-408a-a3d9-4ceeeba34c03/VuelohelicopteroBarcelona.jpg",
    price: "€89 - €109",
    type: GUIDE_TYPES.ACTIVITY,
    description:
      "Experience a 7 minute helicopter journey with up to 3 passengers at a time, then set sail with snacks and drinks.",
  },
  {
    title: "Sala Apolo",
    location: "https://maps.app.goo.gl/1pe6KwRWYhSqRdqb6",
    coordinates: { lat: 41.3744026, lng: 2.1695739 },
    link: "https://sala-apolo.com/es/agenda",
    tags: [GUIDE_TAGS.LIVE_MUSIC],
    type: GUIDE_TYPES.MUSIC,
    price: "€10+",
    description: "Popular concert hall and nightclub.",
    image:
      "https://31m9mhhbv2.ucarecd.net/df1f3f33-9e18-4a17-90d0-a5c2525c8c62/7392967620_a69f21766b_k11536x1024.jpg",
  },
  {
    title: "Shark Diving",
    location: "https://maps.app.goo.gl/ecv77Rp9SeWuUobn7",
    coordinates: { lat: 41.3768344, lng: 2.1819201 },
    price: "€300",
    link: "https://tickets-actividades.aquariumbcn.com/pass/1137305161",
    type: GUIDE_TYPES.FUN,
    tags: [],
    description: "Dive with sharks at the Barcelona Aquarium.",
    image:
      "https://31m9mhhbv2.ucarecd.net/3882636d-a689-41f5-b534-220083a5c39f/SUMERGETE_1.webp",
  },
  {
    title: "Skydiving",
    price: "€300",
    link: "https://saltamos.es/en/tandem-jump/",
    location: "https://maps.app.goo.gl/ToycpFwpXmxCbzqc8",
    coordinates: { lat: 41.7642059, lng: 1.8637557 },
    type: GUIDE_TYPES.ACTIVITY,
    tags: [],
    description: "Tandem parachute jump experience near Barcelona.",
    image:
      "https://31m9mhhbv2.ucarecd.net/ecfe5817-c605-4074-8723-483689b4bd89/tadnemskydiveparachuting.jpg",
  },
  {
    title: "Flyboarding",
    price: "€100 - €300",
    link: "https://www.jetscoot.com/es/flyboard.html",
    location: "https://maps.app.goo.gl/vjDxKdFFdrhHyDCA6",
    coordinates: { lat: 41.414329, lng: 2.226404 },
    type: GUIDE_TYPES.ACTIVITY,
    tags: [],
    description: "Fly on the surface of the water using a board and a jetpack.",
    image:
      "https://31m9mhhbv2.ucarecd.net/ba536978-55b1-40ea-b623-f6b23de098eb/PortForum_Barcelone_flyboard_JetScoot_wstvok",
  },
  {
    title: "Teatre Grec",
    type: GUIDE_TYPES.PLACE,
    location: "https://maps.app.goo.gl/xfbZv7BCyDtfdWbh6",
    coordinates: { lat: 41.3736855, lng: 2.1373983 },
    link: "https://www.barcelona.cat/grec/es",
    tags: [GUIDE_TAGS.LIVE_MUSIC, GUIDE_TAGS.NATURE],
    price: GUIDE_TAGS.FREE,
    description:
      "Open air theatre in Montjuïc constructed in 1929 to sit and enjoy the sun. You'll often find music, theatre, and dance performances here.",
    image:
      "https://31m9mhhbv2.ucarecd.net/34e34c2e-f8b4-4fbd-866d-8dedb4323406/teatregrec16249.jpg",
  },
  {
    title: "The Comedy Clubhouse",
    type: GUIDE_TYPES.FUN,
    price: "Donation",
    link: "https://thecomedyclubhouse.es/",
    tags: [],
    location: "https://maps.app.goo.gl/FyTwtgb4B9auaqaX9",
    coordinates: { lat: 41.3825194, lng: 2.181129 },
    description:
      "Stand-up comedy venue with regular shows in English and Spanish.",
    image:
      "https://31m9mhhbv2.ucarecd.net/8f697a80-b33a-4d6e-af85-a3c76deafcec/theexpatsmattwalsh.jpg",
  },
  {
    title: "Tibidabo Ice Rink",
    tags: [GUIDE_TAGS.WINTER],
    type: GUIDE_TYPES.ACTIVITY,
    description: "Seasonal outdoor ice-skating rink at Tibidabo.",
    link: "https://tibidabo.cat/en/events/ice-rink",
    price: "€5",
    location: "https://maps.app.goo.gl/VBNxWxDVfqHvUnTH7",
    coordinates: { lat: 41.4224994, lng: 2.118611 },
    image:
      "https://31m9mhhbv2.ucarecd.net/4a22b461-dd45-42b4-b387-25f21c95fbe1/Pistadegeldenit2_0.jpg",
  },
  {
    title: "Montserrat Abbey",
    type: GUIDE_TYPES.PLACE,
    tags: [GUIDE_TAGS.DAY_TRIP, GUIDE_TAGS.NATURE],
    location: "https://maps.app.goo.gl/5HpFHD5TyVWSXmVE9",
    coordinates: { lat: 41.5933378, lng: 1.5492335 },
    link: "https://tickets.montserratvisita.com",
    price: "€5 - €9",
    image:
      "https://31m9mhhbv2.ucarecd.net/cf3d9047-d419-47fa-a38a-4f7b54994b31/visita_montserrat.jpg",
    description:
      "Take a train to Monistrol de Montserrat and get a Cremallera to the abbey, and witness the best views of the surroundings. Getting the ticket to enter the Abbey is definitely optional.",
  },
  {
    title: "White Rabbit Museum",
    price: "€15",
    type: GUIDE_TYPES.PLACE,
    description:
      "A weird and unique museum showcasing contemporary art in Barcelona that you can interact with. They're not traditional and they self-describe themselve as an 'off-museum'.",
    tags: [],
    location: "https://maps.app.goo.gl/h5R6FTSrwzbnAkhg7",
    coordinates: { lat: 41.3923112, lng: 2.1642173 },
    link: "https://tickets.whiterabbit-theoffmuseum.com/en-ES/1283/7951?s=maps&f=nav&lang=en-ES",
    image:
      "https://31m9mhhbv2.ucarecd.net/d7b1620d-be85-4b57-9130-074ce07a895d/WhiteRabbit9_520x347.jpg",
  },
];
