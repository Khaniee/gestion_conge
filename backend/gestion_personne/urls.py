from django.urls import path

from . import views 

urlpatterns = [
    path('csrf', views.get_csrf, name='api-get-csrf'),
    path('personnes', views.personnes_list_view, name='api-personnes-view'),
]
