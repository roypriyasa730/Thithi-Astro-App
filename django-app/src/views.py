from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
import ephem
from datetime import datetime
import pytz
from geopy.geocoders import Nominatim
import math


@csrf_exempt
@require_http_methods(["POST"])
def get_location_details(request):
    """
    Get location details from latitude and longitude using reverse geocoding
    """
    try:
        data = json.loads(request.body)
        latitude = float(data.get('latitude'))
        longitude = float(data.get('longitude'))
        
        # Use Nominatim geocoder to get location details
        geolocator = Nominatim(user_agent="thithi_app")
        location = geolocator.reverse(f"{latitude}, {longitude}")
        
        if location:
            # Extract useful information from the address
            address = location.raw.get('address', {})
            
            # Build location details
            location_details = {
                'city': address.get('city') or address.get('town') or address.get('village') or address.get('suburb'),
                'state': address.get('state'),
                'country': address.get('country'),
                'postal_code': address.get('postcode'),
                'full_address': location.address,
                'latitude': latitude,
                'longitude': longitude
            }
            
            return JsonResponse({
                'success': True,
                'location': location_details
            })
        else:
            return JsonResponse({
                'success': False,
                'error': 'Location not found'
            }, status=404)
            
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def calculate_tithi(request):
    """
    Calculate tithi based on location and date
    """
    try:
        data = json.loads(request.body)
        latitude = float(data.get('latitude'))
        longitude = float(data.get('longitude'))
        date_str = data.get('date')  # Expected format: YYYY-MM-DD
        
        # Parse the date
        if date_str:
            date_obj = datetime.strptime(date_str, '%Y-%m-%d')
        else:
            date_obj = datetime.now()
        
        # Create an observer at the given location
        observer = ephem.Observer()
        observer.lat = str(latitude)
        observer.long = str(longitude)
        observer.date = date_obj.strftime('%Y/%m/%d 12:00:00')  # Use noon
        
        # Create Sun and Moon objects
        sun = ephem.Sun()
        moon = ephem.Moon()
        
        # Compute positions
        sun.compute(observer)
        moon.compute(observer)
        
        # Get longitude in degrees
        sun_long = math.degrees(sun.hlong)
        moon_long = math.degrees(moon.hlong)
        
        # Calculate the lunar phase (difference between Moon and Sun)
        lunar_phase = moon_long - sun_long
        if lunar_phase < 0:
            lunar_phase += 360
        
        # Calculate tithi (1 tithi = 12 degrees)
        tithi_number = int(lunar_phase / 12) + 1
        if tithi_number > 30:
            tithi_number = 30
        
        # Tithi names
        tithi_names = [
            "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
            "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
            "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima",
            "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
            "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
            "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Amavasya"
        ]
        
        tithi_name = tithi_names[tithi_number - 1]
        
        # Determine if it's Shukla Paksha (waxing) or Krishna Paksha (waning)
        if tithi_number <= 15:
            paksha = "Shukla Paksha"
        else:
            paksha = "Krishna Paksha"
        
        return JsonResponse({
            'success': True,
            'tithi': {
                'number': tithi_number,
                'name': tithi_name,
                'paksha': paksha,
                'date': date_str or date_obj.strftime('%Y-%m-%d'),
                'lunar_phase_degrees': round(lunar_phase, 2),
                'sun_longitude': round(sun_long, 2),
                'moon_longitude': round(moon_long, 2)
            }
        })
        
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=500)
