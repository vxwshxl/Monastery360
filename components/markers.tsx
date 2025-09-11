const markers = [
  {
    id: 1,
    name: "Tashiding Monastery",
    location: "Gyalshing, Sikkim",
    rating: 4.98,
    image:
      "https://s7ap1.scene7.com/is/image/incredibleindia/spiritual-spots-in-pelling-popular?qlt=82&ts=1726655959297,3",
    coordinates: {
      latitude: 27.3083,
      longitude: 88.2981,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    },
    description:
      "Sacred monastery on a hilltop between the Rathong and Rangit rivers, considered the heart of Sikkimese Buddhism.",
    reviews: [
      {
        name: "Anjali Sharma",
        time: "2 weeks ago",
        review: "A serene and deeply spiritual place. The view from the monastery is breathtaking.",
      },
      {
        name: "Rahul Mehta",
        time: "1 month ago",
        review: "Very peaceful and well maintained. Felt truly connected with the culture.",
      },
    ],
  },
  {
    id: 2,
    name: "Rumtek Monastery",
    location: "Gangtok, Sikkim",
    rating: 4.94,
    image: "https://www.tourmyindia.com/states/sikkim/images/rumtek1.jpg",
    coordinates: {
      latitude: 27.33194,
      longitude: 88.60194,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    },
    description:
      "One of the largest and most important monasteries in Sikkim, seat of the Karmapa of the Karma Kagyu lineage.",
    reviews: [
      {
        name: "Priya Verma",
        time: "3 weeks ago",
        review: "Grand architecture and rich history. A must-visit when in Gangtok.",
      },
      {
        name: "Alex Johnson",
        time: "2 months ago",
        review: "Loved the intricate murals and peaceful surroundings.",
      },
      {
        name: "Karma Dorjee",
        time: "4 months ago",
        review: "A spiritual gem with strong cultural significance.",
      },
    ],
  },
  {
    id: 3,
    name: "Phodong Monastery",
    location: "North Sikkim",
    rating: 4.93,
    image:
      "https://s7ap1.scene7.com/is/image/incredibleindia/phodong-monastery-gangtok-sikkim-gangtok-1-musthead-hero?qlt=82&ts=1742153343325",
    coordinates: {
      latitude: 27.416786,
      longitude: 88.582944,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    },
    description:
      "Famous for vibrant murals and frescoes, this Kagyu monastery is one of the most beautiful in North Sikkim.",
    reviews: [
      {
        name: "Sneha Kapoor",
        time: "1 month ago",
        review: "Beautiful monastery with stunning artwork inside.",
      },
    ],
  },
  {
    id: 4,
    name: "Pemayangtse Monastery",
    location: "Gyalshing, Sikkim",
    rating: 4.98,
    image:
      "https://s7ap1.scene7.com/is/image/incredibleindia/pemayangtse-monastery-pelling-sikkim-2-attr-hero?qlt=82&ts=1726656027807,2",
    coordinates: {
      latitude: 27.3052133,
      longitude: 88.2515618,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    },
    description:
      "Founded in the 17th century, one of the oldest Nyingma monasteries, offering majestic views of Kanchenjunga.",
    reviews: [
      {
        name: "Rajesh Singh",
        time: "2 weeks ago",
        review: "Amazing monastery with a spectacular backdrop of the Himalayas.",
      },
      {
        name: "Emma Wilson",
        time: "5 weeks ago",
        review: "Peaceful environment, perfect for meditation.",
      },
    ],
  },
  {
    id: 5,
    name: "Enchey Monastery",
    location: "Gangtok, Sikkim",
    rating: 4.92,
    image:
      "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqP3F9YGd3Un753l_HAIIRCT-R69GBijnGuraAZ1JsJti9pKW8j5Hcs_hbnHTsS3g2wmFPu2kYw1JtzQZyvbhOMCyMbUjOGzVy0liZZInb4RhNo-LeLUoopWvrykdnej6xWN2Ne=s1360-w1360-h1020-rw",
    coordinates: {
      latitude: 27.33586,
      longitude: 88.6192,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    },
    description:
      "Peaceful monastery close to Gangtok, surrounded by pine forests, known for its annual Cham dance festival.",
    reviews: [
      {
        name: "Neha Gupta",
        time: "3 weeks ago",
        review: "A quiet and calming monastery. Loved the Cham dance festival!",
      },
    ],
  },
  {
    id: 6,
    name: "Ralang Monastery",
    location: "Ravangla, South Sikkim",
    rating: 4.90,
    image:
      "https://s3-ap-southeast-1.amazonaws.com/akbartravelsholidays/admin/thumbnail17181062443808gangtok.webp",
    coordinates: {
      latitude: 27.32856,
      longitude: 88.33478,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    },
    description:
      "Important Kagyu monastery, known for its colorful architecture and hosting the annual Pang Lhabsol festival.",
    reviews: [
      {
        name: "Sanjay Patel",
        time: "2 months ago",
        review: "Stunning colors and unique architecture. Worth the trip!",
      },
    ],
  },
  {
    id: 7,
    name: "Tsuklakhang Monastery",
    location: "Gangtok, Sikkim",
    rating: 4.91,
    image:
      "https://paramountclientweb.s3.ap-south-1.amazonaws.com/indian-holiday-trip/Place/2023/Apr/Img_7770_202303031046_Tsuk_la_khang_monastery.jpg",
    coordinates: {
      latitude: 27.326,
      longitude: 88.615,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    },
    description:
      "Also called the Royal Chapel, it was the main place of worship for Sikkim’s former monarchy.",
    reviews: [
      {
        name: "Meenakshi Iyer",
        time: "1 month ago",
        review: "Rich history and royal charm. Truly mesmerizing.",
      },
      {
        name: "David Lee",
        time: "6 months ago",
        review: "Loved the architecture and calmness of the place.",
      },
    ],
  },
  {
    id: 8,
    name: "Sanga Choeling Monastery",
    location: "Pelling, Sikkim",
    rating: 4.95,
    image:
      "https://www.finderbridge.com/imgs/experiences/explore-the-pelling-sky-walk-and-monastery/main.jpg",
    coordinates: {
      latitude: 27.297852,
      longitude: 88.222326,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    },
    description:
      "One of the oldest monasteries in Sikkim, accessible by a short trek, offering tranquility and mountain views.",
    reviews: [
      {
        name: "Akash Malhotra",
        time: "2 weeks ago",
        review: "The short trek was worth it. Very peaceful and scenic.",
      },
    ],
  },
  {
    id: 9,
    name: "Dubdi Monastery",
    location: "Yuksom, Sikkim",
    rating: 4.89,
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/f3/0e/56/caption.jpg?w=1200&h=1200&s=1",
    coordinates: {
      latitude: 27.366206,
      longitude: 88.230086,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    },
    description:
      "The oldest monastery in Sikkim, established in 1701; historically tied to the coronation of the first Chogyal.",
    reviews: [
      {
        name: "Lobsang Tsering",
        time: "3 months ago",
        review: "A historic monastery with strong spiritual vibes.",
      },
    ],
  },
  {
    id: 10,
    name: "Rinchenpong Monastery",
    location: "West Sikkim",
    rating: 4.87,
    image:
      "https://tripxl.com/blog/wp-content/uploads/2024/08/Pemayangtse-Monastery-4.jpg",
    coordinates: {
      latitude: 27.243277,
      longitude: 88.270857,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    },
    description:
      "A serene monastery offering panoramic views of the Himalayas, known for a special idol of Ati Buddha.",
    reviews: [
      {
        name: "Pooja Nair",
        time: "1 month ago",
        review: "The views of the Himalayas from here are simply amazing.",
      },
      {
        name: "Michael Brown",
        time: "2 months ago",
        review: "Small but peaceful monastery with great surroundings.",
      },
    ],
  },
];

export default markers;
