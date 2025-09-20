import json
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods


from prokerala_api import ApiClient

API_KEY = "0e73d00b-375b-4d1f-a51f-8220b3a50339"
API_Secret ="NXGzpe4RMX0hEmhCsIjLPUVHFnwabO9RXcLF7zXg"


@csrf_exempt
@require_http_methods(["POST"])
def calculate_tithi(request):

    try:
        
        return JsonResponse({
            'success': True,
            'tithi': "response from prokerala api"
        })
        
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=500)
    
import requests    
@csrf_exempt
@require_http_methods(["POST"])
def get_location_name(request):
    try:
        body = json.loads(request.body.decode("utf-8"))
        lat = body.get("lat")
        lon = body.get("lon")

        if lat is None or lon is None:
            return JsonResponse({
                "success": False,
                "error": "Latitude and Longitude required"
            }, status=400)

        # Use OpenStreetMap Nominatim API

        url = f"https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=json"
        response = requests.get(url, headers={"User-Agent": "django-app"})
        data = response.json()

        place_name = data.get("display_name", "Unknown location")

        return JsonResponse({
            "success": True,
            "place": place_name,
            "lat": lat,
            "lon": lon
        })

    except Exception as e:
        return JsonResponse({
            "success": False,
            "error": str(e)
        }, status=500)