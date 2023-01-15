# STEP FOOT

Here you will find foot step of while making the project.

## SETUP

1. We need `django-admin` to start our project
   - So we will start by installing the python packages using `pip`.
   - To ensure that we will use the correct pip we will use `python3 -m` syntax.
   - `$ python3 -m pip install django`
2. We will start our project now.
   - `$ django-admin startproject <PROJECT_NAME>`
3. To test that everything is fine, we will launch our project.
   - Navigate to our project folder: `$ cd <PROJECT_NAME>`
   - `$ python3 manage.py runserver`
   - Now we will see Django default interface. Good game 🎊

## START OUR FIRST APP

1. After starting our project we will start our app:
   - `$ python3 manage.py startapp <APPLICATION_NAME>`

## MAKING OUR FIRST URL:

> NB: We have named our project `settings` while creating the project

```python
# backend/settings/urls.py

...

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('gestion_personne.urls'), name='api-gestion-personne') # <-- This point to our application urls
    # ... another path to application or a standalone path.
]
```

> NB: choose **plurals nouns** over another endpoint names

```python
# backend/gestion_personne/urls.py

from django.urls import path

from . import views # <--- Link to our function that is linked to our path.

urlpatterns = [
    path('personnes', views.personnes_list_view, name='api-personnes-view'),
    # ... another path for the application.
]
```

```python
# backend/gestion_personne/views.py

from http import HTTPStatus # <--- Used against **magic number** anti-pattern

from django.http.request import HttpRequest
from django.http.response import JsonResponse

# ... <-- set of function used in views

# Create your views here.
def personnes_list_view(request: HttpRequest):
    if request.method == "GET":
        personnes = get_liste_personnes_from_db()
        json_personnes = []
        for personne in personnes:
            json_personnes.append(transform_object_to_json(personne), status=HTTPStatus.OK)
        return JsonResponse(json_personnes, safe=False) # <--- used because we are supposed to pass a list-object not a dict-object to `JSONResponse`
    elif request.method == "POST":
        request_payload = request.body
        personne = create_personne_in_db_with_data(request_payload)
        json_personne = transform_object_to_json(personne)
        return JsonResponse(json_personne, status=HTTPStatus.CREATED)
    else:
        return JsonResponse({ 'error': HTTPStatus.METHOD_NOT_ALLOWED.phrase }, status=HTTPStatus.METHOD_NOT_ALLOWED)
```
