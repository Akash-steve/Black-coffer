import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});

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

// Routes
app.get('/api/data', async (req: Request, res: Response) => {
  try {
    const { end_year, topic, sector, region, pestle, source, country, city } = req.query;
    
    let filter: any = {};
    if (end_year) filter.end_year = end_year;
    if (topic) filter.topic = topic;
    if (sector) filter.sector = sector;
    if (region) filter.region = region;
    if (pestle) filter.pestle = pestle;
    if (source) filter.source = source;
    if (country) filter.country = country;
    if (city) filter.city = city;

    const data = await Data.find(filter);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/filters', async (req: Request, res: Response) => {
  try {
    const filters = await Data.aggregate([
      {
        $group: {
          _id: null,
          end_years: { $addToSet: '$end_year' },
          topics: { $addToSet: '$topic' },
          sectors: { $addToSet: '$sector' },
          regions: { $addToSet: '$region' },
          pestles: { $addToSet: '$pestle' },
          sources: { $addToSet: '$source' },
          countries: { $addToSet: '$country' },
          cities: { $addToSet: '$city' }
        }
      }
    ]);

    res.json(filters[0] || {});
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
