import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

@csrf_exempt
@require_http_methods(["POST"])
def calculate_tithi(request):
    try:
        body = json.loads(request.body.decode("utf-8"))
        date = body.get("date")        
        location = body.get("location")  

        if not date or not location:
            return JsonResponse({
                'success': False,
                'error': 'Missing date or location in request'
            }, status=400)
        
        return JsonResponse({
            'success': True,
            'tithi': "Tithi calculation not implemented yet"
        })
        
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=500)