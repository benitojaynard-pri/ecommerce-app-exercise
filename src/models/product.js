const mongoose = require('mongoose');

// Define the schema to include all original data fields
const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Retaining the numeric ID
  name: { type: String, required: true },            // Mapped from title
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },        // Added to schema
  image: { type: String, required: true },           // Added to schema
  rating: {                                          // Added nested schema
    rate: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  stock: { type: Number, required: true, min: 0, default: 0 } // Required by your first schema
});

const Product = mongoose.model('Product', productSchema);

export const products = [
  {
    "id": 1,
    "name": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "category": "men's clothing",
    "image": "https://files.cdn.printful.com/o/upload/bfl-image/1f/20335_l_a-black-shirt-with-white-text-on-it",
    "rating": {
      "rate": 3.9,
      "count": 120
    },
    "stock": 10
  },
  {
    "id": 2,
    "name": "Mens Casual Premium Slim Fit T-Shirts ",
    "price": 22.3,
    "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
    "category": "men's clothing",
    "image": "https://files.cdn.printful.com/o/upload/bfl-image/1f/20335_l_a-black-shirt-with-white-text-on-it",
    "rating": {
      "rate": 4.1,
      "count": 259
    },
    "stock": 25
  },
  {
    "id": 3,
    "name": "Mens Cotton Jacket",
    "price": 55.99,
    "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing.",
    "category": "men's clothing",
    "image": "https://files.cdn.printful.com/o/upload/bfl-image/1f/20335_l_a-black-shirt-with-white-text-on-it",
    "rating": {
      "rate": 4.7,
      "count": 500
    },
    "stock": 15
  },
  {
    "id": 4,
    "name": "Mens Casual Slim Fit",
    "price": 15.99,
    "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person.",
    "category": "men's clothing",
    "image": "https://files.cdn.printful.com/o/upload/bfl-image/1f/20335_l_a-black-shirt-with-white-text-on-it",
    "rating": {
      "rate": 2.1,
      "count": 430
    },
    "stock": 50
  },
  {
    "id": 5,
    "name": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    "price": 695,
    "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl.",
    "category": "jewelery",
    "image": "https://files.cdn.printful.com/o/upload/bfl-image/1f/20335_l_a-black-shirt-with-white-text-on-it",
    "rating": {
      "rate": 4.6,
      "count": 400
    },
    "stock": 5
  },
  {
    "id": 6,
    "name": "Solid Gold Petite Micropave ",
    "price": 168,
    "description": "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States.",
    "category": "jewelery",
    "image": "https://files.cdn.printful.com/o/upload/bfl-image/1f/20335_l_a-black-shirt-with-white-text-on-it",
    "rating": {
      "rate": 3.9,
      "count": 70
    },
    "stock": 8
  },
  {
    "id": 7,
    "name": "White Gold Plated Princess",
    "price": 9.99,
    "description": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her.",
    "category": "jewelery",
    "image": "https://files.cdn.printful.com/o/upload/bfl-image/1f/20335_l_a-black-shirt-with-white-text-on-it",
    "rating": {
      "rate": 3,
      "count": 400
    },
    "stock": 40
  },
  {
    "id": 8,
    "name": "Pierced Owl Rose Gold Plated Stainless Steel Double",
    "price": 10.99,
    "description": "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
    "category": "jewelery",
    "image": "https://files.cdn.printful.com/o/upload/bfl-image/1f/20335_l_a-black-shirt-with-white-text-on-it",
    "rating": {
      "rate": 1.9,
      "count": 100
    },
    "stock": 100
  },
  {
    "id": 9,
    "name": "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
    "price": 64,
    "description": "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity.",
    "category": "electronics",
    "image": "https://files.cdn.printful.com/o/upload/bfl-image/1f/20335_l_a-black-shirt-with-white-text-on-it",
    "rating": {
      "rate": 3.3,
      "count": 203
    },
    "stock": 12
  },
  {
    "id": 10,
    "name": "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    "price": 109,
    "description": "Easy upgrade for faster boot up, shutdown, application load and response.",
    "category": "electronics",
    "image": "https://files.cdn.printful.com/o/upload/bfl-image/1f/20335_l_a-black-shirt-with-white-text-on-it",
    "rating": {
      "rate": 2.9,
      "count": 470
    },
    "stock": 18
  },
  {
    "id": 11,
    "name": "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
    "price": 109,
    "description": "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds.",
    "category": "electronics",
    "image": "https://files.cdn.printful.com/o/upload/bfl-image/1f/20335_l_a-black-shirt-with-white-text-on-it",
    "rating": {
      "rate": 4.8,
      "count": 319
    },
    "stock": 22
  },
  {
    "id": 12,
    "name": "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
    "price": 114,
    "description": "Expand your PS4 gaming experience, Play anywhere Fast and easy setup.",
    "category": "electronics",
    "image": "https://files.cdn.printful.com/o/upload/bfl-image/1f/20335_l_a-black-shirt-with-white-text-on-it",
    "rating": {
      "rate": 4.8,
      "count": 400
    },
    "stock": 7
  },
  {
    "id": 13,
    "name": "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
    "price": 599,
    "description": "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology.",
    "category": "electronics",
    "image": "https://files.cdn.printful.com/o/upload/bfl-image/1f/20335_l_a-black-shirt-with-white-text-on-it",
    "rating": {
      "rate": 2.9,
      "count": 250
    },
    "stock": 3
  },
  {
    "id": 14,
    "name": "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
    "price": 999.99,
    "description": "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side.",
    "category": "electronics",
    "image": "https://files.cdn.printful.com/o/upload/bfl-image/1f/20335_l_a-black-shirt-with-white-text-on-it",
    "rating": {
      "rate": 2.2,
      "count": 140
    },
    "stock": 2
  },
  {
    "id": 15,
    "name": "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    "price": 56.99,
    "description": "Note:The Jackets is US standard size, Please choose size as your usual wear.",
    "category": "women's clothing",
    "image": "https://files.cdn.printful.com/o/upload/bfl-image/1f/20335_l_a-black-shirt-with-white-text-on-it",
    "rating": {
      "rate": 2.6,
      "count": 235
    },
    "stock": 14
  },
  {
    "id": 16,
    "name": "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    "price": 29.95,
    "description": "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON.",
    "category": "women's clothing",
    "image": "https://files.cdn.printful.com/o/upload/bfl-image/1f/20335_l_a-black-shirt-with-white-text-on-it",
    "rating": {
      "rate": 2.9,
      "count": 340
    },
    "stock": 20
  },
  {
    "id": 17,
    "name": "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
    "price": 39.99,
    "description": "Lightweight perfet for trip or casual wear---Long sleeve with hooded.",
    "category": "women's clothing",
    "image": "https://files.cdn.printful.com/o/upload/bfl-image/1f/20335_l_a-black-shirt-with-white-text-on-it",
    "rating": {
      "rate": 3.8,
      "count": 679
    },
    "stock": 11
  },
  {
    "id": 18,
    "name": "MBJ Women's Solid Short Sleeve Boat Neck V ",
    "price": 9.85,
    "description": "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach.",
    "category": "women's clothing",
    "image": "https://files.cdn.printful.com/o/upload/bfl-image/1f/20335_l_a-black-shirt-with-white-text-on-it",
    "rating": {
      "rate": 4.7,
      "count": 130
    },
    "stock": 35
  },
  {
    "id": 19,
    "name": "Opna Women's Short Sleeve Moisture",
    "price": 7.95,
    "description": "100% Polyester, Machine wash, 100% cationic polyester interlock.",
    "category": "women's clothing",
    "image": "https://files.cdn.printful.com/o/upload/bfl-image/1f/20335_l_a-black-shirt-with-white-text-on-it",
    "rating": {
      "rate": 4.5,
      "count": 146
    },
    "stock": 42
  },
  {
    "id": 20,
    "name": "DANVOUY Womens T Shirt Casual Cotton Short",
    "price": 12.99,
    "description": "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck.",
    "category": "women's clothing",
    "image": "https://files.cdn.printful.com/o/upload/bfl-image/1f/20335_l_a-black-shirt-with-white-text-on-it",
    "rating": {
      "rate": 3.6,
      "count": 145
    },
    "stock": 28
  }
];

export default products;