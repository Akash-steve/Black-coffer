const mongoose = require('mongoose');
const fs = require('fs');

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Data Schema
const dataSchema = new mongoose.Schema({
  end_year: String,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: String,
  impact: String,
  added: String,
  published: String,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number
});

const Data = mongoose.model('Data', dataSchema);

// Import data
const importData = async () => {
  try {
    // Clear existing data
    await Data.deleteMany({});
    console.log('Cleared existing data');

    // Read JSON file
    const jsonData = JSON.parse(fs.readFileSync('../jsondata.json', 'utf8'));
    console.log(`Found ${jsonData.length} records to import`);

    // Insert data
    await Data.insertMany(jsonData);
    console.log('Data imported successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error importing data:', error);
    mongoose.connection.close();
  }
};

importData();
