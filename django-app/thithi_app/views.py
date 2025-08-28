from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

@csrf_exempt
@require_http_methods(["POST"])
def calculate_tithi(request):
    try:
        data = request.POST
        date = data.get('date', 'unknown date')
        location = data.get('location', 'unknown location')
        return JsonResponse({
            'success': True,
            "tithi": f"Mock Tithi for {date} at {location}"
        })
        
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=500)
