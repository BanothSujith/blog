const mongoose = require('mongoose')

async function connection(url) {
    try {
        await mongoose.connect(url);
        console.log('Connected to MongoDB');
      } catch (error) {
        console.error('Database connection failed:', error.message);
      }
}


module.exports = connection