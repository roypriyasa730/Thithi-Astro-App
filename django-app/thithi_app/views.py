import json
import requests 
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

        
API_KEY = "0e73d00b-375b-4d1f-a51f-8220b3a50339"
API_Secret ="NXGzpe4RMX0hEmhCsIjLPUVHFnwabO9RXcLF7zXg"
@csrf_exempt
@require_http_methods(["POST"])
def calculate_tithi(request):
    try:
        body = json.loads(request.body.decode("utf-8"))
        date = body.get("date")
        lat = body.get("lat")
        lon = body.get("lon")
        timezone = body.get("timezone")

        # Build the API request
        url = f"https://api.prokerala.com/v2/astrology/panchang?ayanamsa=lahiri&latitude={lat}&longitude={lon}&datetime={date}T06:00:00&timezone={timezone}"

        headers = {
            "X-Api-Key": "0e73d00b-375b-4d1f-a51f-8220b3a50339",
            "X-Api-Secret": "NXGzpe4RMX0hEmhCsIjLPUVHFnwabO9RXcLF7zXg"
        }
        api_response = requests.get(url, headers=headers).json()

        # Extract tithi and occasions from api_response (add error handling if needed)
        tithi = api_response.get("tithi") (ok)
        occasions = api_response.get("occasions")

        response = {
            "date": date,
            "coordinates": {"lat": lat, "lon": lon},
            "tithi": tithi,
            "occasions": occasions
        }
        return JsonResponse(response)
    except Exception as e:
        return JsonResponse({"success": False, "error": str(e)}, status=500)
   
 

@csrf_exempt
@require_http_methods(["POST"])
def get_location_name(request):
   
    try:
        body = json.loads(request.body.decode("utf-8"))
        lat = body.get("lat")
        lon = body.get("lon")
        # For demonstration, we will mock the location name
        location_name = "Kolkata, India"

        response = {
            "coordinates": {"lat": lat, "lon": lon},
            "location_name": location_name
        }
        return JsonResponse(response)
    except Exception as e:
        return JsonResponse({"success": False, "error": str(e)}, status=500)