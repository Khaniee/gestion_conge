from django.shortcuts import render
from django.http.response import HttpResponse, JsonResponse
from django.http.request import HttpRequest
from django.views.decorators.csrf import csrf_exempt

import json

# Create your views here.

@csrf_exempt
def get_personnes(request):
    liste = [ { "name": "LOVA "}, { "name": "KHANIE "}]
    return JsonResponse(liste, safe=False)

@csrf_exempt 
def post_greeting(request: HttpRequest, name):
    if request.method == "POST":
        return JsonResponse(name, safe=False)
    return JsonResponse({"error": "PAS avec POST"})