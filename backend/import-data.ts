import mongoose from 'mongoose';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dashboard';
mongoose.connect(MONGODB_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Data Schema
interface IData extends mongoose.Document {
  end_year: string;
  intensity: number;
  sector: string;
  topic: string;
  insight: string;
  url: string;
  region: string;
  start_year: string;
  impact: string;
  added: string;
  published: string;
  country: string;
  relevance: number;
  pestle: string;
  source: string;
  title: string;
  likelihood: number;
}

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

const Data = mongoose.model<IData>('Data', dataSchema);

// Import data
const importData = async () => {
  try {
    // Clear existing data
    await Data.deleteMany({});
    console.log('Cleared existing data');

    // Read JSON file
    const filePath = path.resolve(process.cwd(), '..', 'jsondata.json');
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
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
