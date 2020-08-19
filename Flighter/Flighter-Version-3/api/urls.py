from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

app_name = 'api'
urlpatterns= [
    path('flights/',  views.FlightList.as_view(), name='flight-list-api'),
    path('flights/<int:pk>/',  views.flight_detail_get, name='flight-detail-api-get'),
    path('flights/<int:pk>/create-ticket/', views.flight_detail_create, name='flight-detail-api-create'),
    path('flights/<int:pk>/delete-ticket/', views.flight_detail_delete, name='flight-detail-api-delete'),
    path('logged_in/', views.logged_in, name='logged-in-api')
]

urlpatterns = format_suffix_patterns(urlpatterns)