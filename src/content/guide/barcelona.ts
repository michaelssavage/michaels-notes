export interface TableItem {
  title: string;
  type: "Fun" | "Activity" | "Place" | "Music";
  link?: string;
  price?: string;
  location?: string;
  tags?: Array<
    | "Free"
    | "Expensive"
    | "Free 1st Sunday"
    | "Free after Saturday 3pm"
    | "Can't Miss"
    | "Winter"
    | "Day Trip"
  >;
  description?: string;
}

export const items: TableItem[] = [
  {
    title: "Aire Ancient Baths",
    location: "Passeig de Picasso, 22, Ciutat Vella, 08003 Barcelona",
    link: "https://relax.beaire.com/aire-ancient-baths-barcelona",
    price: "€100+",
    type: "Fun",
    description: "Thermal baths and spa experience in the old city.",
  },
  {
    title: "Aquarium de Barcelona",
    location:
      "del Port Vell, Moll d'Espanya, s/n, Ciutat Vella, 08039 Barcelona",
    link: "https://tickets.aquariumbcn.com/",
    price: "€14",
    type: "Fun",
    description: "Large aquarium with Mediterranean and tropical marine life.",
  },
  {
    title: "Axe Throwing",
    location: "Carrer de Trafalgar, 8, Ciutat Vella, 08010 Barcelona",
    link: "https://barcelonaaxethrowing.com/",
    price: "€19.50",
    type: "Activity",
    description: "Indoor axe-throwing games in the city centre.",
  },
  {
    title: "Basílica del Sagrat Cor Tibidabo",
    type: "Place",
    location:
      "The Temple Expiatori del Sagrat Cor, Ctra. de Vallvidrera al Tibidabo, 111, Distrito de Sarrià-Sant Gervasi, 08035 Barcelona",
    link: "https://tibidabo.salesianos.edu/",
  },
  {
    title: "Barcelona Botanical Garden",
    type: "Place",
    price: "€5",
    location: "Carrer Doctor Font i Quer, 2, Sants-Montjuïc, 08038 Barcelona",
    link: "https://museuciencies.cat/en/the-nat/venues/botanical-garden-of-barcelona",
    tags: ["Free 1st Sunday"],
    description:
      "Mediterranean plant garden; visit La Caseta del Migdia afterwards for sunrise.",
  },
  {
    title: "Barcelona Zoo",
    price: "€21.40",
    location: "Parc de la Ciutadella, Ciutat Vella, 08003 Barcelona",
    link: "https://zoobarcelona.cat/en/home",
    type: "Fun",
    description:
      "Mid-sized city zoo with a wide variety of animals in Parc de la Ciutadella including komodo dragons, hippos, giraffes, hyenas, elephants, lions, red pandas, penguins, orangutans",
  },
  {
    title: "Bewake Park",
    price: "€39 / 2 hours",
    location: "Av. del Canal Olímpic, 08860 Castelldefels, Barcelona",
    link: "https://bewakepark.com/",
    type: "Activity",
    description: "Cable wakeboarding and water sports park.",
  },
  {
    title: "Biblioteca Gabriel García Márquez",
    price: "Free",
    location: "Plaça Carmen Balcells Segalà, 1, 08020 Barcelona",
    link: "https://ajuntament.barcelona.cat/biblioteques/ca/bibgarciamarquez",
    type: "Place",
    description:
      "Public library designed by SUMA Arquitectura, and uses exposed wood and glass, creating a warm, modern environment. There’s a special comic section showcasing works by Francisco Ibáñez, a local comic artist, with a collection of 500 pieces.",
  },
  {
    title: "Bungee Jump",
    price: "€60 / 2 jumps",
    location: "Carrer de Sarriera, 58, 08720 Vilafranca del Penedès, Barcelona",
    link: "https://www.cataloniaadventures.com/puenting-catalunya/",
    type: "Activity",
    tags: ["Day Trip"],
    description:
      "Outdoor bungee jumping experience 130km outside of Barcelona. Experience a 30 meter jump above the river canyon, with a pendulum effect of up to 25 meters.",
  },
  {
    title: "Bunkers del Carmel",
    price: "Free",
    location: "Carrer de Marià Labèrnia, s/n, Horta-Guinardó, 08032 Barcelona",
    link: "https://www.barcelona.cat/museuhistoria/ca/patrimonis/els-espais-del-museu/turo-de-la-rovira",
    type: "Place",
    description:
      "MUHBA Turó de la Rovira offers panoramic views of Barcelona from Spanish Civil War bunkers where anti-aircraft guns were installed.",
  },
  {
    title: "CaixaForum",
    price: "€6",
    type: "Place",
    description: "Cultural centre with art exhibitions and events.",
  },
  {
    title: "CaixaForum",
    price: "€6",
    type: "Place",
    location:
      "Av. de Francesc Ferrer i Guàrdia, 6-8, Sants-Montjuïc, 08038 Barcelona",
    link: "https://caixaforum.org/es/barcelona",
    description: "Cultural centre with art exhibitions and events.",
  },
  {
    title: "Ceramics & Wine",
    price: "€25",
    link: "https://www.groupon.es/deals/tiwona-taller-de-ceramica-barcelona-workshops-coworking",
    type: "Fun",
    description: "Pottery workshop combined with wine tasting.",
  },
  {
    title: "Cable Car to Montjuïc",
    type: "Activity",
    description: "Scenic cable car ride up to Montjuïc Hill.",
  },
  {
    title: "Ciutadella Park",
    type: "Place",
  },
  {
    title: "CosmoCaixa",
    type: "Place",
    price: "€8",
    location: "Carrer d'Isaac Newton, 26, Sarrià-Sant Gervasi, 08022 Barcelona",
    link: "https://cosmocaixa.org/es/cosmocaixa-barcelona",
    description:
      "Interactive science museum with exhibitions and a planetarium.",
  },
  {
    title: "Comedy Clubhouse",
    type: "Fun",
    description:
      "Stand-up comedy venue with regular shows in English and Spanish.",
  },
  {
    title: "Museu del Disseny de Barcelona",
    price: "€6.20",
    tags: ["Free 1st Sunday"],
    location: "Plaça de les Glòries Catalanes, 37, Sant Martí, 08018 Barcelona",
    link: "https://www.dissenyhub.barcelona/",
    type: "Place",
    description: "Museum dedicated to design, fashion, and decorative arts.",
  },
  {
    title: "Dr. Flow Bar",
    location: "Carrer dels Vigatans, 8, Ciutat Vella, 08003 Barcelona",
    link: "https://www.drflow.es/programacion/",
    type: "Music",
    description: "Live music venue located in El Born.",
  },
  {
    title: "Flamenco Show",
    type: "Fun",
    description: "Traditional Spanish dance and music performance.",
  },
  {
    title: "Flotarium",
    price: "€75 for 2 people",
    link: "https://www.flotarium.com/tienda/",
    type: "Fun",
    description: "Sensory deprivation floatation tank experience.",
  },
  {
    title: "Fundació Joan Miró",
    price: "€9",
    location: "Parc de Montjuïc, s/n, Sants-Montjuïc, 08038 Barcelona",
    link: "https://www.fmirobcn.org/",
    type: "Fun",
    description:
      "Showcase of Joan Miro's modern, colorful artworks in hilltop museum with courtyards and terraces.",
  },
  {
    title: "Mirador Torre Glòries",
    price: "€18",
    type: "Place",
    location: "Av. Diagonal, 209, Sant Martí, 08018 Barcelona",
    link: "https://www.miradortorreglories.com/planifica-tu-visita/comprar-entradas/",
    description: "Modern skyscraper also known as Torre Glòries.",
  },
  {
    title: "Jazz at 23 Robadores",
    type: "Fun",
    description: "Intimate bar offering live jazz music.",
  },
  {
    title: "Labyrinth Park of Horta",
    type: "Place",
    description: "Historical garden with a maze and romantic architecture.",
  },
  {
    title: "MACBA",
    type: "Activity",
    price: "€10,80",
    description:
      "Museu d'Art Contemporani de Barcelona has built a collection of over 5,000 works, concentrating on post-1945 Catalan and Spanish art, while also including international pieces.",
    link: "https://www.macba.cat",
  },
  {
    title: "Montjuic Fortress",
    tags: ["Free 1st Sunday"],
    type: "Place",
    description: "Historic fortress with city views at the top of Montjuïc.",
  },
  {
    title: "Museu Nacional d'Art de Catalunya",
    price: "€12",
    type: "Place",
    location:
      "Palau Nacional, Parc de Montjuïc, s/n, Sants-Montjuïc, 08038 Barcelona",
    link: "https://www.mnac.cat/",
    tags: ["Free 1st Sunday", "Free after Saturday 3pm"],
  },
  {
    title: "Nau Bostik",
    type: "Place",
    location: "Carrer Ferran Turné, 1-11, Sant Andreu, 08027 Barcelona",
    link: "https://naubostik.com/",
  },
  {
    title: "Observatori Fabra de Barcelona",
    tags: ["Free 1st Sunday"],
    type: "Place",
    description:
      "Historic astronomical observatory offering tours and stargazing.",
  },
  {
    title: "Padel",
    location: "Playtomic app",
    type: "Activity",
    description: "Book and play padel matches using the Playtomic app.",
  },
  {
    title: "Palau Martorell",
    type: "Place",
    description: "Exhibition hall hosting art and cultural events.",
  },
  { title: "Palo Alto", type: "Fun" },
  {
    title: "Razzmatazz",
    location: "Poble Nou",
    type: "Music",
    description: "Large music venue and nightclub in Poble Nou.",
  },
  {
    title: "Recinte Modernista de Sant Pau",
    type: "Place",
    description: "Modernist hospital complex and UNESCO World Heritage site.",
  },
  {
    title: "Rouge",
    location: "Poble Sec",
    type: "Music",
    description: "Live music bar in Poble Sec.",
  },
  {
    title: "Sabda",
    type: "Fun",
    description: "Immersive yoga and relaxation space.",
  },
  {
    title: "Sagrada Familia",
    price: "€26-€36",
    type: "Place",
    description: "Gaudí's world-famous unfinished basilica.",
  },
  {
    title: "Sailing Experience BCN",
    link: "https://www.instagram.com/sailingexperiencebarcelona/",
    type: "Activity",
    description: "Guided sailing trips along Barcelona's coast.",
  },
  {
    title: "Sala Apolo",
    location: "Sants-Montjuïc",
    type: "Music",
    description: "Popular concert hall and nightclub.",
  },
  {
    title: "Sala Upload",
    location: "Montjuic",
    link: "https://sala-upload.com/",
    type: "Music",
    description: "Live music venue in Montjuïc.",
  },
  {
    title: "Shark Diving",
    location:
      "del Port Vell, Moll d'Espanya, s/n, Ciutat Vella, 08039 Barcelona",
    price: "€300",
    link: "https://tickets-actividades.aquariumbcn.com/pass/1137305161",
    type: "Fun",
    description: "Dive with sharks at the Barcelona Aquarium.",
  },
  {
    title: "Skydiving",
    price: "€300",
    link: "https://saltamos.es/en/tandem-jump/",
    type: "Activity",
    description: "Tandem parachute jump experience near Barcelona.",
  },
  {
    title: "Soccer",
    location: "Celebreak app",
    type: "Activity",
    description: "Casual football matches organised through Celebreak.",
  },
  {
    title: "Stereo 18",
    location: "Born",
    type: "Music",
    description: "Live music bar in El Born.",
  },
  {
    title: "Teatre Grec",
    type: "Place",
  },
  {
    title: "Tibidabo Ice Rink",
    tags: ["Winter"],
    type: "Activity",
    description: "Seasonal outdoor ice-skating rink at Tibidabo.",
  },
  {
    title: "White Rabbit Museum",
    price: "€25",
    type: "Place",
    description: "Museum showcasing contemporary art.",
  },
];
