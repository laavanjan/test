export type Product = {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  price: string;
  oldPrice?: string;
  badge?: string;
  featured?: boolean;
  image: string;
  gallery: string[];
  minDays: number;
  sku: string;
  owner: string;
  location: string;
  description: string[];
};

export const categories = [
  { name: "Ev ve Yaşam", slug: "ev-yasam" },
  { name: "Ses ve Kamera", slug: "ses-ve-kamera" },
  { name: "Monitör ve Laptop", slug: "monitor-ve-laptop" },
  { name: "Decathlon", slug: "decathlon" },
  { name: "Oyun ve Hobi", slug: "oyun-ve-hobi" },
];

export const products: Product[] = [
  {
    "slug": "anilara-gulumsuyorum-instax-mini-9-instax-10lu-film",
    "name": "Instax Mini 9 & Instax 10'lu Film",
    "category": "Ses ve Kamera",
    "categorySlug": "ses-ve-kamera",
    "price": "480,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/988/ikili-urun-tasarimi-3.png",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/988/ikili-urun-tasarimi-3.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/988/ikili-urun-tasarimi-3_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/988/1705908893-456322.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/988/1705908893-456322_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-000-expires-on_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/decathlon-kayak-tribord-100-3p-pe26-8940857-8902418-8771802-8771803-8851505-8790375-205-expires-on-20-01-2030_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_59739597",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Instax Mini 9 & Instax 10'lu Film kiralama ürünü."
    ]
  },
  {
    "slug": "anker-nebula-apollo-akilli-tasinabilir-wifi-kablosuz-pico-projeksiyon-cihazi-ve-hoparlor-siyah-d24",
    "name": "Anker Nebula Apollo Akıllı Taşınabilir WiFi Kablosuz Pico Projeksiyon Cihazı ve Hoparlör, Siyah, D24",
    "category": "Ses ve Kamera",
    "categorySlug": "ses-ve-kamera",
    "price": "650,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/128/71uvpoebaul-ac-sl1500.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/128/71uvpoebaul-ac-sl1500.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/128/71uvpoebaul-ac-sl1500_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/128/71z92spzggl-ac-sl1500.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/128/71z92spzggl-ac-sl1500_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-000-expires-on_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/decathlon-kayak-tribord-100-3p-pe26-8940857-8902418-8771802-8771803-8851505-8790375-205-expires-on-20-01-2030_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_33379743",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Anker Nebula Apollo Akıllı Taşınabilir WiFi Kablosuz Pico Projeksiyon Cihazı ve Hoparlör, Siyah, D24 kiralama ürünü."
    ]
  },
  {
    "slug": "arzum-ar6001-steamforce-buhar-istasyonlu-utu",
    "name": "Arzum AR6001 Steamforce Buhar İstasyonlu Ütü",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "420,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/279/1759395890-159896.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/279/1759395890-159896.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/279/1759395890-159896_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/279/1759395892-375431.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/279/1759395892-375431_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/279/1759395895-917445.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/279/1759395895-917445_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_64592123",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Arzum AR6001 Steamforce Buhar İstasyonlu Ütü kiralama ürünü."
    ]
  },
  {
    "slug": "arzum-crust-mix-lite-stand-mikser-kirmizi",
    "name": "Arzum Crust Mix Lite Stand Mikser - Kırmızı",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "550,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/277/1759395682-558746.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/277/1759395682-558746.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/277/1759395682-558746_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/277/1759395685-619621.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/277/1759395685-619621_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/277/1759395686-246098.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/277/1759395686-246098_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_62129263",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Arzum Crust Mix Lite Stand Mikser - Kırmızı kiralama ürünü."
    ]
  },
  {
    "slug": "arzum-okka-elite-turk-kahvesi-makinesi-bakir-yeni-urun",
    "name": "Arzum Okka Elite Türk Kahvesi Makinesi - Bakır - Yeni Ürün",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "520,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/275/1759395104-197809.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/275/1759395104-197809.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/275/1759395104-197809_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/275/1759395111-292338.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/275/1759395111-292338_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/275/1759395118-205074.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/275/1759395118-205074_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_30903148",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Arzum Okka Elite Türk Kahvesi Makinesi - Bakır - Yeni Ürün kiralama ürünü."
    ],
    "badge": "Yeni"
  },
  {
    "slug": "arzum-okka-espresso-pro-m-tam-otomatik-espresso-makinesi",
    "name": "Arzum Okka Espresso Pro M Tam Otomatik Kahve Makinesi",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "650,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/278/1759395801-787009.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/278/1759395801-787009.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/278/1759395801-787009_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/278/1759395803-128529.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/278/1759395803-128529_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/278/1759395820-717917.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/278/1759395820-717917_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_43442176",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Arzum Okka Espresso Pro M Tam Otomatik Kahve Makinesi kiralama ürünü."
    ]
  },
  {
    "slug": "babybjorn",
    "name": "BabyBjörn Harmony 3D Mesh Antrasit Kanguru",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "55,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/106/1674572312-519885.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/106/1674572312-519885.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/106/1674572312-519885_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/106/1674572315-953716.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/106/1674572315-953716_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-000-expires-on_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/decathlon-kayak-tribord-100-3p-pe26-8940857-8902418-8771802-8771803-8851505-8790375-205-expires-on-20-01-2030_min.jpg"
    ],
    "minDays": 3,
    "sku": "4453_18830727",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "BabyBjörn Harmony 3D Mesh Antrasit Kanguru kiralama ürünü."
    ]
  },
  {
    "slug": "bir-oyun-daha-sonra-temizlik-paketi-playstation-5-karcher-sc-3-buharli-temizlik-makinesi",
    "name": "“Bir Oyun Daha Sonra Temizlik” Paketi (PlayStation 5 + Karcher SC 3 Buharlı Temizlik Makinesi)",
    "category": "Oyun ve Hobi",
    "categorySlug": "oyun-ve-hobi",
    "price": "880,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/730/ikili-urun-tasarimi-10.png",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/730/ikili-urun-tasarimi-10.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/730/ikili-urun-tasarimi-10_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/730/1703192320-965951.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/730/1703192320-965951_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-000-expires-on_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/decathlon-kayak-tribord-100-3p-pe26-8940857-8902418-8771802-8771803-8851505-8790375-205-expires-on-20-01-2030_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_71649433",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "“Bir Oyun Daha Sonra Temizlik” Paketi (PlayStation 5 + Karcher SC 3 Buharlı Temizlik Makinesi) kiralama ürünü."
    ]
  },
  {
    "slug": "bissell-crosswave-c3-hali-kilim-ve-zemin-makinesi-hutt-ddc55-akilli-cam-temizleme-robotu",
    "name": "Bissell Crosswave C3 Halı, Kilim ve Zemin Makinesi + Kiwi Akıllı Cam Temizleme Robotu & 100 ML Karcher Halı Koltuk Deterjanı",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "740,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/515/1736934193-615031.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/515/1736934193-615031.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/515/1736934193-615031_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/515/1736934196-259228.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/515/1736934196-259228_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/515/1736934199-162416.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/515/1736934199-162416_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_73703544",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Bissell Crosswave C3 Halı, Kilim ve Zemin Makinesi + Kiwi Akıllı Cam Temizleme Robotu & 100 ML Karcher Halı Koltuk Deterjanı kiralama ürünü."
    ]
  },
  {
    "slug": "bissell-multiclean-spot-and-stain-330-w-hali-ve-koltuk-yikama-makinesi",
    "name": "Bissell MultiClean Spot&Stain Halı - Koltuk Yıkama ve Leke Çıkarma Makinesi & 100 ML Halı Koltuk Deterjanı",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "650,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/958/4720m-119-h1-cgi.jpeg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/958/4720m-119-h1-cgi.jpeg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/958/4720m-119-h1-cgi_min.jpeg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/958/6722478b4ff04e7fcf65bd79bbe696e2izxcnvl8tpnsuh2i-0.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/958/6722478b4ff04e7fcf65bd79bbe696e2izxcnvl8tpnsuh2i-0_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/958/4720m-1117-iu1-stain-1280x1280.jpeg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/958/4720m-1117-iu1-stain-1280x1280_min.jpeg"
    ],
    "minDays": 3,
    "sku": "3208_12333969",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Bissell MultiClean Spot&Stain Halı - Koltuk Yıkama ve Leke Çıkarma Makinesi & 100 ML Halı Koltuk Deterjanı kiralama ürünü."
    ]
  },
  {
    "slug": "bood-kule-parti-hoparloru",
    "name": "BOOD Kule Parti Hoparlörü PS75",
    "category": "Ses ve Kamera",
    "categorySlug": "ses-ve-kamera",
    "price": "380,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/466/1673873936-367926.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/466/1673873936-367926.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/466/1673873936-367926_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-000-expires-on_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/decathlon-kayak-tribord-100-3p-pe26-8940857-8902418-8771802-8771803-8851505-8790375-205-expires-on-20-01-2030_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/570/itiwit-sup-100-l-compact-blanc-et-bleu-8642807-000-expires-on-23-01-2034-1_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/558/1774518362-743181_min.jpg"
    ],
    "minDays": 3,
    "sku": "4958_66468876",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "BOOD Kule Parti Hoparlörü PS75 kiralama ürünü."
    ]
  },
  {
    "slug": "britax-romer-trifix-2-i-size-oto-koltugu",
    "name": "Britax Römer Trifix 2 i-Size Oto Koltuğu",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "95,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/471/1773231859-963091.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/471/1773231859-963091.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/471/1773231859-963091_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/471/1773231861-337060.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/471/1773231861-337060_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/471/1773231864-523263.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/471/1773231864-523263_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_26059440",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Britax Römer Trifix 2 i-Size Oto Koltuğu kiralama ürünü."
    ]
  },
  {
    "slug": "bu-surus-deneyimi-gercek-mi-playstation-5-digital-edition-oyun-konsolu-logitech-g29-direksiyon-pedal-shifter-seti",
    "name": "PlayStation 5 Digital Edition + LOGITECH G29 Direksiyon & Pedal & Shifter Seti",
    "category": "Oyun ve Hobi",
    "categorySlug": "oyun-ve-hobi",
    "price": "720,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/647/10.png",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/647/10.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/647/10_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/647/11.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/647/11_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/647/ps51.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/647/ps51_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_51518538",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "PlayStation 5 Digital Edition + LOGITECH G29 Direksiyon & Pedal & Shifter Seti kiralama ürünü."
    ]
  },
  {
    "slug": "buharli-robotik-temizlik-paketi-pirantech-buharli-temizlik-makinesi-xiaomi-mi-robot-supurge-pro2",
    "name": "'Buharlı Robotik Temizlik' Paketi (Pirantech Buharlı Temizlik Makinesi + Xiaomi Mi Robot Süpürge Pro 2)",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "710,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/060/buharli-robotik.png",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/060/buharli-robotik.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/060/buharli-robotik_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/060/1706449624-959068.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/060/1706449624-959068_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-000-expires-on_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/decathlon-kayak-tribord-100-3p-pe26-8940857-8902418-8771802-8771803-8851505-8790375-205-expires-on-20-01-2030_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_63071908",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "'Buharlı Robotik Temizlik' Paketi (Pirantech Buharlı Temizlik Makinesi + Xiaomi Mi Robot Süpürge Pro 2) kiralama ürünü."
    ]
  },
  {
    "slug": "bundle-stand-up-paddle-l-boy-beyaz-mavi-10-100",
    "name": "DECATHLON BUNDLE - Stand Up Paddle - L Boy - Beyaz/Mavi - 10' - 100",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "550,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/570/itiwit-sup-100-l-compact-blanc-et-bleu-8642807-000-expires-on-23-01-2034-1.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/570/itiwit-sup-100-l-compact-blanc-et-bleu-8642807-000-expires-on-23-01-2034-1.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/570/itiwit-sup-100-l-compact-blanc-et-bleu-8642807-000-expires-on-23-01-2034-1_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/570/itiwit-sup-100-l-compact-blanc-et-bleu-8642807-012-expires-on-28-04-2026.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/570/itiwit-sup-100-l-compact-blanc-et-bleu-8642807-012-expires-on-28-04-2026_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/570/itiwit-sup-100-l-compact-blanc-et-bleu-8642807-000-expires-on-06-05-2026.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/570/itiwit-sup-100-l-compact-blanc-et-bleu-8642807-000-expires-on-06-05-2026_min.jpg"
    ],
    "minDays": 3,
    "sku": "12344567",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "DECATHLON BUNDLE - Stand Up Paddle - L Boy - Beyaz/Mavi - 10' - 100 kiralama ürünü."
    ]
  },
  {
    "slug": "canon-eos-250d-18-55-mm-lens-dijital-slr-fotograf-makinesi",
    "name": "CANON EOS 250D & 18-55 mm Lens Dijital SLR Fotoğraf Makinesi",
    "category": "Ses ve Kamera",
    "categorySlug": "ses-ve-kamera",
    "price": "620,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/083/1696867790-508813.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/083/1696867790-508813.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/083/1696867790-508813_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/083/1696867792-140089.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/083/1696867792-140089_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/520/1736937146-785614_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/988/ikili-urun-tasarimi-3_min.png"
    ],
    "minDays": 3,
    "sku": "3208_41926108",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "CANON EOS 250D & 18-55 mm Lens Dijital SLR Fotoğraf Makinesi kiralama ürünü."
    ]
  },
  {
    "slug": "cybex-aton-b2-i-size-bebek-oto-koltugu",
    "name": "Cybex Aton B2 i-Size Bebek Oto Koltuğu",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "62,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/472/1773232241-563578.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/472/1773232241-563578.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/472/1773232241-563578_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/472/1773232244-658779.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/472/1773232244-658779_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/472/1773232246-515707.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/472/1773232246-515707_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_33132828",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Cybex Aton B2 i-Size Bebek Oto Koltuğu kiralama ürünü."
    ]
  },
  {
    "slug": "decathlon-10-6-sisirilebilir-stand-up-paddle",
    "name": "DECATHLON Şişme Stand Up Paddle Seti - 10'6' - 1 veya 2 Kişilik",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "400,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/499/1774436215-429663.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/499/1774436215-429663.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/499/1774436215-429663_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/499/1774436218-930175.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/499/1774436218-930175_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/499/1774436220-943248.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/499/1774436220-943248_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_74906879",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "DECATHLON Şişme Stand Up Paddle Seti - 10'6' - 1 veya 2 Kişilik kiralama ürünü."
    ],
    "badge": "Yeni"
  },
  {
    "slug": "decathlon-2-kisilik-kamp-seti",
    "name": "DECATHLON 2 Kişilik Kamp Seti",
    "category": "Decathlon",
    "categorySlug": "decathlon",
    "price": "780,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/505/1774445199-192058.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/505/1774445199-192058.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/505/1774445199-192058_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/505/1774445200-347182.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/505/1774445200-347182_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/505/1774445201-953846.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/505/1774445201-953846_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_20765801",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "DECATHLON 2 Kişilik Kamp Seti kiralama ürünü."
    ],
    "badge": "Yeni"
  },
  {
    "slug": "decathlon-3-kisilik-kamp-seti",
    "name": "DECATHLON 3 Kişilik Kamp Seti",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "1.052,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/507/1774517064-858513.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/507/1774517064-858513.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/507/1774517064-858513_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/507/1774517065-290526.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/507/1774517065-290526_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/507/1774517066-558865.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/507/1774517066-558865_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_31662612",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "DECATHLON 3 Kişilik Kamp Seti kiralama ürünü."
    ],
    "badge": "Yeni"
  },
  {
    "slug": "decathlon-4-kisilik-kamp-cadiri-arpenaz-4-1-fresh-black",
    "name": "Decathlon 4 Kişilik Kamp Çadırı - Arpenaz 4.1 Fresh&Black",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "500,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/466/quechua-tente-arpenaz-41-fresh-black-8731616-001-expires-on-02-10-2032.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/466/quechua-tente-arpenaz-41-fresh-black-8731616-001-expires-on-02-10-2032.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/466/quechua-tente-arpenaz-41-fresh-black-8731616-001-expires-on-02-10-2032_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/466/quechua-tente-arpenaz-41-fresh-black-pe23-8731616-009-expires-on-06-12-2031.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/466/quechua-tente-arpenaz-41-fresh-black-pe23-8731616-009-expires-on-06-12-2031_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/466/quechua-tente-arpenaz-41-fresh-black-pe23-8731616-8789855-864538-8584585-100-expires-on-07-03-2028.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/466/quechua-tente-arpenaz-41-fresh-black-pe23-8731616-8789855-864538-8584585-100-expires-on-07-03-2028_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_64260159",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Decathlon 4 Kişilik Kamp Çadırı - Arpenaz 4.1 Fresh&Black kiralama ürünü."
    ],
    "badge": "Yeni"
  },
  {
    "slug": "decathlon-bundle-iwiko-plaj-seti",
    "name": "DECATHLON BUNDLE İwiko Plaj Seti",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "520,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/508/decathlon-ikili-paket.png",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/508/decathlon-ikili-paket.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/508/decathlon-ikili-paket_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/508/screenshot-2026-04-17-at-14-42-01.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/508/screenshot-2026-04-17-at-14-42-01_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-000-expires-on_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/decathlon-kayak-tribord-100-3p-pe26-8940857-8902418-8771802-8771803-8851505-8790375-205-expires-on-20-01-2030_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_13544844",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "DECATHLON BUNDLE İwiko Plaj Seti kiralama ürünü."
    ],
    "badge": "Yeni"
  },
  {
    "slug": "decathlon-bundle-sisme-kano-2-3-kisilik-mavi-100",
    "name": "DECATHLON BUNDLE - Şişme Kano - 2/3 Kişilik - Mavi - 100+",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "660,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/571/decathlon-kayak-tribord-100-3p-pe26-8940857-8902418-8771802-8771803-8851505-8790375-205-expires-on-20-01-2030.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/decathlon-kayak-tribord-100-3p-pe26-8940857-8902418-8771802-8771803-8851505-8790375-205-expires-on-20-01-2030.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/decathlon-kayak-tribord-100-3p-pe26-8940857-8902418-8771802-8771803-8851505-8790375-205-expires-on-20-01-2030_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/tribord-kayak-tribord-100-3p-8940857-002-expires-on-07-01-2034.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/tribord-kayak-tribord-100-3p-8940857-002-expires-on-07-01-2034_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/itiwit-ba-50n-turquoiseorange-8771803-8940857-020-expires-on-02-04-2029.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/itiwit-ba-50n-turquoiseorange-8771803-8940857-020-expires-on-02-04-2029_min.jpg"
    ],
    "minDays": 3,
    "sku": "R7R3R9THJH",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "DECATHLON BUNDLE - Şişme Kano - 2/3 Kişilik - Mavi - 100+ kiralama ürünü."
    ],
    "badge": "Yeni"
  },
  {
    "slug": "decathlon-domyos-essential-120-kurek-cekme-makinesi",
    "name": "DECATHLON DOMYOS Essential 120 Kürek Çekme Makinesi",
    "category": "Decathlon",
    "categorySlug": "decathlon",
    "price": "143,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/501/1774436878-649266.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/501/1774436878-649266.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/501/1774436878-649266_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/501/1774436881-483389.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/501/1774436881-483389_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/501/1774436876-403193.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/501/1774436876-403193_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_50934375",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "DECATHLON DOMYOS Essential 120 Kürek Çekme Makinesi kiralama ürünü."
    ],
    "badge": "Yeni"
  },
  {
    "slug": "decathlon-kas-gelistirme-agirlik-seti-20-kg",
    "name": "Decathlon Kas Geliştirme Ağırlık Seti - 20 kg",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "66,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/464/kit-20-kg-8018574-8756638-001-expires-on-01-06-2026.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/464/kit-20-kg-8018574-8756638-001-expires-on-01-06-2026.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/464/kit-20-kg-8018574-8756638-001-expires-on-01-06-2026_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/464/corength-kit-20kgs-filete-8018574-000-expires-on-27-09-2031-1.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/464/corength-kit-20kgs-filete-8018574-000-expires-on-27-09-2031-1_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/464/corength-kit-20kgs-filete-8018574-000-expires-on-27-09-2031.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/464/corength-kit-20kgs-filete-8018574-000-expires-on-27-09-2031_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_48627817",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Decathlon Kas Geliştirme Ağırlık Seti - 20 kg kiralama ürünü."
    ],
    "badge": "Yeni"
  },
  {
    "slug": "decathlon-katlanabilir-mekik-sehpasi",
    "name": "Decathlon Katlanabilir Mekik Sehpası",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "124,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/463/corength-banc-900-pe24-8766093-001-expires-on-07-03-2033.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/463/corength-banc-900-pe24-8766093-001-expires-on-07-03-2033.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/463/corength-banc-900-pe24-8766093-001-expires-on-07-03-2033_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/463/corength-banc-900-pe24-8766093-004-expires-on-07-03-2033.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/463/corength-banc-900-pe24-8766093-004-expires-on-07-03-2033_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/463/corength-banc-900-8766093-000-expires-on-14-02-2032.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/463/corength-banc-900-8766093-000-expires-on-14-02-2032_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_55863026",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Decathlon Katlanabilir Mekik Sehpası kiralama ürünü."
    ],
    "badge": "Yeni"
  },
  {
    "slug": "decathlon-katlanir-yuruyus-bandi-14-km-sa-compact-run100",
    "name": "Decathlon Katlanır Yürüyüş Bandı - 14 Km/Sa - Compact RUN100",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "250,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/465/domyos-compact-run-100-8800625-008-expires-on-26-09-2035.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/465/domyos-compact-run-100-8800625-008-expires-on-26-09-2035.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/465/domyos-compact-run-100-8800625-008-expires-on-26-09-2035_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/465/domyos-compact-run-100-8800625-000-expires-on-02-10-2035.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/465/domyos-compact-run-100-8800625-000-expires-on-02-10-2035_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/465/domyos-compact-run-100-8800625-008-expires-on-26-09-2035-2.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/465/domyos-compact-run-100-8800625-008-expires-on-26-09-2035-2_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_36341748",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Decathlon Katlanır Yürüyüş Bandı - 14 Km/Sa - Compact RUN100 kiralama ürünü."
    ],
    "badge": "Yeni"
  },
  {
    "slug": "decathlon-kipsta-klasik-futbol-kalesi-300-cm-200-cm",
    "name": "DECATHLON KIPSTA Klasik Futbol Kalesi - 300 cm × 200 cm - L boy",
    "category": "Decathlon",
    "categorySlug": "decathlon",
    "price": "149,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/511/1774517545-144762.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/511/1774517545-144762.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/511/1774517545-144762_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/511/1774517543-953296.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/511/1774517543-953296_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/511/1774517542-651552.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/511/1774517542-651552_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_30640591",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "DECATHLON KIPSTA Klasik Futbol Kalesi - 300 cm × 200 cm - L boy kiralama ürünü."
    ],
    "badge": "Yeni"
  },
  {
    "slug": "decathlon-oxelo-fit3-jr-cocuk-fitness-pateni",
    "name": "DECATHLON OXELO FIT3 JR Çocuk Fitness Pateni 29-32",
    "category": "Decathlon",
    "categorySlug": "decathlon",
    "price": "210,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/513/1774518362-743181.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/513/1774518362-743181.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/513/1774518362-743181_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/513/1774518365-810018.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/513/1774518365-810018_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/513/1774518370-381285.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/513/1774518370-381285_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_21702764",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "DECATHLON OXELO FIT3 JR Çocuk Fitness Pateni 29-32 kiralama ürünü."
    ],
    "badge": "Yeni"
  },
  {
    "slug": "decathlon-oxelo-fit3-jr-cocuk-fitness-pateni-32-35",
    "name": "DECATHLON OXELO FIT3 JR Çocuk Fitness Pateni 32-35",
    "category": "Decathlon",
    "categorySlug": "decathlon",
    "price": "210,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/558/1774518362-743181.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/558/1774518362-743181.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/558/1774518362-743181_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/558/1774518365-810018.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/558/1774518365-810018_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/558/1774518370-381285.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/558/1774518370-381285_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_21702761",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "DECATHLON OXELO FIT3 JR Çocuk Fitness Pateni 32-35 kiralama ürünü."
    ],
    "badge": "Yeni"
  },
  {
    "slug": "decathlon-oxelo-fit3-jr-cocuk-fitness-pateni-35-38",
    "name": "DECATHLON OXELO FIT3 JR Çocuk Fitness Pateni 35-38",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "210,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/557/1774518362-743181.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/557/1774518362-743181.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/557/1774518362-743181_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/557/1774518365-810018.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/557/1774518365-810018_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/557/1774518370-381285.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/557/1774518370-381285_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_21702760",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "DECATHLON OXELO FIT3 JR Çocuk Fitness Pateni 35-38 kiralama ürünü."
    ],
    "badge": "Yeni"
  },
  {
    "slug": "decathlon-pongori-portatif-masaustu-bilardo-seti",
    "name": "DECATHLON PONGORI Portatif Masaüstü Bilardo Seti",
    "category": "Decathlon",
    "categorySlug": "decathlon",
    "price": "503,50 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/512/1774518072-776183.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/512/1774518072-776183.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/512/1774518072-776183_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/512/1774518074-599173.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/512/1774518074-599173_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/512/1774518077-420923.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/512/1774518077-420923_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_45754477",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "DECATHLON PONGORI Portatif Masaüstü Bilardo Seti kiralama ürünü."
    ],
    "badge": "Yeni"
  },
  {
    "slug": "decathlon-quechua-2-seconds-easy-fresh-black-2-kisilik-kamp-cadiri",
    "name": "DECATHLON QUECHUA 2 Seconds Easy Fresh & Black 2 Kişilik Kamp Çadırı",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "535,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/497/1774434795-729192.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/497/1774434795-729192.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/497/1774434795-729192_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/497/1774434797-477976.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/497/1774434797-477976_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/497/1774434800-558154.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/497/1774434800-558154_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_83670278",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "DECATHLON QUECHUA 2 Seconds Easy Fresh & Black 2 Kişilik Kamp Çadırı kiralama ürünü."
    ],
    "badge": "Yeni"
  },
  {
    "slug": "decathlon-quechua-2-seconds-xl-fresh-black-3-kisilik-kamp-cadiri",
    "name": "DECATHLON QUECHUA 2 Seconds XL Fresh & Black 3 Kişilik Kamp Çadırı",
    "category": "Decathlon",
    "categorySlug": "decathlon",
    "price": "375,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/496/1774433792-247529.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/496/1774433792-247529.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/496/1774433792-247529_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/496/1774433794-667558.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/496/1774433794-667558_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/496/1774433797-353283.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/496/1774433797-353283_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_94636838",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "DECATHLON QUECHUA 2 Seconds XL Fresh & Black 3 Kişilik Kamp Çadırı kiralama ürünü."
    ],
    "badge": "Yeni"
  },
  {
    "slug": "decathlon-quechua-4-kisilik-kamp-seti",
    "name": "DECATHLON QUECHUA 4 Kişilik Kamp Seti",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "1.268,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/506/1774445777-310635.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/506/1774445777-310635.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/506/1774445777-310635_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/506/1774445779-826246.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/506/1774445779-826246_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/506/1774445782-997833.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/506/1774445782-997833_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_76210423",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "DECATHLON QUECHUA 4 Kişilik Kamp Seti kiralama ürünü."
    ],
    "badge": "Yeni"
  },
  {
    "slug": "decathlon-quechua-katlanabilir-sogutucu-30-litre-96-saat-serin-tutma-900-fresh",
    "name": "DECATHLON Quechua Katlanabilir Soğutucu - 30 Litre - 96 Saat Serin Tutma - 900 Fresh",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "180,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/550/quechua-glaciere-fresh-electrique-vert-8676226-001-expires-on-02-10-2032.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/550/quechua-glaciere-fresh-electrique-vert-8676226-001-expires-on-02-10-2032.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/550/quechua-glaciere-fresh-electrique-vert-8676226-001-expires-on-02-10-2032_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/550/quechua-glaciere-fresh-electrique-vert-pe22-8676226-002-expires-on-03-02-2032.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/550/quechua-glaciere-fresh-electrique-vert-pe22-8676226-002-expires-on-03-02-2032_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/550/quechua-glaciere-fresh-electrique-vert-pe22-8676226-006-expires-on-03-02-2032.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/550/quechua-glaciere-fresh-electrique-vert-pe22-8676226-006-expires-on-03-02-2032_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_45754478",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "DECATHLON Quechua Katlanabilir Soğutucu - 30 Litre - 96 Saat Serin Tutma - 900 Fresh kiralama ürünü."
    ],
    "badge": "Yeni"
  },
  {
    "slug": "decathlon-quechua-mh100-fresh-black-2-kisilik-kamp-cadiri",
    "name": "DECATHLON QUECHUA MH100 Fresh & Black 2 Kişilik Kamp Çadırı",
    "category": "Decathlon",
    "categorySlug": "decathlon",
    "price": "300,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/502/1774437378-725935.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/502/1774437378-725935.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/502/1774437378-725935_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/502/1774437380-969879.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/502/1774437380-969879_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/502/1774437383-392190.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/502/1774437383-392190_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_62650666",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "DECATHLON QUECHUA MH100 Fresh & Black 2 Kişilik Kamp Çadırı kiralama ürünü."
    ],
    "badge": "Yeni"
  },
  {
    "slug": "decathlon-sisme-stand-up-paddle-seti-9-6-1-kisilik-sari-100",
    "name": "DECATHLON Şişme Stand Up Paddle Seti - 9'6' - 1 Kişilik - Sarı - 100",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "450,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-000-expires-on.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-000-expires-on.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-000-expires-on_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-205-expires-on.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-205-expires-on_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/itiwit-pack-decouverte-sup-96-8862497-000-expires-on-23.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/itiwit-pack-decouverte-sup-96-8862497-000-expires-on-23_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_30640511",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "DECATHLON Şişme Stand Up Paddle Seti - 9'6' - 1 Kişilik - Sarı - 100 kiralama ürünü."
    ],
    "featured": true,
    "badge": "Yeni"
  },
  {
    "slug": "decathlon-tarmak-portatif-basketbol-potasi",
    "name": "DECATHLON TARMAK Ayarlanabilir Ayaklı Basketbol Potası - 2,4/3,05 m - B500 Box",
    "category": "Decathlon",
    "categorySlug": "decathlon",
    "price": "491,50 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/510/1774517583-156026.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/510/1774517583-156026.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/510/1774517583-156026_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/510/1774517582-896959.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/510/1774517582-896959_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/510/1774517584-193999.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/510/1774517584-193999_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_46477307",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "DECATHLON TARMAK Ayarlanabilir Ayaklı Basketbol Potası - 2,4/3,05 m - B500 Box kiralama ürünü."
    ],
    "badge": "Yeni"
  },
  {
    "slug": "decathlon-tribord-100-essentiel-1-2-kisilik-sisirilebilir-kano-seti",
    "name": "DECATHLON TRIBORD 100 Essentiel 1-2 Kişilik Şişirilebilir Kano Seti",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "375,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/498/1774435874-341923.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/498/1774435874-341923.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/498/1774435874-341923_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/498/1774435877-464005.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/498/1774435877-464005_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/498/1774435879-991930.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/498/1774435879-991930_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_13266307",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "DECATHLON TRIBORD 100 Essentiel 1-2 Kişilik Şişirilebilir Kano Seti kiralama ürünü."
    ],
    "badge": "Yeni"
  },
  {
    "slug": "dyson-airstrait-sac-duzlestirici",
    "name": "Dyson Airstrait Saç Düzleştirici",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "490,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/508/553-primary-dkblbco-800x1200.png",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/508/553-primary-dkblbco-800x1200.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/508/553-primary-dkblbco-800x1200_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/508/553-features-intuitiveairflow-1360x765-m2-dkblbco.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/508/553-features-intuitiveairflow-1360x765-m2-dkblbco_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/508/553-leap-m2-dkblbco-1440x810-gallery-3-row.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/508/553-leap-m2-dkblbco-1440x810-gallery-3-row_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_61084327",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Dyson Airstrait Saç Düzleştirici kiralama ürünü."
    ]
  },
  {
    "slug": "dyson-airstrait-sac-duzlestirici-karcher-cam-temizleme-makinesi",
    "name": "Dyson Airstrait Saç Düzleştirici + Karcher Cam Temizleme Makinesi",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "580,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/377/1734884677-677535.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/377/1734884677-677535.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/377/1734884677-677535_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/377/1734884679-307103.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/377/1734884679-307103_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/377/1734884682-381318.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/377/1734884682-381318_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_39466895",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Dyson Airstrait Saç Düzleştirici + Karcher Cam Temizleme Makinesi kiralama ürünü."
    ]
  },
  {
    "slug": "dyson-airstrait-sac-duzlestirici-russell-hobbs-26451-56-distinctions-espresso-kahve-makinesi",
    "name": "Dyson Airstrait Saç Düzleştirici + Russell Hobbs 26451-56 Distinctions Espresso Kahve Makinesi",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "640,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/378/1734884830-431239.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/378/1734884830-431239.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/378/1734884830-431239_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/378/1734884832-623046.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/378/1734884832-623046_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/378/1734884835-136107.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/378/1734884835-136107_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_23500300",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Dyson Airstrait Saç Düzleştirici + Russell Hobbs 26451-56 Distinctions Espresso Kahve Makinesi kiralama ürünü."
    ]
  },
  {
    "slug": "dyson-airwraptm-multi-styler-complete-uzun-blue-blush-2",
    "name": "DYSON Airwrap™ Multi-styler Complete Uzun (Blue Blush)",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "510,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/476/81454042.png",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/476/81454042.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/476/81454042_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/476/83263579.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/476/83263579_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-000-expires-on_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/decathlon-kayak-tribord-100-3p-pe26-8940857-8902418-8771802-8771803-8851505-8790375-205-expires-on-20-01-2030_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_65118620",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "DYSON Airwrap™ Multi-styler Complete Uzun (Blue Blush) kiralama ürünü."
    ]
  },
  {
    "slug": "dyson-airwraptm-multi-styler-complete-uzun-dyson-v15-detect-total-clean-kablosuz-supurge",
    "name": "DYSON Airwrap™ Multi-styler Complete Uzun + Dyson V15 Detect Total Clean Kablosuz Süpürge",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "640,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/381/1734885444-456333.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/381/1734885444-456333.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/381/1734885444-456333_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/381/1734885446-165313.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/381/1734885446-165313_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/381/1734885449-813145.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/381/1734885449-813145_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_72439890",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "DYSON Airwrap™ Multi-styler Complete Uzun + Dyson V15 Detect Total Clean Kablosuz Süpürge kiralama ürünü."
    ]
  },
  {
    "slug": "dyson-v15-detect-total-clean-kablosuz-supurge-arnell-cam-pencere-temizleme-robotu",
    "name": "Dyson V15 Detect Total Clean Kablosuz Süpürge + Arnell Cam Pencere Temizleme Robotu",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "640,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/376/1734884480-138015.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/376/1734884480-138015.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/376/1734884480-138015_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/376/1734884483-611778.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/376/1734884483-611778_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/376/1734884486-617694.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/376/1734884486-617694_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_14104585",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Dyson V15 Detect Total Clean Kablosuz Süpürge + Arnell Cam Pencere Temizleme Robotu kiralama ürünü."
    ]
  },
  {
    "slug": "dyson-v15-supurge-dyson-airstrait-sac-duzlestiricisi",
    "name": "DYSON V15 Süpürge + Dyson Airstrait Saç Düzleştiricisi",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "690,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/372/1734883309-312908.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/372/1734883309-312908.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/372/1734883309-312908_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/372/1734883312-330977.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/372/1734883312-330977_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/372/1734883315-155980.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/372/1734883315-155980_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_68759939",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "DYSON V15 Süpürge + Dyson Airstrait Saç Düzleştiricisi kiralama ürünü."
    ]
  },
  {
    "slug": "dyson-v15s-supurge-karcher-buharli-temizlik-makinesi",
    "name": "Dyson V15 Süpürge + Karcher Buharlı Temizlik Makinesi",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "780,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/373/1734883591-894608.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/373/1734883591-894608.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/373/1734883591-894608_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/373/1734883594-331556.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/373/1734883594-331556_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/373/1734883597-810064.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/373/1734883597-810064_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_38892329",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Dyson V15 Süpürge + Karcher Buharlı Temizlik Makinesi kiralama ürünü."
    ]
  },
  {
    "slug": "ergobaby-omni-deluxe-mesh-kanguru",
    "name": "Ergobaby Omni Breeze Mesh Kanguru",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "450,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/110/knaguru.png",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/110/knaguru.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/110/knaguru_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/110/1752590540-980437.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/110/1752590540-980437_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-000-expires-on_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/decathlon-kayak-tribord-100-3p-pe26-8940857-8902418-8771802-8771803-8851505-8790375-205-expires-on-20-01-2030_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_12977473",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Ergobaby Omni Breeze Mesh Kanguru kiralama ürünü."
    ]
  },
  {
    "slug": "explorer-4in1-koyu-bej-katlanabilir-bisiklet",
    "name": "Globber Explorer 4in1 Koyu Bej Katlanabilir Bisiklet",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "65,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/006/1695201106-906114.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/006/1695201106-906114.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/006/1695201106-906114_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/006/1695201107-418176.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/006/1695201107-418176_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/006/1695201109-807304.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/006/1695201109-807304_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_67163576",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Globber Explorer 4in1 Koyu Bej Katlanabilir Bisiklet kiralama ürünü."
    ]
  },
  {
    "slug": "fantom-hair-styler-plus-sk-1700-sac-sekillendirici-1",
    "name": "Fantom Hair Styler Plus SK 1700 Saç Şekillendirici",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "460,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/844/1744070781-138938.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/844/1744070781-138938.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/844/1744070781-138938_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/844/1744070784-552908.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/844/1744070784-552908_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/844/1744070787-489532.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/844/1744070787-489532_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_78488373",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Fantom Hair Styler Plus SK 1700 Saç Şekillendirici kiralama ürünü."
    ]
  },
  {
    "slug": "fantom-jolie-hs-1500-sac-duzlestirici",
    "name": "Fantom Jolie HS 1500 Saç Düzleştirici",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "480,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/686/1740732631-624632.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/686/1740732631-624632.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/686/1740732631-624632_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/686/1740732634-612911.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/686/1740732634-612911_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/686/1740732637-897515.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/686/1740732637-897515_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_41989160",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Fantom Jolie HS 1500 Saç Düzleştirici kiralama ürünü."
    ]
  },
  {
    "slug": "fantom-pati-k9-profesyonel-kedi-kopek-hayvan-tuy-bakim-seti-elektrikli-vak",
    "name": "Fantom Pati K9 Profesyonel Kedi Köpek Hayvan Tüy Bakım Seti - Elektrikli Vakum Şarjlı Tıraş Ve Tüy Toplama",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "470,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/824/1743848174-143058.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/824/1743848174-143058.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/824/1743848174-143058_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/824/1743848177-151578.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/824/1743848177-151578_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/824/1743848179-272616.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/824/1743848179-272616_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_20962407",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Fantom Pati K9 Profesyonel Kedi Köpek Hayvan Tüy Bakım Seti - Elektrikli Vakum Şarjlı Tıraş Ve Tüy Toplama kiralama ürünü."
    ]
  },
  {
    "slug": "fujifilm-instax-mini-11-1",
    "name": "10'lu Film & Fujifilm İnstax Mini 11",
    "category": "Ses ve Kamera",
    "categorySlug": "ses-ve-kamera",
    "price": "540,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/572/1738062732-383765.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/1738062732-383765.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/1738062732-383765_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-000-expires-on_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/decathlon-kayak-tribord-100-3p-pe26-8940857-8902418-8771802-8771803-8851505-8790375-205-expires-on-20-01-2030_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/570/itiwit-sup-100-l-compact-blanc-et-bleu-8642807-000-expires-on-23-01-2034-1_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/558/1774518362-743181_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_95385131",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "10'lu Film & Fujifilm İnstax Mini 11 kiralama ürünü."
    ]
  },
  {
    "slug": "fujifilm-instax-mini-9-dyson-airwraptm-multi-styler-complete-uzun-blue-blush-2",
    "name": "Fujifilm İnstax Mini 9 & 10'lu Film & DYSON Airwrap™ Multi-styler Complete Uzun (Blue Blush)",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "580,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/461/1735996893-673511.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/461/1735996893-673511.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/461/1735996893-673511_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/461/1735996896-420504.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/461/1735996896-420504_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/461/1735996899-832924.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/461/1735996899-832924_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_43434076",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Fujifilm İnstax Mini 9 & 10'lu Film & DYSON Airwrap™ Multi-styler Complete Uzun (Blue Blush) kiralama ürünü."
    ]
  },
  {
    "slug": "fujifilm-instax-mini-9-tabu-xl",
    "name": "10'lu Film & Fujifilm İnstax Mini 9 & Tabu XL",
    "category": "Ses ve Kamera",
    "categorySlug": "ses-ve-kamera",
    "price": "530,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/520/1736937146-785614.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/520/1736937146-785614.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/520/1736937146-785614_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/520/1736937150-805369.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/520/1736937150-805369_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/520/1736937154-691865.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/520/1736937154-691865_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_24065698",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "10'lu Film & Fujifilm İnstax Mini 9 & Tabu XL kiralama ürünü."
    ]
  },
  {
    "slug": "gelecege-donus-oculus-vr-playstation-4-ps-plus-deluxe-uyeligi-2-kol",
    "name": "Oculus Quest 2 VR Gözlük + PlayStation 5 & PS Plus Deluxe Üyeliği & 2 Kol",
    "category": "Oyun ve Hobi",
    "categorySlug": "oyun-ve-hobi",
    "price": "720,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/454/3.png",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/454/3.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/454/3_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/454/4.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/454/4_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-000-expires-on_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/decathlon-kayak-tribord-100-3p-pe26-8940857-8902418-8771802-8771803-8851505-8790375-205-expires-on-20-01-2030_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_60322308",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Oculus Quest 2 VR Gözlük + PlayStation 5 & PS Plus Deluxe Üyeliği & 2 Kol kiralama ürünü."
    ]
  },
  {
    "slug": "hali-koltuk-yikama-sampuani",
    "name": "500 ML Halı koltuk yıkama şampuanı",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "100,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/467/petsise.png",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/467/petsise.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/467/petsise_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-000-expires-on_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/decathlon-kayak-tribord-100-3p-pe26-8940857-8902418-8771802-8771803-8851505-8790375-205-expires-on-20-01-2030_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/570/itiwit-sup-100-l-compact-blanc-et-bleu-8642807-000-expires-on-23-01-2034-1_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/557/1774518362-743181_min.jpg"
    ],
    "minDays": 3,
    "sku": "K47ZUVF9ZS",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "500 ML Halı koltuk yıkama şampuanı kiralama ürünü."
    ]
  },
  {
    "slug": "kanz-sleepside-plus-anne-yani-park-yatak-ve-oyun-parki",
    "name": "Kanz Sleepside +Plus Anne Yanı Park Yatak ve Oyun Parkı",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "50,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/470/1773222461-117472.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/470/1773222461-117472.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/470/1773222461-117472_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/470/1773222463-909160.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/470/1773222463-909160_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/470/1773222466-503959.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/470/1773222466-503959_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_43371385",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Kanz Sleepside +Plus Anne Yanı Park Yatak ve Oyun Parkı kiralama ürünü."
    ]
  },
  {
    "slug": "kapi-barfiks-bari-kas-gelistirme",
    "name": "Kapı Barfiks Barı - Kas Geliştirme",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "300,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/354/1764151770-678343.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/354/1764151770-678343.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/354/1764151770-678343_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/354/1764151772-580023.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/354/1764151772-580023_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/354/1764151775-817789.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/354/1764151775-817789_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_85480414",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Kapı Barfiks Barı - Kas Geliştirme kiralama ürünü."
    ]
  },
  {
    "slug": "karcher-hali-koltuk-deterjani-100-ml",
    "name": "Karcher Halı Koltuk Deterjanı 100 ml",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "45,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/722/1726306524-633869.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/722/1726306524-633869.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/722/1726306524-633869_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-000-expires-on_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/decathlon-kayak-tribord-100-3p-pe26-8940857-8902418-8771802-8771803-8851505-8790375-205-expires-on-20-01-2030_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/570/itiwit-sup-100-l-compact-blanc-et-bleu-8642807-000-expires-on-23-01-2034-1_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/557/1774518362-743181_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_61816856",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Karcher Halı Koltuk Deterjanı 100 ml kiralama ürünü."
    ]
  },
  {
    "slug": "karcher-k-3-basincli-yikama-makinasi-karcher-cam-temizleme-makinasi",
    "name": "Karcher K 3 Basınçlı Yıkama Makinası + Karcher Cam Temizleme Makinası",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "620,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/607/1738576713-268579.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/607/1738576713-268579.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/607/1738576713-268579_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/607/1738576716-434149.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/607/1738576716-434149_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/607/1738576718-335211.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/607/1738576718-335211_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_63024061",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Karcher K 3 Basınçlı Yıkama Makinası + Karcher Cam Temizleme Makinası kiralama ürünü."
    ]
  },
  {
    "slug": "karcher-sc-3-easyfix-buharli-temizlik-makinesi-17",
    "name": "Karcher SC 3 Easyfix Buharlı Temizlik Makinesi & 1 Adet Tek Kullanımlık Bez",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "620,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/431/sc3-easyfix-genel-ilan.png",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/431/sc3-easyfix-genel-ilan.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/431/sc3-easyfix-genel-ilan_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/431/ekran-resmi-2023-11-16-19-54-48.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/431/ekran-resmi-2023-11-16-19-54-48_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-000-expires-on_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/decathlon-kayak-tribord-100-3p-pe26-8940857-8902418-8771802-8771803-8851505-8790375-205-expires-on-20-01-2030_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_46366387",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Karcher SC 3 Easyfix Buharlı Temizlik Makinesi & 1 Adet Tek Kullanımlık Bez kiralama ürünü."
    ]
  },
  {
    "slug": "karcher-sc-3-easyfix-buharli-temizlik-makinesi-2-1",
    "name": "Cam Temizleme Aparatı& Karcher SC 3  Buharlı Temizlik Makinesi",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "630,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/960/sc3-easyfix-cam-silme-aparatli.png",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/960/sc3-easyfix-cam-silme-aparatli.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/960/sc3-easyfix-cam-silme-aparatli_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/960/1693987768-914657.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/960/1693987768-914657_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/960/1693987769-612041.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/960/1693987769-612041_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_13102773",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Cam Temizleme Aparatı& Karcher SC 3  Buharlı Temizlik Makinesi kiralama ürünü."
    ]
  },
  {
    "slug": "karcher-sc-3-easyfix-buharli-temizlik-makinesi-firca-ile-birlikte",
    "name": "Fırça ile Birlikte + Karcher SC 3 Easyfix Buharlı Temizlik Makinesi",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "630,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/409/sc3-easyfix-firca-ile-birlikte.png",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/409/sc3-easyfix-firca-ile-birlikte.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/409/sc3-easyfix-firca-ile-birlikte_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-000-expires-on_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/decathlon-kayak-tribord-100-3p-pe26-8940857-8902418-8771802-8771803-8851505-8790375-205-expires-on-20-01-2030_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/570/itiwit-sup-100-l-compact-blanc-et-bleu-8642807-000-expires-on-23-01-2034-1_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/558/1774518362-743181_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_34547212",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Fırça ile Birlikte + Karcher SC 3 Easyfix Buharlı Temizlik Makinesi kiralama ürünü."
    ]
  },
  {
    "slug": "karcher-se-3-compact-home-hali-koltuk-yikama-makinasi",
    "name": "Karcher SE 3 Compact Home Halı Koltuk Yıkama Makinası",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "690,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/346/1734472248-367576.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/346/1734472248-367576.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/346/1734472248-367576_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/346/1734472251-206957.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/346/1734472251-206957_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/518/4326_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/515/1736934193-615031_min.jpg"
    ],
    "minDays": 3,
    "sku": "42993_93104432",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Karcher SE 3 Compact Home Halı Koltuk Yıkama Makinası kiralama ürünü."
    ]
  },
  {
    "slug": "karcher-se-6-100-hali-ve-koltuk-yikama",
    "name": "Karcher SE 6.100 Halı ve Koltuk Yıkama Makinesi & 100 ML Karcher Halı Koltuk Deterjanı",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "750,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/060/ikili-urun-tasarimi-7.png",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/060/ikili-urun-tasarimi-7.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/060/ikili-urun-tasarimi-7_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/060/karcher-hali-koltuk-deterjani-100-ml.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/060/karcher-hali-koltuk-deterjani-100-ml_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-000-expires-on_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/decathlon-kayak-tribord-100-3p-pe26-8940857-8902418-8771802-8771803-8851505-8790375-205-expires-on-20-01-2030_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_87781070",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Karcher SE 6.100 Halı ve Koltuk Yıkama Makinesi & 100 ML Karcher Halı Koltuk Deterjanı kiralama ürünü."
    ]
  },
  {
    "slug": "kiwi-4320-koltuk-ve-hali-yikama-makinesi-pirantech-cok-fonksiyonlu-buharli-temizlik-makinasi",
    "name": "Kiwi 4320 Koltuk ve Halı Yıkama Makinesi + Pirantech Çok Fonksiyonlu Buharlı Temizlik Makinası & 100 ML Karcher Halı Koltuk Deterjanı",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "790,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/791/1743583940-812305.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/791/1743583940-812305.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/791/1743583940-812305_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-000-expires-on_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/decathlon-kayak-tribord-100-3p-pe26-8940857-8902418-8771802-8771803-8851505-8790375-205-expires-on-20-01-2030_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/570/itiwit-sup-100-l-compact-blanc-et-bleu-8642807-000-expires-on-23-01-2034-1_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/557/1774518362-743181_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_57790016",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Kiwi 4320 Koltuk ve Halı Yıkama Makinesi + Pirantech Çok Fonksiyonlu Buharlı Temizlik Makinası & 100 ML Karcher Halı Koltuk Deterjanı kiralama ürünü."
    ]
  },
  {
    "slug": "kiwi-4322-hali-yikama-ve-leke-cikartma-karcher-cam-temizleme-makinasi-100mlhali-koltuk-deterjani",
    "name": "Kiwi 4322 Halı Yıkama ve Leke Çıkartma & Karcher Cam Temizleme Makinası & 100ML Halı Koltuk Deterjanı",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "670,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/628/1738922782-147687.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/628/1738922782-147687.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/628/1738922782-147687_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/628/1738922786-980545.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/628/1738922786-980545_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/628/1738922789-864137.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/628/1738922789-864137_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_32112256",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Kiwi 4322 Halı Yıkama ve Leke Çıkartma & Karcher Cam Temizleme Makinası & 100ML Halı Koltuk Deterjanı kiralama ürünü."
    ]
  },
  {
    "slug": "kiwi-4325w-yeni-ekstra-pencere-temizleme-aparatli-koltuk-hali-yikama-ve-leke-cikartma-makinesi-100",
    "name": "Kiwi 4325w Yeni Ekstra Pencere Temizleme Aparatlı Koltuk Halı Yıkama Ve Leke Çıkartma Makinesi & 100 ml Halı Koltuk Deterjanı",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "600,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/882/1728125581-973128.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/882/1728125581-973128.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/882/1728125581-973128_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/882/1728125584-189219.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/882/1728125584-189219_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-000-expires-on_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/decathlon-kayak-tribord-100-3p-pe26-8940857-8902418-8771802-8771803-8851505-8790375-205-expires-on-20-01-2030_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_37514496",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Kiwi 4325w Yeni Ekstra Pencere Temizleme Aparatlı Koltuk Halı Yıkama Ve Leke Çıkartma Makinesi & 100 ml Halı Koltuk Deterjanı kiralama ürünü."
    ],
    "badge": "Yeni"
  },
  {
    "slug": "kiwi-4326",
    "name": "Kiwi Halı Koltuk Yıkama Makinesi 4326",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "600,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/518/4326.png",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/518/4326.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/518/4326_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-000-expires-on_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/decathlon-kayak-tribord-100-3p-pe26-8940857-8902418-8771802-8771803-8851505-8790375-205-expires-on-20-01-2030_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/570/itiwit-sup-100-l-compact-blanc-et-bleu-8642807-000-expires-on-23-01-2034-1_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/558/1774518362-743181_min.jpg"
    ],
    "minDays": 3,
    "sku": "DXMEF8ADCJ",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Kiwi Halı Koltuk Yıkama Makinesi 4326 kiralama ürünü."
    ]
  },
  {
    "slug": "kiwi-kwc-7130-uzaktan-kumandali-sivi-puskurtmeli-cam-silme-robotu-1-cift-kisiye-ozel-bez",
    "name": "Kiwi Kwc-7130 Uzaktan Kumandalı Sıvı Püskürtmeli Cam Silme Robotu + 1 Çift Kişiye Özel Bez",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "530,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/264/1758883325-900217.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/264/1758883325-900217.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/264/1758883325-900217_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/264/1758883328-524604.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/264/1758883328-524604_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/264/1758883330-479956.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/264/1758883330-479956_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_81278105",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Kiwi Kwc-7130 Uzaktan Kumandalı Sıvı Püskürtmeli Cam Silme Robotu + 1 Çift Kişiye Özel Bez kiralama ürünü."
    ]
  },
  {
    "slug": "kochler-profesyonel-kedi-kopek-hayvan-tuy-bakim-seti-elektrikli-vakum-sarjli-tiras-ve-tuy-toplama",
    "name": "Kochler Profesyonel Kedi Köpek Hayvan Tüy Bakım Seti - Elektrikli Vakum Şarjlı Tıraş Ve Tüy Toplama",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "470,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/038/1729863901-783175.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/038/1729863901-783175.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/038/1729863901-783175_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/038/1729863906-952065.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/038/1729863906-952065_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/038/1729863909-353362.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/038/1729863909-353362_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_71465610",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Kochler Profesyonel Kedi Köpek Hayvan Tüy Bakım Seti - Elektrikli Vakum Şarjlı Tıraş Ve Tüy Toplama kiralama ürünü."
    ]
  },
  {
    "slug": "logitech-g-g923-ps5-ps4-ve-pc-ile-uyumlu-yaris-direksiyonu-ve-pedallari-siyah",
    "name": "Logitech G G923 PS5, PS4 ve PC ile Uyumlu Yarış Direksiyonu",
    "category": "Oyun ve Hobi",
    "categorySlug": "oyun-ve-hobi",
    "price": "520,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/910/1728469044-497576.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/910/1728469044-497576.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/910/1728469044-497576_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/910/1728469049-967936.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/910/1728469049-967936_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/910/1728469053-472321.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/910/1728469053-472321_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_48061682",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Logitech G G923 PS5, PS4 ve PC ile Uyumlu Yarış Direksiyonu kiralama ürünü."
    ]
  },
  {
    "slug": "logitech-g29-direksiyon-pedal-shifter-seti",
    "name": "Logitech G29 Yarış Direksiyonu ( PS5, PS4 ve PC Uyumlu )",
    "category": "Oyun ve Hobi",
    "categorySlug": "oyun-ve-hobi",
    "price": "520,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/114/1674555127-645762.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/114/1674555127-645762.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/114/1674555127-645762_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/910/1728469044-497576_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/647/10_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/963/varsapp-ai_min.png"
    ],
    "minDays": 3,
    "sku": "3208_4",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Logitech G29 Yarış Direksiyonu ( PS5, PS4 ve PC Uyumlu ) kiralama ürünü."
    ]
  },
  {
    "slug": "mamaroo-4-0-app-ana-kucagi",
    "name": "4Moms Mamaroo 5.0 App Elektrikli Ana Kucağı",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "55,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/104/1674572940-478592.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/104/1674572940-478592.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/104/1674572940-478592_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-000-expires-on_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/decathlon-kayak-tribord-100-3p-pe26-8940857-8902418-8771802-8771803-8851505-8790375-205-expires-on-20-01-2030_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/570/itiwit-sup-100-l-compact-blanc-et-bleu-8642807-000-expires-on-23-01-2034-1_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/557/1774518362-743181_min.jpg"
    ],
    "minDays": 3,
    "sku": "4453_11627774",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "4Moms Mamaroo 5.0 App Elektrikli Ana Kucağı kiralama ürünü."
    ]
  },
  {
    "slug": "meta-quest-3-128-gb-vr-sanal-gerceklik-gozlugu",
    "name": "Oculus Meta Quest 3 128 GB VR Sanal Gerçeklik Gözlüğü",
    "category": "Oyun ve Hobi",
    "categorySlug": "oyun-ve-hobi",
    "price": "590,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/487/meta-quest-3-gear-roundup.png",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/487/meta-quest-3-gear-roundup.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/487/meta-quest-3-gear-roundup_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/487/meta-quest-3.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/487/meta-quest-3_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/507/1774517064-858513_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/506/1774445777-310635_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_85619825",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Oculus Meta Quest 3 128 GB VR Sanal Gerçeklik Gözlüğü kiralama ürünü."
    ]
  },
  {
    "slug": "mini-stepper-1",
    "name": "Decathlon Mini Stepper",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "50,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/461/domyos-ms500-beige-8734775-9027600-000-expires-on-01-12-2031-1.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/461/domyos-ms500-beige-8734775-9027600-000-expires-on-01-12-2031-1.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/461/domyos-ms500-beige-8734775-9027600-000-expires-on-01-12-2031-1_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/461/domyos-ms500-beige-8734775-9027600-000-expires-on-30-11-2026.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/461/domyos-ms500-beige-8734775-9027600-000-expires-on-30-11-2026_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/461/domyos-ms500-beige-8734775-9027600-000-expires-on-01-12-2031.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/461/domyos-ms500-beige-8734775-9027600-000-expires-on-01-12-2031_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_15837734",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Decathlon Mini Stepper kiralama ürünü."
    ]
  },
  {
    "slug": "oculus-quest-2-256gb-all-in-one-vr-sanal-gerceklik-gozlugu",
    "name": "En Popüler Oyunlar İle Birlikte Oculus (Meta) Quest 2 128GB VR Gözlük",
    "category": "Oyun ve Hobi",
    "categorySlug": "oyun-ve-hobi",
    "price": "580,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/942/2.png",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/942/2.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/942/2_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-000-expires-on_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/decathlon-kayak-tribord-100-3p-pe26-8940857-8902418-8771802-8771803-8851505-8790375-205-expires-on-20-01-2030_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/570/itiwit-sup-100-l-compact-blanc-et-bleu-8642807-000-expires-on-23-01-2034-1_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/558/1774518362-743181_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_8",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "En Popüler Oyunlar İle Birlikte Oculus (Meta) Quest 2 128GB VR Gözlük kiralama ürünü."
    ]
  },
  {
    "slug": "philips-neopix-320-projeksiyon-cihazi-full-hd-wi-fi-ve-bluetooth-lcd-led-80",
    "name": "PHILIPS Neopix 320 Projeksiyon Cihazı (Full HD Wi-Fi ve Bluetooth LCD LED 80'')",
    "category": "Ses ve Kamera",
    "categorySlug": "ses-ve-kamera",
    "price": "470,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/964/1705567227-670314.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/964/1705567227-670314.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/964/1705567227-670314_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/964/1705567229-693058.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/964/1705567229-693058_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/964/1705567230-528771.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/964/1705567230-528771_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_39696257",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "PHILIPS Neopix 320 Projeksiyon Cihazı (Full HD Wi-Fi ve Bluetooth LCD LED 80'') kiralama ürünü."
    ]
  },
  {
    "slug": "philips-projeksiyon-cihazi-neopix-ultra-2-android",
    "name": "PHILIPS Neopix Ultra 2 + 1080p Android Projeksiyon Cihazı",
    "category": "Ses ve Kamera",
    "categorySlug": "ses-ve-kamera",
    "price": "430,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/452/1674552126-415449.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/452/1674552126-415449.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/452/1674552126-415449_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/452/1674552128-879821.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/452/1674552128-879821_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/520/1736937146-785614_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/988/ikili-urun-tasarimi-3_min.png"
    ],
    "minDays": 3,
    "sku": "3208_41319102",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "PHILIPS Neopix Ultra 2 + 1080p Android Projeksiyon Cihazı kiralama ürünü."
    ]
  },
  {
    "slug": "pirantech-buharli-temizlik-makinesi-karcher-cam-temizleme-makinesi",
    "name": "Pirantech Buharlı Temizlik Makinesi + 1 Adet Tek Kullanımlık Bez & Karcher Cam Temizleme Makinesi",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "660,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/341/1721657906-116790.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/341/1721657906-116790.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/341/1721657906-116790_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-000-expires-on_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/decathlon-kayak-tribord-100-3p-pe26-8940857-8902418-8771802-8771803-8851505-8790375-205-expires-on-20-01-2030_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/570/itiwit-sup-100-l-compact-blanc-et-bleu-8642807-000-expires-on-23-01-2034-1_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/557/1774518362-743181_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_56517395",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Pirantech Buharlı Temizlik Makinesi + 1 Adet Tek Kullanımlık Bez & Karcher Cam Temizleme Makinesi kiralama ürünü."
    ]
  },
  {
    "slug": "pirantech-cok-fonksiyonlu-buharli-temizlik-makinasi-dyson-airstrait-sac-duzlestirici",
    "name": "Pirantech Çok Fonksiyonlu Buharlı Temizlik Makinası + Dyson Airstrait Saç Düzleştirici",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "780,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/746/1742295603-615388.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/746/1742295603-615388.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/746/1742295603-615388_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-000-expires-on_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/decathlon-kayak-tribord-100-3p-pe26-8940857-8902418-8771802-8771803-8851505-8790375-205-expires-on-20-01-2030_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/570/itiwit-sup-100-l-compact-blanc-et-bleu-8642807-000-expires-on-23-01-2034-1_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/558/1774518362-743181_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_58564148",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Pirantech Çok Fonksiyonlu Buharlı Temizlik Makinası + Dyson Airstrait Saç Düzleştirici kiralama ürünü."
    ]
  },
  {
    "slug": "remington-one-sac-kurutma-makinesi",
    "name": "Remington ONE Saç Kurutma Makinesi",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "240,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/380/1721977705-168204.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/380/1721977705-168204.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/380/1721977705-168204_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/380/2024-07-26-14-05-11.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/380/2024-07-26-14-05-11_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-000-expires-on_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/decathlon-kayak-tribord-100-3p-pe26-8940857-8902418-8771802-8771803-8851505-8790375-205-expires-on-20-01-2030_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_62465684",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Remington ONE Saç Kurutma Makinesi kiralama ürünü."
    ]
  },
  {
    "slug": "remington-pro-ion-sac-duzlestirici",
    "name": "Remington Pro-ion  Saç Düzleştirici",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "310,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/381/1721977875-211840.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/381/1721977875-211840.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/381/1721977875-211840_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/381/2024-07-26-14-03-57.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/381/2024-07-26-14-03-57_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-000-expires-on_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/decathlon-kayak-tribord-100-3p-pe26-8940857-8902418-8771802-8771803-8851505-8790375-205-expires-on-20-01-2030_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_99022156",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Remington Pro-ion  Saç Düzleştirici kiralama ürünü."
    ]
  },
  {
    "slug": "remington-proluxe-4u-1-arada-sac-masasi",
    "name": "Remington Proluxe 4'ü 1 Arada Saç Maşası",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "280,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/379/1721977519-900012.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/379/1721977519-900012.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/379/1721977519-900012_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/379/41oe8qyjyrl-sl500.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/379/41oe8qyjyrl-sl500_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-000-expires-on_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/decathlon-kayak-tribord-100-3p-pe26-8940857-8902418-8771802-8771803-8851505-8790375-205-expires-on-20-01-2030_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_45003913",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Remington Proluxe 4'ü 1 Arada Saç Maşası kiralama ürünü."
    ]
  },
  {
    "slug": "remington-s6077-one-sac-duzlestirici-bukle-masasi",
    "name": "Remington S6077 One Saç Düzleştirici & Bukle Maşası",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "250,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/392/1722336873-830475.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/392/1722336873-830475.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/392/1722336873-830475_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/392/1722336876-829936.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/392/1722336876-829936_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/392/1722336879-837115.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/392/1722336879-837115_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_97971249",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Remington S6077 One Saç Düzleştirici & Bukle Maşası kiralama ürünü."
    ]
  },
  {
    "slug": "roborock-q7-max-robot-supurge-beyaz",
    "name": "Roborock Q7 Max Robot Süpürge - Siyah",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "480,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/605/4.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/605/4.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/605/4_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/605/6.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/605/6_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/605/5.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/605/5_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_78941749",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Roborock Q7 Max Robot Süpürge - Siyah kiralama ürünü."
    ]
  },
  {
    "slug": "russell-hobbs-26451-56-distinctions-espresso-kahve-makinesi-1",
    "name": "Russell Hobbs 26451-56 Distinctions Espresso Kahve Makinesi",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "380,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/855/1744237598-171038.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/855/1744237598-171038.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/855/1744237598-171038_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/855/1744237601-625780.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/855/1744237601-625780_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/855/1744237603-779714.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/855/1744237603-779714_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_42286712",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Russell Hobbs 26451-56 Distinctions Espresso Kahve Makinesi kiralama ürünü."
    ]
  },
  {
    "slug": "russell-hobbs-26451-56-distinctions-espresso-kahve-makinesi-dyson-airstrait-sac-duzlestirici",
    "name": "Russell Hobbs 26451-56 Distinctions Espresso Kahve Makinesi + Dyson Airstrait Saç Düzleştirici",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "620,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/383/1734885687-234702.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/383/1734885687-234702.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/383/1734885687-234702_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/383/1734885688-640788.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/383/1734885688-640788_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/383/1734885689-425349.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/383/1734885689-425349_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_57918068",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Russell Hobbs 26451-56 Distinctions Espresso Kahve Makinesi + Dyson Airstrait Saç Düzleştirici kiralama ürünü."
    ]
  },
  {
    "slug": "russell-hobbs-26451-56-distinctions-espresso-kahve-makinesi-simart-otomatik-cam-temizleme-robotu",
    "name": "Russell Hobbs 26451-56 Distinctions Espresso Kahve Makinesi + Şımart Otomatik Cam Temizleme Robotu",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "630,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/384/1734885887-969138.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/384/1734885887-969138.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/384/1734885887-969138_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/384/1734885890-912934.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/384/1734885890-912934_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/384/1734885893-181521.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/384/1734885893-181521_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_41789929",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Russell Hobbs 26451-56 Distinctions Espresso Kahve Makinesi + Şımart Otomatik Cam Temizleme Robotu kiralama ürünü."
    ]
  },
  {
    "slug": "russell-hobbs-attentiv-filtre-kahve-makinesi",
    "name": "Russell Hobbs Attentiv Filtre Kahve Makinesi",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "320,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/376/1721976799-555183.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/376/1721976799-555183.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/376/1721976799-555183_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/376/1721976802-421978.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/376/1721976802-421978_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-000-expires-on_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/decathlon-kayak-tribord-100-3p-pe26-8940857-8902418-8771802-8771803-8851505-8790375-205-expires-on-20-01-2030_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_68565174",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Russell Hobbs Attentiv Filtre Kahve Makinesi kiralama ürünü."
    ]
  },
  {
    "slug": "simart-teknoloji-katya-z-akilli-robot-supurge",
    "name": "Şımart Teknoloji Katya Z Akıllı Robot Süpürge",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "470,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/841/1744062363-388711.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/841/1744062363-388711.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/841/1744062363-388711_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/841/1744062367-648874.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/841/1744062367-648874_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/841/1744062369-730515.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/841/1744062369-730515_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_89684409",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Şımart Teknoloji Katya Z Akıllı Robot Süpürge kiralama ürünü."
    ]
  },
  {
    "slug": "sony-playstation-5-825-gb-turkce-menu-2-ps5-dualsense",
    "name": "PlayStation 5 Digital Edition (2 Kol ve PlayStation Plus Deluxe Üyelik Dahil Paket)",
    "category": "Oyun ve Hobi",
    "categorySlug": "oyun-ve-hobi",
    "price": "620,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/963/varsapp-ai.png",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/963/varsapp-ai.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/963/varsapp-ai_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/963/2.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/963/2_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/963/3.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/963/3_min.png"
    ],
    "minDays": 3,
    "sku": "3208_76593460",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "PlayStation 5 Digital Edition (2 Kol ve PlayStation Plus Deluxe Üyelik Dahil Paket) kiralama ürünü."
    ],
    "featured": true
  },
  {
    "slug": "spotclean-pro-hali-koltuk-yikama-ve-leke-cikarma-makinesi",
    "name": "Bissell SpotClean Pro Halı - Koltuk Yıkama ve Leke Çıkarma Makinesi & 100 ML Halı Koltuk Deterjanı",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "670,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/468/1558n-spotclean-pro-front.png",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/468/1558n-spotclean-pro-front.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/468/1558n-spotclean-pro-front_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/468/1558n-spotclean-pro-cleaning-area-rug.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/468/1558n-spotclean-pro-cleaning-area-rug_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/468/1558n-spotclean-pro-cleaning-area-rug-1.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/468/1558n-spotclean-pro-cleaning-area-rug-1_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_65562720",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Bissell SpotClean Pro Halı - Koltuk Yıkama ve Leke Çıkarma Makinesi & 100 ML Halı Koltuk Deterjanı kiralama ürünü."
    ],
    "featured": true
  },
  {
    "slug": "stil-sahibi-temizlik-paketi-pirantech-cok-fonksiyonlu-buharli-temizlik-makinesi-dyson-airwrap",
    "name": "''Stil Sahibi Temizlik'' Paketi (Pirantech Çok Fonksiyonlu Buharlı Temizlik Makinesi  + Dyson Airwrap)",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "690,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/079/stil-sahibi.png",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/079/stil-sahibi.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/079/stil-sahibi_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/079/1706518980-273081.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/079/1706518980-273081_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/572/decathlon-pack-decouverte-sup-96-8862497-000-expires-on_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/571/decathlon-kayak-tribord-100-3p-pe26-8940857-8902418-8771802-8771803-8851505-8790375-205-expires-on-20-01-2030_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_59508842",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "''Stil Sahibi Temizlik'' Paketi (Pirantech Çok Fonksiyonlu Buharlı Temizlik Makinesi  + Dyson Airwrap) kiralama ürünü."
    ]
  },
  {
    "slug": "tabu-xl-kutu-oyunu-1",
    "name": "Tabu XL Kutu Oyunu",
    "category": "Oyun ve Hobi",
    "categorySlug": "oyun-ve-hobi",
    "price": "250,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/522/1674550882-473555.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/522/1674550882-473555.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/522/1674550882-473555_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/522/1674550884-449085.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/522/1674550884-449085_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/507/1774517064-858513_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/506/1774445777-310635_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_68195873",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Tabu XL Kutu Oyunu kiralama ürünü."
    ]
  },
  {
    "slug": "xbox-series-s-512",
    "name": "XBOX One S (2 Kol & Game Pass Ultimate Dahil Paket)",
    "category": "Oyun ve Hobi",
    "categorySlug": "oyun-ve-hobi",
    "price": "520,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/280/111.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/280/111.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/280/111_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/280/xbox-game-pass.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/280/xbox-game-pass_min.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/507/1774517064-858513_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/506/1774445777-310635_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_3",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "XBOX One S (2 Kol & Game Pass Ultimate Dahil Paket) kiralama ürünü."
    ]
  },
  {
    "slug": "xiaomi-mitu-katlanabilir-bebek-arabasi-1",
    "name": "Xiaomi Mitu Kabin Boy Bebek Arabası",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "320,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/028/1682689831-211763.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/028/1682689831-211763.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/028/1682689831-211763_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/028/1682689837-530920.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/028/1682689837-530920_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/028/1682689840-631097.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/028/1682689840-631097_min.jpg"
    ],
    "minDays": 3,
    "sku": "4453_11827630",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Xiaomi Mitu Kabin Boy Bebek Arabası kiralama ürünü."
    ]
  },
  {
    "slug": "yoyko-city-seyahat-sistem-3-in-1-bebek-arabasi",
    "name": "Yoyko City Seyahat Sistem 3 In 1 Bebek Arabası",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "70,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/478/1773237151-458224.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/478/1773237151-458224.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/478/1773237151-458224_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/478/1773237153-821129.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/478/1773237153-821129_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/478/1773237156-207341.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/478/1773237156-207341_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_90321664",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Yoyko City Seyahat Sistem 3 In 1 Bebek Arabası kiralama ürünü."
    ]
  },
  {
    "slug": "russell-hobbs-steam-genie-2si-1-arada-buharli-utu",
    "name": "Russell Hobbs Steam Genie 2'si 1 Arada Buharlı Ütü",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "290,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/378/1721977305-389660.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/378/1721977305-389660.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/378/1721977305-389660_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/378/2024-07-26-14-07-51.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/378/2024-07-26-14-07-51_min.png"
    ],
    "minDays": 3,
    "sku": "3208_57172373",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Russell Hobbs Steam Genie 2'si 1 Arada Buharlı Ütü kiralama ürünü."
    ]
  },
  {
    "slug": "russell-hobbs-one-temperature-buharli-utu",
    "name": "Russell Hobbs One Temperature Buharlı ütü",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "280,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/377/1721977054-439714.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/377/1721977054-439714.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/377/1721977054-439714_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/377/2024-07-26-14-09-16.png",
      "https://www.varsapp.com/idea/iq/19/myassets/products/377/2024-07-26-14-09-16_min.png"
    ],
    "minDays": 3,
    "sku": "3208_48511563",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Russell Hobbs One Temperature Buharlı ütü kiralama ürünü."
    ]
  },
  {
    "slug": "karcher-toz-torbasi",
    "name": "Karcher Toz Torbası",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "90,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/245/1720523636-497648.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/245/1720523636-497648.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/245/1720523636-497648_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_47314545",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Karcher Toz Torbası kiralama ürünü."
    ]
  },
  {
    "slug": "karcher-cam-silme-aparati",
    "name": "Karcher Cam Silme Aparatı",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "60,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/244/1720523967-164565.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/244/1720523967-164565.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/244/1720523967-164565_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_37638680",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Karcher Cam Silme Aparatı kiralama ürünü."
    ]
  },
  {
    "slug": "sc-uyumlu-yuvarlak-firca-1-adet",
    "name": "Buharlı Uyumlu Yuvarlak Fırça (1 Adet)",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "150,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/030/1706269051-207937.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/030/1706269051-207937.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/030/1706269051-207937_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_40673387",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Buharlı Uyumlu Yuvarlak Fırça (1 Adet) kiralama ürünü."
    ]
  },
  {
    "slug": "el-tipi-mikrofiber-bez-1-adet",
    "name": "El Tipi Mikrofiber Bez (1 Adet)",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "80,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/029/1706268878-199228.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/029/1706268878-199228.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/029/1706268878-199228_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/029/1706268880-156300.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/029/1706268880-156300_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/029/1706268882-775702.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/029/1706268882-775702_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_14723095",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "El Tipi Mikrofiber Bez (1 Adet) kiralama ürünü."
    ]
  },
  {
    "slug": "sc-easyfix-serisi-icin-tek-kullanimlik-bez-1-adet",
    "name": "SC Easyfix serisi için tek kullanımlık bez (1 Adet)",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "70,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/028/1706268591-189784.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/028/1706268591-189784.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/028/1706268591-189784_min.jpg"
    ],
    "minDays": 3,
    "sku": "3208_63196189",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "SC Easyfix serisi için tek kullanımlık bez (1 Adet) kiralama ürünü."
    ]
  },
  {
    "slug": "vestel-vakum-makinesi-a-sinifi-yenilenmis",
    "name": "Vestel Vakum Makinesi A Sınıfı",
    "category": "Ev ve Yaşam",
    "categorySlug": "ev-yasam",
    "price": "430,00 TL",
    "image": "https://www.varsapp.com/idea/iq/19/myassets/products/702/1675411205-420674.jpg",
    "gallery": [
      "https://www.varsapp.com/idea/iq/19/myassets/products/702/1675411205-420674.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/702/1675411205-420674_min.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/702/1675411208-220863.jpg",
      "https://www.varsapp.com/idea/iq/19/myassets/products/702/1675411208-220863_min.jpg"
    ],
    "minDays": 3,
    "sku": "1271_91056381",
    "owner": "Varsapp",
    "location": "81 İl ve Tüm İlçelerinde!",
    "description": [
      "Vestel Vakum Makinesi A Sınıfı kiralama ürünü."
    ]
  }
];

export function findProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

const supplementalCategoryMemberships: Record<string, Set<string>> = {
  decathlon: new Set([
    "bundle-stand-up-paddle-l-boy-beyaz-mavi-10-100",
    "decathlon-10-6-sisirilebilir-stand-up-paddle",
    "decathlon-3-kisilik-kamp-seti",
    "decathlon-4-kisilik-kamp-cadiri-arpenaz-4-1-fresh-black",
    "decathlon-bundle-iwiko-plaj-seti",
    "decathlon-bundle-sisme-kano-2-3-kisilik-mavi-100",
    "decathlon-kas-gelistirme-agirlik-seti-20-kg",
    "decathlon-katlanabilir-mekik-sehpasi",
    "decathlon-katlanir-yuruyus-bandi-14-km-sa-compact-run100",
    "decathlon-oxelo-fit3-jr-cocuk-fitness-pateni-35-38",
    "decathlon-quechua-2-seconds-easy-fresh-black-2-kisilik-kamp-cadiri",
    "decathlon-quechua-4-kisilik-kamp-seti",
    "decathlon-quechua-katlanabilir-sogutucu-30-litre-96-saat-serin-tutma-900-fresh",
    "decathlon-sisme-stand-up-paddle-seti-9-6-1-kisilik-sari-100",
    "decathlon-tribord-100-essentiel-1-2-kisilik-sisirilebilir-kano-seti",
    "mini-stepper-1",
  ]),
  "ev-yasam": new Set([
    "bir-oyun-daha-sonra-temizlik-paketi-playstation-5-karcher-sc-3-buharli-temizlik-makinesi",
    "bu-surus-deneyimi-gercek-mi-playstation-5-digital-edition-oyun-konsolu-logitech-g29-direksiyon-pedal-shifter-seti",
  ]),
  "oyun-ve-hobi": new Set([
    "decathlon-2-kisilik-kamp-seti",
    "decathlon-3-kisilik-kamp-seti",
    "decathlon-quechua-2-seconds-easy-fresh-black-2-kisilik-kamp-cadiri",
    "decathlon-quechua-2-seconds-xl-fresh-black-3-kisilik-kamp-cadiri",
    "decathlon-quechua-4-kisilik-kamp-seti",
    "decathlon-quechua-mh100-fresh-black-2-kisilik-kamp-cadiri",
    "fujifilm-instax-mini-11-1",
    "fujifilm-instax-mini-9-tabu-xl",
  ]),
  "ses-ve-kamera": new Set([
    "fujifilm-instax-mini-9-dyson-airwraptm-multi-styler-complete-uzun-blue-blush-2",
  ]),
};

export function productsByCategory(slug: string) {
  if (slug === "tum-kategoriler") {
    return products;
  }

  const supplemental = supplementalCategoryMemberships[slug];

  return products.filter(
    (product) => product.categorySlug === slug || supplemental?.has(product.slug),
  );
}

export function searchProducts(query: string, limit = 8) {
  const normalized = query.trim().toLocaleLowerCase("tr-TR");
  if (!normalized) {
    return [];
  }

  return products
    .filter((product) => {
      const haystack = `${product.name} ${product.category} ${product.sku}`.toLocaleLowerCase("tr-TR");
      return haystack.includes(normalized);
    })
    .slice(0, limit);
}
