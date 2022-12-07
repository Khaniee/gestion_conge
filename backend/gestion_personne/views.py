from http import HTTPStatus # <--- Used against **magic number** anti-pattern

from django.http.request import HttpRequest
from django.http.response import JsonResponse
from django.middleware.csrf import get_token

import json

from dataclasses import dataclass, asdict

# models (Not implemented in database but for mockup only):

@dataclass
class Personne:
    name: str
    age: str


# models managers for mocked models:

LISTE = [Personne('Jean Matthieu', 32), Personne('Marie Claire', 28)]

def get_liste_personnes_from_db():
    return LISTE

def create_personne_in_db_with_data(data):
    print(data)
    personne = Personne(
        data.get('name', "No name set"),
        data.get('age', 0)
    )
    LISTE.append(personne)
    return personne

# serializer for dataclass class:

def transform_dataclass_to_dict(obj):
    return asdict(obj)

# error handlers:

def method_not_allowed():
    return JsonResponse({ 'error': HTTPStatus.METHOD_NOT_ALLOWED.phrase }, status=HTTPStatus.METHOD_NOT_ALLOWED)

#  validations des payloads:

def personnes_post_payload_is_valid(request_payload: object):
    errors = {}
    is_valid = True
    
    name = request_payload['name'] # type:str
    if not name:
        is_valid = False
        errors['name'] = []
        errors['name'].append('This is required')
    
    age = request_payload['age'] # type:int
    if not age:
        is_valid = False
        errors['age'] = []
        errors['age'].append('This is required')
    
    return is_valid, errors

# Create your views here.

def personnes_list_view(request: HttpRequest):
    if request.method == "GET":
        personnes = get_liste_personnes_from_db()
        dict_personnes = []
        for personne in personnes:
            dict_personnes.append(transform_dataclass_to_dict(personne))
        return JsonResponse(dict_personnes, safe=False, status=HTTPStatus.OK)
    elif request.method == "POST":
        request_payload = json.loads(request.body)
        is_valid, errors = personnes_post_payload_is_valid(request_payload)
        
        if is_valid:
            personne = create_personne_in_db_with_data(request_payload)
            dict_personne = transform_dataclass_to_dict(personne)
            return JsonResponse(dict_personne, status=HTTPStatus.CREATED)

        return JsonResponse({ 'error': errors }, status=HTTPStatus.BAD_REQUEST)
    else:
        return method_not_allowed()

def get_csrf(request: HttpRequest):
    if request.method == "GET":
        csrf = get_token(request)
        return JsonResponse({ "csrf": csrf })
    else:
        return method_not_allowed()
