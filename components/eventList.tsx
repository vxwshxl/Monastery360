const eventList = [
    {
      id: 1,
      name: "Losar Festival",
      location: "Gangtok, Sikkim",
      category: ["Festival", "Cultural", "Religious"],
      date: "February 10-12, 2024",
      duration: 3,
      type: "Annual Festival",
      image: "https://s7ap1.scene7.com/is/image/incredibleindia/spiritual-spots-in-pelling-popular?qlt=82&ts=1726655959297,3",
      coordinates: {
        latitude: 27.3389,
        longitude: 88.6065,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
      description: "Tibetan New Year celebration with traditional dances, prayers, and cultural performances throughout Sikkim.",
      highlights: ["Traditional Cham Dance", "Monastery Prayers", "Local Cuisine", "Cultural Processions"],
      ticketPrice: "Free",
      organizer: "Government of Sikkim & Buddhist Monasteries",
      contactInfo: {
        phone: "+91-3592-202362",
        email: "tourism.sikkim@gov.in"
      },
      venue: "Multiple locations across Gangtok"
    },
    {
      id: 2,
      name: "Pang Lhabsol Festival",
      location: "Rumtek Monastery, Gangtok",
      category: ["Festival", "Religious", "Cultural"],
      date: "September 15-17, 2024",
      duration: 3,
      type: "Religious Festival",
      image: "https://www.tourmyindia.com/states/sikkim/images/rumtek1.jpg",
      coordinates: {
        latitude: 27.33194,
        longitude: 88.60194,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
      description: "Sacred festival dedicated to Mount Kanchenjunga, featuring masked dances and religious ceremonies.",
      highlights: ["Chaam Dance", "Warrior Dances", "Mount Kanchenjunga Worship", "Traditional Music"],
      ticketPrice: "Free",
      organizer: "Rumtek Monastery",
      contactInfo: {
        phone: "+91-3592-252575",
        email: "rumtek.monastery@gmail.com"
      },
      venue: "Rumtek Monastery Courtyard"
    },
    {
      id: 3,
      name: "Sikkim Food & Culture Festival",
      location: "MG Marg, Gangtok",
      category: ["Food", "Cultural", "Tourism"],
      date: "December 20-25, 2024",
      duration: 6,
      type: "Food Festival",
      image: "https://s3-ap-southeast-1.amazonaws.com/akbartravelsholidays/admin/thumbnail17181062443808gangtok.webp",
      coordinates: {
        latitude: 27.3272,
        longitude: 88.6140,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
      description: "Celebration of Sikkimese cuisine featuring momos, gundruk, kinema, and traditional organic foods.",
      highlights: ["Momo Competition", "Traditional Cooking Demos", "Organic Food Stalls", "Cultural Performances"],
      ticketPrice: "₹50 entry, Food separate",
      organizer: "Sikkim Tourism Board",
      contactInfo: {
        phone: "+91-3592-202362",
        email: "info.sikkimtourism@gov.in"
      },
      venue: "MG Marg Pedestrian Plaza"
    },
    {
      id: 4,
      name: "Rhododendron Festival",
      location: "Yumthang Valley, North Sikkim",
      category: ["Nature", "Photography", "Tourism"],
      date: "April 15-30, 2024",
      duration: 15,
      type: "Seasonal Festival",
      image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqP3F9YGd3Un753l_HAIIRCT-R69GBijnGuraAZ1JsJti9pKW8j5Hcs_hbnHTsS3g2wmFPu2kYw1JtzQZyvbhOMCyMbUjOGzVy0liZZInb4RhNo-LeLUoopWvrykdnej6xWN2Ne=s1360-w1360-h1020-rw",
      coordinates: {
        latitude: 27.8167,
        longitude: 88.7167,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      },
      description: "Annual celebration of blooming rhododendrons in the Valley of Flowers with guided nature walks.",
      highlights: ["Rhododendron Blooms", "Nature Photography", "Guided Treks", "Alpine Flora Exhibition"],
      ticketPrice: "₹200 + Permit Fees",
      organizer: "North Sikkim Tourism",
      contactInfo: {
        phone: "+91-3592-234567",
        email: "northsikkim.tourism@gov.in"
      },
      venue: "Yumthang Valley & Lachung"
    },
    {
      id: 5,
      name: "Saga Dawa Festival",
      location: "Pemayangtse Monastery, Pelling",
      category: ["Religious", "Festival", "Spiritual"],
      date: "May 22-24, 2024",
      duration: 3,
      type: "Buddhist Festival",
      image: "https://s7ap1.scene7.com/is/image/incredibleindia/pemayangtse-monastery-pelling-sikkim-2-attr-hero?qlt=82&ts=1726656027807,2",
      coordinates: {
        latitude: 27.3052133,
        longitude: 88.2515618,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
      description: "Sacred Buddhist festival commemorating Buddha's birth, enlightenment, and death with prayers and rituals.",
      highlights: ["Prayer Flag Ceremonies", "Meditation Sessions", "Traditional Offerings", "Monastery Tours"],
      ticketPrice: "Free",
      organizer: "Pemayangtse Monastery",
      contactInfo: {
        phone: "+91-3595-250263",
        email: "pelling.monastery@gmail.com"
      },
      venue: "Pemayangtse Monastery Complex"
    },
    {
      id: 6,
      name: "Sikkim Winter Carnival",
      location: "Gangtok & Pelling",
      category: ["Cultural", "Tourism", "Entertainment"],
      date: "January 15-21, 2024",
      duration: 7,
      type: "Tourism Festival",
      image: "https://tripxl.com/blog/wp-content/uploads/2024/08/Pemayangtse-Monastery-4.jpg",
      coordinates: {
        latitude: 27.3389,
        longitude: 88.6065,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
      },
      description: "Winter tourism promotion featuring cultural shows, adventure sports, and local handicraft exhibitions.",
      highlights: ["Cultural Performances", "Adventure Sports", "Handicraft Fair", "Food Festival"],
      ticketPrice: "₹100-500 per event",
      organizer: "Sikkim Tourism Development Corporation",
      contactInfo: {
        phone: "+91-3592-202981",
        email: "stdc.sikkim@gov.in"
      },
      venue: "Multiple venues in Gangtok & Pelling"
    },
    {
      id: 7,
      name: "Tendong Lho Rum Faat",
      location: "Namchi, South Sikkim",
      category: ["Festival", "Cultural", "Traditional"],
      date: "August 8, 2024",
      duration: 1,
      type: "Traditional Festival",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/f3/0e/56/caption.jpg?w=1200&h=1200&s=1",
      coordinates: {
        latitude: 27.1666,
        longitude: 88.3639,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
      description: "Traditional Lepcha festival celebrating Mount Tendong, believed to have saved the tribe from floods.",
      highlights: ["Traditional Lepcha Dances", "Folk Songs", "Archery Competition", "Local Cuisine"],
      ticketPrice: "Free",
      organizer: "Lepcha Cultural Association",
      contactInfo: {
        phone: "+91-3595-264321",
        email: "lepcha.culture@gmail.com"
      },
      venue: "Tendong Hill, Namchi"
    },
    {
      id: 8,
      name: "International Flower Festival",
      location: "White Hall, Gangtok",
      category: ["Nature", "Tourism", "Horticulture"],
      date: "May 1-7, 2024",
      duration: 7,
      type: "Horticultural Festival",
      image: "https://paramountclientweb.s3.ap-south-1.amazonaws.com/indian-holiday-trip/Place/2023/Apr/Img_7770_202303031046_Tsuk_la_khang_monastery.jpg",
      coordinates: {
        latitude: 27.3314,
        longitude: 88.6138,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
      description: "Grand showcase of Sikkim's diverse flora including orchids, rhododendrons, and rare Himalayan flowers.",
      highlights: ["Orchid Exhibition", "Flower Arrangements", "Gardening Workshops", "Photography Contest"],
      ticketPrice: "₹30 per person",
      organizer: "Sikkim Government & Horticultural Department",
      contactInfo: {
        phone: "+91-3592-202574",
        email: "horticulture.sikkim@gov.in"
      },
      venue: "White Hall Complex, Gangtok"
    },
    {
      id: 9,
      name: "Bhumchu Festival",
      location: "Tashiding Monastery, West Sikkim",
      category: ["Religious", "Festival", "Spiritual"],
      date: "March 3-5, 2024",
      duration: 3,
      type: "Sacred Festival",
      image: "https://www.finderbridge.com/imgs/experiences/explore-the-pelling-sky-walk-and-monastery/main.jpg",
      coordinates: {
        latitude: 27.3083,
        longitude: 88.2981,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
      description: "Sacred water ceremony where holy water blessed the previous year is distributed as divine blessing.",
      highlights: ["Sacred Water Ceremony", "Monastery Prayers", "Traditional Dances", "Spiritual Discourses"],
      ticketPrice: "Free",
      organizer: "Tashiding Monastery",
      contactInfo: {
        phone: "+91-3595-250987",
        email: "tashiding.monastery@gmail.com"
      },
      venue: "Tashiding Monastery Premises"
    },
    {
      id: 10,
      name: "Sikkim Organic Festival",
      location: "Ravangla, South Sikkim",
      category: ["Agriculture", "Sustainable", "Educational"],
      date: "November 10-12, 2024",
      duration: 3,
      type: "Agricultural Festival",
      image: "https://s3-ap-southeast-1.amazonaws.com/akbartravelsholidays/admin/thumbnail17181062443808gangtok.webp",
      coordinates: {
        latitude: 27.2690,
        longitude: 88.3915,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
      description: "Celebration of Sikkim as India's first fully organic state, showcasing sustainable farming practices.",
      highlights: ["Organic Produce Fair", "Sustainable Farming Demos", "Seed Exchange", "Eco-friendly Products"],
      ticketPrice: "₹25 entry fee",
      organizer: "Sikkim Organic Mission",
      contactInfo: {
        phone: "+91-3592-280456",
        email: "organic.sikkim@gov.in"
      },
      venue: "Buddha Park & Ravangla Township"
    }
  ];
  
  export default eventList;