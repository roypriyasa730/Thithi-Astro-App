# Thithi Astrology App

A full-stack web application that calculates Hindu lunar calendar Thithi based on astronomical data and user's location.

## Features

- 🌙 **Real-time Thithi Calculation**: Uses astronomical calculations with PyEphem library
- 📍 **Geolocation Support**: Automatically detects user's location or allows manual input
- 🎯 **Accurate Location Data**: Reverse geocoding using Geopy
- ✨ **Auspicious Occasions**: Identifies special occasions based on Thithi
- 🔍 **Learn More**: Quick Google search integration for Thithi significance

## Tech Stack

### Frontend (React)
- React 18
- Modern hooks (useState, useEffect)
- Responsive design with inline styles
- Geolocation API integration

### Backend (Django)
- Django 4.2.7
- Django REST Framework capabilities
- CORS support for cross-origin requests
- SQLite database

### Astronomical Libraries
- **PyEphem**: Astronomical calculations for Sun and Moon positions
- **Geopy**: Reverse geocoding for location details

## Project Structure

```
Thithi-Astro-App/
├── django-app/                 # Django backend
│   ├── manage.py              # Django management script
│   ├── requirements.txt       # Python dependencies
│   ├── db.sqlite3            # SQLite database
│   └── thithi_app/           # Main Django app
│       ├── __init__.py
│       ├── settings.py       # Django settings
│       ├── urls.py          # URL routing
│       ├── views.py         # API endpoints
│       ├── wsgi.py          # WSGI configuration
│       └── apps.py          # App configuration
└── react-app/                # React frontend
    ├── src/
    │   ├── App.js           # Main React component
    │   └── App.css          # Styles
    ├── public/
    └── package.json         # Node.js dependencies
```

## Setup Instructions

### Prerequisites
- Python 3.9+
- Node.js 16+
- Virtual environment support

### Backend Setup (Django)

1. Navigate to the django-app directory:
   ```bash
   cd django-app
   ```

2. Create and activate virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run database migrations:
   ```bash
   python manage.py migrate
   ```

5. Start Django development server:
   ```bash
   python manage.py runserver 8000
   ```

   Backend will be available at: http://127.0.0.1:8000

### Frontend Setup (React)

1. Navigate to the react-app directory:
   ```bash
   cd react-app
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start React development server:
   ```bash
   npm start
   ```

   Frontend will be available at: http://localhost:3000

## API Endpoints

### POST /api/location/
Get location details from coordinates
```json
{
  "latitude": 12.9716,
  "longitude": 77.5946
}
```

### POST /api/tithi/
Calculate Thithi for given location and date
```json
{
  "latitude": 12.9716,
  "longitude": 77.5946,
  "date": "2025-08-24"
}
```

## Usage

1. **Access the App**: Open http://localhost:3000 in your browser
2. **Select Date**: Choose the date for Thithi calculation (defaults to today)
3. **Get Location**: Click "Get My Location" to auto-detect or manually enter location
4. **Calculate Thithi**: Click "Get Thithi" to see the lunar calendar information
5. **Learn More**: Click "Learn More About This Thithi" to search for significance

## Development

Both servers support hot-reload during development:
- React: Changes in `/react-app/src/` trigger automatic browser refresh
- Django: Changes in `/django-app/thithi_app/` trigger automatic server restart

## Dependencies

### Python (Backend)
- Django==4.2.7
- django-cors-headers==4.3.1
- pyephem==4.1.4
- geopy==2.4.0

### Node.js (Frontend)
- React 18
- React Scripts (Create React App)

## Features in Detail

### Thithi Calculation
- Uses PyEphem library for precise astronomical calculations
- Calculates Sun and Moon positions for given date and location
- Determines lunar phase and corresponding Thithi (1-30)
- Identifies Shukla Paksha (waxing) or Krishna Paksha (waning)

### Location Services
- Browser geolocation API for automatic location detection
- Reverse geocoding to convert coordinates to readable addresses
- Manual location input as fallback option

### Occasions Detection
- Identifies special occasions based on calculated Thithi
- Supports festivals like Ganesh Chaturthi (Chaturthi)
- Recognizes important observances like Ekadashi Vrat

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure Django server is running on port 8000
2. **Location Permission**: Browser may block geolocation - grant permission when prompted
3. **Module Import Errors**: Ensure all Python dependencies are installed in virtual environment

### Server Ports
- React Frontend: http://localhost:3000
- Django Backend: http://127.0.0.1:8000

## License

This project is for educational and personal use.






####################
# Navigate to your project directory
cd /Users/priyasaroy/Documents/StoreRoom/Thithi-Astro-App

# Create virtual environment
python3 -m venv .venv

# Activate virtual environment
source .venv/bin/activate

# Install required packages in virtual environment
pip install Django==4.2.7 django-cors-headers pyephem requests

# Navigate to django-app directory
cd django-app

# Run Django server
python manage.py runserver
