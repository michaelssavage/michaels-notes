const categories = [
  "accessories",
  "beauty",
  "books",
  "clothes",
  "experience",
  "food & drink",
  "football",
  "fragrance",
  "games",
  "home",
  "jewellery",
  "kitchen",
  "shoes",
  "subscription",
  "tech",
  "travel",
] as const;

type Category = (typeof categories)[number];

const categoryOptions = categories.map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

type Idea = {
  name: string;
  category: Category;
  link: string;
  image: string;
  price: string;
  description: string;
};

const ideas: Idea[] = [
  {
    name: "Chipolo Tag",
    category: "tech",
    link: "https://chipolo.net/en/",
    price: "From €35",
    description: "lost item tracker for keys, wallets, luggage, etc.",
    image:
      "https://chipolo.net/imager/images/image-gallery/4478387/Library-6_2026-04-15-074011_xeyu_6c0c164bd2b597ee32b68b8b5755bd2e_4c518697e26d9f96181216f439058c98.avif",
  },
  {
    name: "Silver Ring Workshop",
    category: "experience",
    link: "https://silverworkshopbarcelona.com/",
    price: "€95",
    image:
      "https://silverworkshopbarcelona.com/cdn/shop/files/IMG_9071.jpg?v=1763999823&width=1646",
    description:
      "Barcelona: Make your own silver ring with textures and stamps",
  },
  {
    name: "Seventy Spa",
    category: "experience",
    link: "https://seventyspa.com/en/massages/",
    price: "€275",
    image:
      "https://seventyspa.com/wp-content/uploads/2019/10/SEVENTY-SPA-4588.jpg",
    description:
      "Barcelona: 50 min couple massage: relaxing, deep tissue, sports, followed by 30 minutes in the water zone.",
  },
  {
    name: "Amfibis Ballarucs t-shirt",
    category: "clothes",
    link: "https://souaritaller.com/producto/amfibis-ballarucs/",
    price: "€28",
    image:
      "https://souaritaller.com/wp-content/uploads/2025/10/photo_2024-12-05_13-36-51-e1733593047193.jpg",
    description: "Catalan ACAB t-shirt: Catalan group of dancing amphibians",
  },
  {
    name: "Nutribullet Air Fryer",
    category: "kitchen",
    link: "https://dam.delonghi.com/902x902/assets/320446",
    image: "https://dam.delonghi.com/902x902/assets/320446",
    price: "€80",
    description: "Air fryer with 6L capacity and 1700W power.",
  },
  {
    name: "Nothing CMF Watch 3 Pro",
    category: "tech",
    link: "https://es.nothing.tech/products/cmf-watch-3-pro?Color=Light+Green",
    image:
      "https://cdn.sanity.io/images/gtd4w1cq/production/7f9d33d506dfa4fc2d0c16ac02889b674e99468d-864x864.jpg?auto=format",
    price: "From €70",
    description: "Good budget sports watch for Android/Apple users.",
  },
  {
    name: "Bali Spirit Couples Ritual",
    category: "experience",
    link: "https://balispirit.es/rituales-con-bano-para-parejas-en-barcelona/",
    price: "€200",
    image: "https://balispirit.es/wp-content/uploads/2026/06/Tailor-Made.webp",
    description:
      "Barcelona: 1hr 30 partner massage in a luxury art spa. Named best spa concept in 2024",
  },
  {
    name: "Puff chair",
    category: "home",
    link: "https://www.mipuf.es/puffs/pera",
    price: "From €85",
    image: "https://www.mipuf.es/475098-large_default/pera-super.jpg",
    description: "Comfy puff chair for watching TV or reading a book.",
  },
  {
    name: "Ducks: Two Years in the Oil Sands",
    category: "books",
    link: "https://topatoco.com/collections/kate-beaton/products/beat-ducks-bk",
    price: "€36",
    image:
      "https://topatoco.com/cdn/shop/products/beat-ducks-bk2_1512x1512.jpg?v=1663019486",
    description:
      "Autobiographical comic by Canadian cartoonist Kate Beaton about working in the Athabasca oil sands in Alberta to pay off her student loans.",
  },
  {
    name: "Hark! A Vagrant",
    category: "books",
    link: "https://topatoco.com/collections/kate-beaton/products/beat-hark-book",
    price: "€20",
    image:
      "https://topatoco.com/cdn/shop/products/beat-hark-book_1512x1512.jpg?v=1571448927",
    description:
      "This book discusses historical and literary topics in a comedic tone and is drawn in black and white.",
  },
  {
    name: "Zara Bohemian Oud",
    category: "fragrance",
    link: "https://www.zara.com/es/en/bohemian-oud-edp-80-ml---2-71-oz-p20110384.html",
    price: "€25",
    image:
      "https://static.zara.net/assets/public/078a/04d8/daea4b8cbdc6/752321519a7c/20110384999-e20/20110384999-e20.jpg?ts=1784893355071&w=3400",
    description:
      "80ml perfume: Amber leather fragrance with notes of Incense, Cocoa, and Oud.",
  },
  {
    name: "Lenovo Legion Gaming Laptop",
    category: "tech",
    link: "https://www.lenovo.com/es/es/c/laptops/legion-laptops/",
    price: "From €1800",
    image:
      "https://p2-ofp.static.pub//fes/cms/2026/02/19/pefbtfoehmffxvixifzup6dbdc4a10342792.png?width=584&height=584",
    description: "High-end gaming laptop with 16GB RAM and 1TB SSD.",
  },
  {
    name: "Jameson Caskmates",
    category: "food & drink",
    link: "https://winepalace.es/en/whisky/jameson-caskmates",
    image:
      "https://alregi.es/pub/Images/Articulos/Web/024618___W-IRISH-JAMESON-STOUT-CAS___5929.webp",
    price: "€30",
    description: "Irish whiskey with a hint of stout.",
  },
  {
    name: "Single Batch Irish Cream Liqueur Five Farms",
    category: "food & drink",
    link: "https://www.vinello.es/single-batch-irish-cream-liqueur-five-farms-",
    image:
      "https://www.vinello.es/media/image/2a/10/67/single-batch-irish-cream-liqueur-five-farms_600x600@2x.webp",
    price: "€30",
    description: "Irish cream liqueur with a hint of cream.",
  },
  {
    name: "Dr Martens Reeder",
    category: "shoes",
    link: "https://www.drmartens.com/es/es/zapatos-utilitarios-reeder-de-piel-wyoming-negro/p/27104001",
    price: "€110",
    image:
      "https://cdn.media.amplience.net/i/drmartens/NX_27104001.80?w=1080&qlt=80&fmt=auto&sm=center&upscale=false",
    description: "Black leather boots with a brown sole.",
  },
  {
    name: "Letterboxd Pro",
    category: "subscription",
    link: "https://letterboxd.com/pro/",
    price: "€21",
    image: "https://a.ltrbxd.com/logos/letterboxd-logo-v-neg-rgb-1000px.png",
    description:
      "Yearly Letterboxd subscription: no ads, stats page, notifications, etc.",
  },
  {
    name: "Retro football shirts",
    category: "football",
    link: "https://m.messi111.com/Retro-c865892.html",
    price: "€25",
    image:
      "https://ssl.images-ssl-mars.com/96617/2023/02/06/a/8/a86d1757ee48574c.jpg?x-oss-process=image/quality,Q_90/auto-orient,1/resize,m_lfit,w_1500,h_1500/format,webp",
    description: "Retro jerseys - they're fake but they're pretty cool.",
  },
  {
    name: "Manchester United Terrace Icons shorts",
    category: "football",
    link: "https://store.manutd.com/en/p/manchester-united-x-adidas-mens-terrace-icons-shorts-black-3353",
    price: "€30",
    image:
      "https://mufc-live.cdn.scayle.cloud/images/147c0b9a0c4d476e5aff5dc034889990.jpg?brightness=1&width=922&height=1230&quality=70&bg=ffffff",
    description: "Black shorts with Manchester United logo.",
  },
  {
    name: "Grow Old t-shirt: Mirage Pirate Black",
    category: "clothes",
    link: "https://growoldbcn.com/products/camiseta-mirage-ss-pirate-black",
    price: "€40",
    image:
      "https://growoldbcn.com/cdn/shop/files/evyzt00338_rvca_f_ptk_bck1.jpg?v=1773765485&width=1445",
    description: "Black shirt with Grow Old logo.",
  },
  {
    name: "Merrell Speedarc Matis Leather Waterproof",
    category: "shoes",
    link: "https://www.merrell.com/ES/es_ES/speedarc-matis-leather-waterproof/61360M.html",
    price: "€200",
    image:
      "https://thekit.wolverineworldwide.com/match/media_lookup/MRLM-J00005535-091525-F26-000/?preset=dw-pdp-primary",
    description: "Hiking Gorpcore shoes",
  },
  {
    name: "Bitchy Catalana t-shirt",
    category: "clothes",
    link: "https://souaritaller.com/producto/samarreta-bitchy-catalana/",
    price: "€30",
    image:
      "https://souaritaller.com/wp-content/uploads/2025/10/BITCHY-ESQUENA-TEXTURA-1920x2400-1.jpg",
    description: "Catalan t-shirt based on the sparkling water Vichy Catalana.",
  },
  {
    name: "Bali Spirit Deep Tissue Massage",
    category: "experience",
    link: "https://balispirit.es/masajes-en-pareja-en-barcelona/",
    price: "€90 each",
    image: "https://balispirit.es/wp-content/uploads/2023/01/masaje-JAVA.webp",
    description: "Barcelona: 1hr deep tissue massage in a luxury art spa.",
  },
  {
    name: "A Claddagh Ring",
    category: "jewellery",
    link: "https://claddaghring.ie/",
    price: "From €100",
    image:
      "https://claddaghring.ie/cdn/shop/products/14ct-yellow-100-year-claddagh-ring.jpg?v=1784216487&width=1206",
    description: "A silver or gold Claddagh Ring with a marble heart.",
  },
  {
    name: "P&Co Long Road boxy t-shirt",
    category: "clothes",
    link: "https://pand.co/en-eu/collections/mens-sale/products/long-road-boxy-t-shirt-bone",
    image:
      "https://pand.co/cdn/shop/files/mensdrop4ecom_0080_LEONSPRING4ECOM-844.jpg?crop=center&v=1774470190&width=5760",
    price: "€40",
    description:
      "Long Road T-shirt in bone is a men's boxy-fit tee made from mid-weight organic cotton.",
  },
  {
    name: "140W Fast Charging Cables",
    category: "tech",
    link: "https://es.creative.com/p/speakers/creative-140w-fast-charging-cable",
    price: "€20",
    image:
      "https://img.creative.com/images/products/large/pdt_24250.png?width=200&height=200",
    description: "A solid charging cable for your phone, laptop, etc.",
  },
  {
    name: "Ipswich Town FC 26/27 away jersey",
    category: "football",
    link: "https://shop.itfc.co.uk/products/2627-adult-away-shirt-ss-n-a?variant=56855952294268&cs=76426510627&type=none&pcidx=0&pName=&pNumber=-&pProducts=&badges=",
    price: "€70",
    description: "Ipswich Town FC away jersey for the 2026/2027 season.",
    image:
      "https://shop.itfc.co.uk/cdn/shop/files/AwayShirtSS_e2abf57b-d854-4158-96c8-72449fb4cd97.jpg?v=1783073930&width=1346",
  },
  {
    name: "Power bank",
    category: "tech",
    link: "https://www.anker.com/eu-en/collections/power-banks",
    price: "€20",
    image:
      "https://cdn.shopify.com/s/files/1/0595/4034/0926/files/A1383011-F0_A1383H11_Product_Image_3e2b7060-efb8-4273-8614-bdfde0a72c62.png?v=1756093920&width=1600",
    description: "Fast-charging power bank for your phone, laptop, etc.",
  },
  {
    name: "The Legend of Zelda: Tears of the Kingdom",
    category: "games",
    link: "https://www.game.es/videojuegos/aventura/nintendo-switch/the-legend-of-zelda-tears-of-the-kingdom-seminuevo-nintendo-switch/219082",
    price: "€50",
    image: "https://media.game.es/COVERV2/3D_L/219/219082.png",
    description:
      "Get a new game for the Nintendo Switch or whatever console you have.",
  },
  {
    name: "Large Magnetic Whiteboard",
    category: "home",
    link: "https://www.amazon.com/Amazon-Basics-magn%C3%A9tica-aluminio-bol%C3%ADgrafos/dp/B077TD1JRS/ref=sr_1_7?dib=eyJ2IjoiMSJ9.-TZl65A81Y4GfwnuUZCdcPGSDMMrxeUdh2SqbwSWpUJEOxmvQVKageyao6-HQiNi1HFLV_PBWLD7ivMUB-6jVDYPdBv_KsGhhv1L9Q-JadBPDeQCdA-Rpe0N5SAv1Jm0TefRM5t5Y7QI1e12dWV6rtCY4PF93VbFsvDQLDlTqW9aSgNozn6NGIiviLUqDq-RGoCOH5Uo8EYzRSTfzizDHz5tHOH1zxI0KZNXDF3dHPdY7Zkl3TCKJK0xcQ9XE93ejujgfUfbc8PO7v6in_R3aDz-_sDrC5z1CcegtpItPqs.pSPITUvs75dxGIq4s4x8tbz2EB4BCmU8XZmC6tx8tK0&dib_tag=se&keywords=large%2Bwhite%2Bboard&qid=1791816485&sr=8-7&language=es_US&currency=EUR&th=1",
    price: "€40",
    image: "https://m.media-amazon.com/images/I/51SsRYxG9tL._AC_SX679_.jpg",
    description: "Wall mountable magnetic whiteboard for your office or home.",
  },
  {
    name: "Professional Hair Dryer",
    category: "beauty",
    link: "https://www.ghdhair.com/hair-dryers/ghd-black-helios-p-497",
    price: "€220",
    image:
      "https://amplience.ghdhair.com/i/ghd/497_helios_black_Gallery_Image_2_v2_UK?$ProductImageGalleryDesktop$&fmt=auto",
    description: "Save headaches by getting a professional hair dryer.",
  },
  {
    name: "Jamie Oliver Steel Knife Set",
    category: "kitchen",
    link: "https://www.johnlewis.com/jamie-oliver-by-tefal-stainless-steel-knife-set-3-piece/p6357659",
    price: "€50",
    image:
      "https://media.johnlewiscontent.com/i/JohnLewis/109122147?fmt=auto&$background-off-white$&$rsp-pdp-port-640$",
    description: "A set of 3 stainless steel knives for your kitchen.",
  },
  {
    name: "Ottolenghi Cookbook & Tableware",
    category: "kitchen",
    link: "https://ottolenghi.co.uk/products/simple-cookbook",
    price: "€30",
    image:
      "https://ottolenghi.co.uk/cdn/shop/files/Simple_Hardback_Standing_Extrashadow.png?v=1771258353&width=1200",
    description:
      "Creative cooking that isn't overcomplicated. Each dish is categorised according to the Simple key, helping you to choose the best recipe.",
  },
  {
    name: "TokyoTreat",
    category: "food & drink",
    link: "https://tokyotreat.com",
    price: "From €40",
    image:
      "https://tokyotreat.com/cdn/prismic?path=https://images.prismic.io/tokyotreat/ZpC74R5LeNNTxFRt_5_Pricing_Image-gallery_Toy.png?auto=enhance&rect=0,84,1248,1080&w=832&h=720",
    description:
      "Subscription of Japanese bites and snacks from 1 to 12 months",
  },
  {
    name: "Leather Passport Cover",
    category: "accessories",
    link: "https://www.aspinaloflondon.com/travel/passport-covers",
    price: "From €100",
    image:
      "https://assets.aspinaloflondon.com/cdn-cgi/image/fit=crop%2cformat=auto%2cquality=85%2cwidth=1300%2cheight=1300/images/original/337780-062-0453-105500001.jpg",
    description: "A stylish passport cover for your travels.",
  },
  {
    name: "Trip to Reykjavik, Iceland",
    category: "travel",
    link: "https://www.re.is/",
    price: "From €500",
    image:
      "https://images.ctfassets.net/a68ipajj4t9l/4tvUtlk1qWOKHIRTE2n4o0/d2a9b5f31568518f4ba535dc99fefc9d/Northern_Lights_Iceland_-_header-6.jpg?w=1920&h=1280&q=60&fm=webp",
    description:
      "Go on a once in a lifetime trip to Iceland to see the Northern Lights and a blue lagoon.",
  },
  {
    name: "Ajinomoto MSG",
    category: "food & drink",
    link: "https://www.amazon.es/Askshy-Glutamato-Monos%C3%B3dico-200gr-Potenciador/dp/B01D1RAZPS/ref=sr_1_4?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=39GY3P0AP5KD1&dib=eyJ2IjoiMSJ9.SEUwVVLNyM7qP1O8YvFVFh3TOXhOji9b-oZPm3oQBtH1yCwiuLBKAMaz9E0ppH0ls0bCXMrSQGYlpVsJqyaO0v4E3nw5tygVGrwO0Nlfz-4uwz8M372HGMRpCyDftq4FRlzXrArFVLSn-3PiwiKbUw.D57E-9qJZmyvramOlkS58wZCgph7HyCH5qSDSqnsth0&dib_tag=se&keywords=msg&qid=1791818034&sprefix=m%2Caps%2C740&sr=8-4&th=1",
    price: "€5",
    image: "https://m.media-amazon.com/images/I/61a+oM3c3ML._AC_SX679_.jpg",
    description: "The addictive seasoning that makes everything taste better.",
  },
  {
    name: "Car vacuum cleaner",
    category: "home",
    link: "https://casalstools.es/en/products/car-vacuum-cleaner-vac100",
    price: "€40",
    image:
      "https://casalstools.es/cdn/shop/files/vac100-01.jpg?v=1683550420&width=990",
    description: "A portable vacuum cleaner for your car.",
  },
  {
    name: "Brew Cork Glass Cup",
    category: "kitchen",
    link: "https://eu.keepcup.com/products/brew-cork-s-8oz-moonlight?variant=51110637076772&oc=ES",
    price: "€26",
    image:
      "https://eu.keepcup.com/cdn/shop/files/Brew-Cork_Moonlight_S_8oz_Ecom_1000px_632f5812-efd8-487c-8b59-3e959179bacd.png?v=1758952643&width=1000",
    description:
      "Tempered glass with a natural cork band. Clean taste, warm grip, splashproof lid. Sized for espresso, cortado and the daily flat white. Refill, repeat",
  },
  {
    name: "By the Fireplace perfume",
    category: "fragrance",
    link: "https://www.sephora.es/p/replica-by-the-fireplace---eau-de-toilette-P3387007.html",
    image:
      "https://media.sephora.eu/content/dam/gdam/europe/digital/pim/published/M/MAISON_MARGIELA/536393/230250-media_swatch.jpg?scaleWidth=750&scaleHeight=750&scaleMode=fit",
    price: "€80",
    description:
      "100ml burning wood and chestnut fragrance by Maison Margiela.",
  },
  {
    name: "Cowboy Hat Incense Holder",
    category: "home",
    link: "https://www.ajouterstore.com/en-es/collections/incense-holders-and-sticks-cones/products/cowboy-hat-ceramic-incense-holder",
    price: "€16",
    image:
      "https://www.ajouterstore.com/cdn/shop/files/DSCF6808_1080x.jpg?v=1686238211",
    description: "Get some nice incense and a cute holder for it.",
  },
  {
    name: "Spa Grums",
    category: "experience",
    link: "https://spagrums.es/categories/spa/",
    price: "From €20",
    image:
      "https://static.spalopia.app/cf122791-ba7d-51e8-be84-0a61893566ef/s3fs-public/rfh-spa-treatments/ig_1-218.jpg",
    description:
      "Barcelona: General admission to the spa, sauna, steam room, jacuzzi for 50 minutes.",
  },
  {
    name: "Tamara Shopsin & Jason Fulford - OFFLINE ACTIVITIES",
    category: "books",
    link: "https://www.perimeterbooks.com/products/tamara-shopsin-jason-fulford-offline-activites",
    price: "€22",
    image:
      "https://www.perimeterbooks.com/cdn/shop/products/IMG_3740_1080x.jpg?v=1589260259",
    description:
      "Do one of these activities every week for a year and see what happens.",
  },
  {
    name: "Travel Gift Card",
    category: "travel",
    link: "https://travelgiftcard.lastminute.com/",
    image:
      "https://media.staticroot.com/DAM/Co-Marketing/E-commerce/LMN/UK/Hero/Hero_desktop_UK.png",
    price: "From €50",
    description: "A gift card for a travel experience with Last Minute.",
  },
  {
    name: "Smart LED light bulbs",
    category: "tech",
    link: "https://www.philips-hue.com/en-gb/p/hue-white-and-colour-ambiance-essential-a60-b22-smart-bulb-806-lm-8w-2-pack/8721103063410",
    price: "€40",
    image:
      "https://www.assets.signify.com/is/image/Signify/8721103063410-929004269602-Hue-Essential-WCA-806-A60-B22-2P-UK-RTP?wid=1280&hei=960&qlt=82",
    description: "Smart LED light bulbs for your home. ",
  },
  {
    name: "Kindle Paperwhite",
    category: "tech",
    link: "https://www.amazon.es/kindle-paperwhite-2024/dp/B0CFPXBJ9Y",
    price: "€210",
    image: "https://m.media-amazon.com/images/I/51WsaPjqQTL._AC_SX679_.jpg",
    description: "Read e-books on the go with the lightest Kindle.",
  },
  {
    name: "Matcha set",
    category: "kitchen",
    link: "https://www.elcorteingles.es/hogar/A50525173-2401907168394-pr-set-de-te-matcha-el-corte-ingles-natural/",
    price: "€36",
    image:
      "https://dam.elcorteingles.es/producto/www-001007321593548-01.jpg?impolicy=frontWeb&width=1200",
    description:
      "Wooden spoon, bamboo stick, and matcha bowl for your tea time.",
  },
  {
    name: "Tom Ford Ombré Leather",
    category: "fragrance",
    link: "https://www.druni.es/ombre-leather-tom-ford-eau-parfum-hombre",
    price: "€140",
    image:
      "https://www.druni.es/media/catalog/product/1/6/1632105.jpg?quality=80&fit=bounds&height=750&width=750&canvas=750:750",
    description:
      "Men's 100ml perfume with notes of Cardamomo, Saffron, Jasmine Sambac.",
  },
  {
    name: "Aire Ancient Baths",
    category: "experience",
    link: "https://beaire.com/en/aire-ancient-baths-barcelona/experiences/argan-nourishing-ritual-30",
    price: "From €128",
    image: "https://cdn.beaire.com/back/uploads/2026/09/1.1788779547.webp",
    description:
      "Barcelona: A hydrating experience with a 30-minute body massage using argan oil and thermal bath.",
  },
];

type Website = {
  name: string;
  category: Category;
  url: string;
  description: string;
};

const websites: Website[] = [
  {
    name: "Seven Store",
    category: "clothes",
    url: "https://www.sevenstore.com/",
    description: "clothes",
  },
  {
    name: "Nude Project",
    category: "clothes",
    url: "https://nude-project.com",
    description: "clothes",
  },
  {
    name: "Blacksmith Store",
    category: "clothes",
    url: "https://www.blacksmith-store.com/",
    description: "jumpers",
  },
  {
    name: "Create Store",
    category: "kitchen",
    url: "https://create-store.com",
    description: "crockery",
  },
  {
    name: "Kaotiko",
    category: "clothes",
    url: "https://www.kaotikobcn.com/",
    description: "shoes / tops",
  },
  {
    name: "Twothirds",
    category: "clothes",
    url: "https://Twothirds.com",
    description: "scandinavian tops",
  },
  {
    name: "Fleek Brand",
    category: "clothes",
    url: "https://fleekbrand.com",
    description: "oversized tees",
  },
  {
    name: "Flamingos Life",
    category: "shoes",
    url: "https://flamingoslife.com",
    description: "portuguese shoes",
  },
  {
    name: "Hobibear",
    category: "shoes",
    url: "https://hobibear.es",
    description: "shoes",
  },
  {
    name: "Grow Old",
    category: "clothes",
    url: "https://growoldbcn.com/",
    description: "portuguese tops",
  },
  {
    name: "Ementas B",
    category: "clothes",
    url: "https://ementasb.com/",
    description: "portuguese tops",
  },
  {
    name: "Vasha",
    category: "clothes",
    url: "https://vasha.live",
    description: "catalan tops",
  },
  {
    name: "Casa Pampa",
    category: "clothes",
    url: "https://casapampa.com",
    description: "portuguese tops",
  },
  {
    name: "Posthog",
    category: "clothes",
    url: "https://posthog.com/merch",
    description: "merch",
  },
  {
    name: "Hollister",
    category: "clothes",
    url: "https://hollister.com",
    description: "clothes",
  },
  {
    name: "P&Co",
    category: "clothes",
    url: "https://pand.co/",
    description: "clothes",
  },
  {
    name: "Beetle Moses",
    category: "books",
    url: "https://beetlemoses.bigcartel.com/",
    description: "comic strips",
  },
  {
    name: "Patagonia",
    category: "clothes",
    url: "https://www.patagonia.com/home/",
    description: "clothes",
  },

  {
    name: "Afends",
    category: "food & drink",
    url: "https://afends.com/",
    description: "Australian lifestyle brand",
  },

  {
    name: "G Adventures",
    category: "travel",
    url: "https://www.gadventures.com/",
    description: "travel groups",
  },

  {
    name: "Last Minute",
    category: "travel",
    url: "https://www.lastminute.com/",
    description: "cheap travel packages",
  },

  {
    name: "Sunny Souls",
    category: "clothes",
    url: "https://sunnysouls.ie/",
    description: "Marino wool gilets",
  },
];

export { Category, categoryOptions, Idea, ideas, websites };
