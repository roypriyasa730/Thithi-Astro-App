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
        # For demonstration, we will mock the API response
        tithi = "Shukla Paksha Tritiya"
        occasions = ["Akshaya Tritiya"]

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