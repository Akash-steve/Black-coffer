# Data Visualization Dashboard

A comprehensive data visualization dashboard built with React, Node.js, and MongoDB.

## Project Structure

```
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── FilterPanel.tsx
│   │   │   └── Charts.tsx
│   │   ├── App.tsx
│   │   └── index.tsx
│   └── package.json
├── backend/           # Node.js Express API
│   ├── server.js
│   ├── import-data.js
│   └── package.json
└── jsondata.json      # Source data file
```

## Features

- **Interactive Dashboard**: Real-time data visualization with filtering capabilities
- **Multiple Chart Types**: Bar charts, pie charts, and line charts using Recharts
- **Advanced Filtering**: Filter by end year, topic, sector, region, PEST, source, country, and city
- **Responsive Design**: Built with Material-UI for a modern, responsive interface
- **RESTful API**: Express.js backend with MongoDB integration

## Setup Instructions

### Prerequisites

1. **Node.js and npm**: Download and install from [nodejs.org](https://nodejs.org/)
2. **MongoDB**: Install MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)

### Installation

1. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Install Frontend Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

3. **Set up MongoDB**:
   - Start MongoDB service
   - Import the data:
   ```bash
   cd backend
   node import-data.js
   ```

### Running the Application

1. **Start the Backend Server**:
   ```bash
   cd backend
   npm start
   ```
   The API will run on `http://localhost:5000`

2. **Start the Frontend**:
   ```bash
   cd frontend
   npm start
   ```
   The dashboard will open at `http://localhost:3000`

## API Endpoints

- `GET /api/data` - Fetch filtered data
- `GET /api/filters` - Get available filter options

## Data Visualization

The dashboard includes:

1. **Intensity by Sector**: Bar chart showing average intensity across different sectors
2. **Topics Distribution**: Pie chart displaying the distribution of topics
3. **Likelihood vs Relevance**: Line chart comparing likelihood and relevance metrics

## Filtering

Users can filter data by:
- End Year
- Topic
- Sector
- Region
- PEST (Political, Economic, Social, Technological)
- Source
- Country
- City

## Technology Stack

### Frontend
- React 18
- TypeScript
- Material-UI (MUI)
- Recharts
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS

## Development

To run in development mode with hot reload:

1. Backend: `npm run dev` (uses nodemon)
2. Frontend: `npm start` (React development server)
