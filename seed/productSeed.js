const mongoose = require('mongoose');
const Product = require('../models/Product');


const products = [
  {
    name: 'laptop',
    description: 'Description for laptop 1',
    price: 10000,
    imageUrl: 'https://example.com/laptop.jpg'
  },
  {
    name: 'laptop 2',
    description: 'Description for laptop 2',
    price: 200073,
    imageUrl: 'https://example.com/laptop2.jpg'
  },
  {
    name: 'laptop 3',
    description: 'Description for laptop 3',
    price: 300000,
    imageUrl: 'https://example.com/laptop3.jpg'
  }
];

async function seed() {
  try {
     const count = await Product.countDocuments();
    if(count > 0){
      return;
    }
    await Product.insertMany(products); 

    console.log('Products seeded successfully!');
  
  } catch (error) {
    console.error('Error seeding products:', error);
  
  }
}

module.exports = seed;