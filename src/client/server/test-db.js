// test-db.js
const { sequelize, ProductModel } = require('./models/product'); 

async function test() {
  try {
    // 1. Test the connection
    await sequelize.authenticate();
    console.log('✅ Connection has been established successfully.');

    // 2. Test the query
    const products = await ProductModel.findAll();
    console.log('✅ Query successful! Found:', products.length, 'products.');
    console.log('First Product:', products[0]?.toJSON() || 'Table is empty');

  } catch (error) {
    console.error('❌ Unable to connect or query the database:');
    console.error(error);
  } finally {
    await sequelize.close();
  }
}

test();