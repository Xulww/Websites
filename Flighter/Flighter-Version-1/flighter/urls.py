from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('flights/', include('flights.urls')),
    path('admin/', admin.site.urls),
]
