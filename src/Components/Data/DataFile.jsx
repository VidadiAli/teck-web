const productsData = [
  {
    category: "laptop",
    items: [
      {
        itemName: "Laptop Ultra 15",
        price: 1899,
        serialNumber: "LA15-U900",
        hasDiscount: true,
        discountPercent: 10,
        rating: 4.8,
        salesCount: 420,
        itemImage: "https://c.pxhere.com/photos/a3/5c/laptop_computer_open_technology_business_internet_notebook_screen-729462.jpg!d"
      },
      {
        itemName: "Gaming Laptop G7",
        price: 2499,
        serialNumber: "GL7-X123",
        hasDiscount: false,
        discountPercent: 0,
        rating: 4.6,
        salesCount: 380,
        itemImage: "https://c.pxhere.com/photos/977089.jpg!d"
      },
      {
        itemName: "Slim Laptop S3",
        price: 1599,
        serialNumber: "SL3-P345",
        hasDiscount: true,
        discountPercent: 5,
        rating: 4.4,
        salesCount: 295,
        itemImage: "https://c.pxhere.com/photos/893149.jpg!d"
      },
      {
        itemName: "Notebook X10",
        price: 1999,
        serialNumber: "NX10-202",
        hasDiscount: false,
        discountPercent: 0,
        rating: 4.5,
        salesCount: 360,
        itemImage: "https://c.pxhere.com/photos/975832.jpg!d"
      },
      {
        itemName: "Laptop Pro Max",
        price: 2799,
        serialNumber: "LPM-55",
        hasDiscount: true,
        discountPercent: 12,
        rating: 4.9,
        salesCount: 500,
        itemImage: "https://c.pxhere.com/photos/940123.jpg!d"
      },
      {
        itemName: "Gaming Beast 17",
        price: 2999,
        serialNumber: "GB17-900",
        hasDiscount: true,
        discountPercent: 8,
        rating: 4.7,
        salesCount: 420,
        itemImage: "https://c.pxhere.com/photos/977089.jpg!d"
      },
      {
        itemName: "UltraBook Z5",
        price: 1699,
        serialNumber: "UBZ5-101",
        hasDiscount: false,
        discountPercent: 0,
        rating: 4.3,
        salesCount: 310,
        itemImage: "https://c.pxhere.com/photos/893149.jpg!d"
      }
    ]
  },
  {
    category: "phone",
    items: [
      {
        itemName: "Smartphone X20",
        price: 1299,
        serialNumber: "SPX20-B45",
        hasDiscount: true,
        discountPercent: 8,
        rating: 4.7,
        salesCount: 910,
        itemImage: "https://c.pxhere.com/photos/893149.jpg!d"
      },
      {
        itemName: "Phone S Pro",
        price: 999,
        serialNumber: "PSPRO-11",
        hasDiscount: false,
        discountPercent: 0,
        rating: 4.5,
        salesCount: 760,
        itemImage: "https://c.pxhere.com/photos/a3/5c/laptop_computer_open_technology_business_internet_notebook_screen-729462.jpg!d"
      },
      {
        itemName: "Mini Smartphone M",
        price: 799,
        serialNumber: "MSM-202",
        hasDiscount: true,
        discountPercent: 12,
        rating: 4.3,
        salesCount: 630,
        itemImage: "https://c.pxhere.com/photos/977089.jpg!d"
      },
      {
        itemName: "Phone Ultra V",
        price: 1199,
        serialNumber: "PUV-330",
        hasDiscount: true,
        discountPercent: 5,
        rating: 4.6,
        salesCount: 550,
        itemImage: "https://c.pxhere.com/photos/940123.jpg!d"
      },
      {
        itemName: "Smartphone Mini Z",
        price: 699,
        serialNumber: "SMZ-120",
        hasDiscount: false,
        discountPercent: 0,
        rating: 4.2,
        salesCount: 420,
        itemImage: "https://c.pxhere.com/photos/975832.jpg!d"
      },
      {
        itemName: "Phone Max 12",
        price: 1099,
        serialNumber: "PM12-MAX",
        hasDiscount: true,
        discountPercent: 10,
        rating: 4.8,
        salesCount: 670,
        itemImage: "https://c.pxhere.com/photos/893149.jpg!d"
      },
      {
        itemName: "Phone Lite 8",
        price: 899,
        serialNumber: "PL8-900",
        hasDiscount: false,
        discountPercent: 0,
        rating: 4.3,
        salesCount: 380,
        itemImage: "https://c.pxhere.com/photos/977089.jpg!d"
      },
      {
        itemName: "Phone Max Pro",
        price: 1299,
        serialNumber: "PMP-102",
        hasDiscount: true,
        discountPercent: 7,
        rating: 4.7,
        salesCount: 550,
        itemImage: "https://c.pxhere.com/photos/940123.jpg!d"
      }
    ]
  },
  {
    category: "television",
    items: [
      {
        itemName: "4K Smart TV 55\"",
        price: 1599,
        serialNumber: "TV55-4KX",
        hasDiscount: true,
        discountPercent: 15,
        rating: 4.9,
        salesCount: 750,
        itemImage: "https://images.pexels.com/photos/276024/pexels-photo-276024.jpeg"
      },
      {
        itemName: "LED TV 43\"",
        price: 1099,
        serialNumber: "TV43-LEDQ",
        hasDiscount: false,
        discountPercent: 0,
        rating: 4.6,
        salesCount: 620,
        itemImage: "https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg"
      },
      {
        itemName: "OLED TV 65\"",
        price: 2499,
        serialNumber: "TV65-OLED",
        hasDiscount: true,
        discountPercent: 20,
        rating: 5,
        salesCount: 410,
        itemImage: "https://images.pexels.com/photos/320192/pexels-photo-320192.jpeg"
      },
      {
        itemName: "Smart LED TV 50\"",
        price: 1399,
        serialNumber: "TV50-SLED",
        hasDiscount: true,
        discountPercent: 10,
        rating: 4.7,
        salesCount: 590,
        itemImage: "https://images.pexels.com/photos/276024/pexels-photo-276024.jpeg"
      },
      {
        itemName: "Curved TV 55\"",
        price: 1999,
        serialNumber: "CTV55-CRV",
        hasDiscount: false,
        discountPercent: 0,
        rating: 4.8,
        salesCount: 430,
        itemImage: "https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg"
      },
      {
        itemName: "Smart OLED 65\"",
        price: 2599,
        serialNumber: "SO65-OLED",
        hasDiscount: true,
        discountPercent: 12,
        rating: 5,
        salesCount: 380,
        itemImage: "https://images.pexels.com/photos/320192/pexels-photo-320192.jpeg"
      },
      {
        itemName: "LED TV Max 60\"",
        price: 1899,
        serialNumber: "LTV60-MAX",
        hasDiscount: false,
        discountPercent: 0,
        rating: 4.6,
        salesCount: 450,
        itemImage: "https://images.pexels.com/photos/276024/pexels-photo-276024.jpeg"
      }
    ]
  },
  {
    category: "refrigerator",
    items: [
      {
        itemName: "Smart Fridge 300",
        price: 1799,
        serialNumber: "RF300-SMART",
        hasDiscount: true,
        discountPercent: 10,
        rating: 4.6,
        salesCount: 490,
        itemImage: "https://images.pexels.com/photos/1457848/pexels-photo-1457848.jpeg"
      },
      {
        itemName: "Double Door Fridge",
        price: 1499,
        serialNumber: "RF-DOUBLE2",
        hasDiscount: false,
        discountPercent: 0,
        rating: 4.4,
        salesCount: 570,
        itemImage: "https://images.pexels.com/photos/887751/pexels-photo-887751.jpeg"
      },
      {
        itemName: "Mini Refrigerator",
        price: 899,
        serialNumber: "MR-120",
        hasDiscount: true,
        discountPercent: 7,
        rating: 4.2,
        salesCount: 320,
        itemImage: "https://images.pexels.com/photos/298842/pexels-photo-298842.jpeg"
      },
      {
        itemName: "Smart Fridge XL",
        price: 1999,
        serialNumber: "RF-XL900",
        hasDiscount: true,
        discountPercent: 12,
        rating: 4.7,
        salesCount: 410,
        itemImage: "https://images.pexels.com/photos/1457848/pexels-photo-1457848.jpeg"
      },
      {
        itemName: "Eco Fridge 200",
        price: 1399,
        serialNumber: "EF-200",
        hasDiscount: false,
        discountPercent: 0,
        rating: 4.3,
        salesCount: 380,
        itemImage: "https://images.pexels.com/photos/887751/pexels-photo-887751.jpeg"
      },
      {
        itemName: "Compact Fridge Mini",
        price: 799,
        serialNumber: "CFM-90",
        hasDiscount: true,
        discountPercent: 5,
        rating: 4.2,
        salesCount: 290,
        itemImage: "https://images.pexels.com/photos/298842/pexels-photo-298842.jpeg"
      },
      {
        itemName: "Fridge Max Pro",
        price: 2199,
        serialNumber: "FMP-500",
        hasDiscount: true,
        discountPercent: 8,
        rating: 4.8,
        salesCount: 340,
        itemImage: "https://images.pexels.com/photos/1457848/pexels-photo-1457848.jpeg"
      }
    ]
  },
  {
    category: "washingMachine",
    items: [
      {
        itemName: "Front Load Washer A1",
        price: 999,
        serialNumber: "WM-FLA1",
        hasDiscount: true,
        discountPercent: 8,
        rating: 4.5,
        salesCount: 410,
        itemImage: "https://images.pexels.com/photos/3952073/pexels-photo-3952073.jpeg"
      },
      {
        itemName: "Top Load Washer T2",
        price: 849,
        serialNumber: "WM-TLT2",
        hasDiscount: false,
        discountPercent: 0,
        rating: 4.3,
        salesCount: 360,
        itemImage: "https://images.pexels.com/photos/1457848/pexels-photo-1457848.jpeg"
      },
      {
        itemName: "Eco Wash Machine E3",
        price: 1099,
        serialNumber: "WM-E3",
        hasDiscount: true,
        discountPercent: 12,
        rating: 4.8,
        salesCount: 280,
        itemImage: "https://images.pexels.com/photos/3952073/pexels-photo-3952073.jpeg"
      },
      {
        itemName: "Washer Plus 4000",
        price: 1199,
        serialNumber: "WP4000",
        hasDiscount: true,
        discountPercent: 10,
        rating: 4.7,
        salesCount: 330,
        itemImage: "https://images.pexels.com/photos/1457848/pexels-photo-1457848.jpeg"
      },
      {
        itemName: "Mini Washer Eco",
        price: 699,
        serialNumber: "MW-ECO1",
        hasDiscount: false,
        discountPercent: 0,
        rating: 4.2,
        salesCount: 220,
        itemImage: "https://images.pexels.com/photos/3952073/pexels-photo-3952073.jpeg"
      },
      {
        itemName: "Washer Ultra T5",
        price: 1299,
        serialNumber: "WU-T5",
        hasDiscount: true,
        discountPercent: 15,
        rating: 4.9,
        salesCount: 380,
        itemImage: "https://images.pexels.com/photos/1457848/pexels-photo-1457848.jpeg"
      },
      {
        itemName: "Front Load Pro",
        price: 1099,
        serialNumber: "FLP-300",
        hasDiscount: true,
        discountPercent: 10,
        rating: 4.6,
        salesCount: 300,
        itemImage: "https://images.pexels.com/photos/3952073/pexels-photo-3952073.jpeg"
      }
    ]
  }
]

const carouselPartArr = [
  {
    id: 1,
    imageText: 'Bütün qiymətə noutbooklar. Həm nağd ödəniş, həm də hissələrlə ödəniş mümkündür',
    imageButton: 'Ətraflı bax',
    imageDate: '',
    imageUrl: 'https://hp.widen.net/content/azqf2pabrp/png/azqf2pabrp.png?w=800&h=600&dpi=72&color=ffffff00',
    itemLink: ''
  },
  {
    id: 2,
    imageText: 'İndi Al 3 ay sonra ödəməyə başla. Tək şəxsiyyət vəsiqəsi ilə istənilən ölçüdə ekranlı televizorlar sənin olsun!',
    imageButton: 'Ətraflı bax',
    imageDate: '',
    imageUrl: 'https://vivax.com/wp-content/uploads/2021/12/TV-75UHD123T2S2SM-P-Left.png',
    itemLink: ''
  },
  {
    id: 3,
    imageText: 'Ailə qurusan? Elə isə tələs. Bütün məişət əşyalarını bizdən seç. İndi al hissə-hissə ödə. Bizim yeni evin fərahlansın!',
    imageButton: 'İndi Al',
    imageDate: '',
    imageUrl: 'https://www.lg.com/content/dam/channel/wcms/tr/images/buzdolabi/gr-b31fmlpl_apzpltk_emtk_tr_c/gallery/dz-03.jpg?w=800',
    itemLink: ''
  },
  {
    id: 4,
    imageText: 'Ailə qurusan? Elə isə tələs. Bütün məişət əşyalarını bizdən seç. İndi al hissə-hissə ödə. Bizim yeni evin fərahlansın!',
    imageButton: 'Ətraflı bax',
    imageDate: '',
    imageUrl: 'https://eurolux.az/wp-content/uploads/2025/03/Paltaryuyan-Eurolux-EU-WM1417S-7BLDG.jpg',
    itemLink: ''
  },
  {
    id: 5,
    imageText: 'Ən son modellər. Həm nağd ödəniş, həm də hissələrlə ödəniş mümkündür',
    imageButton: 'Ətraflı bax',
    imageDate: '',
    imageUrl: 'https://sc04.alicdn.com/kf/Ha00fbaf01dd24bb5a6b92c413487bcb44.jpg',
    itemLink: ''
  }
];


export default {carouselPartArr,  productsData}
