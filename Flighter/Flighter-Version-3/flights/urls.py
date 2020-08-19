from django.urls import path
from . import views

app_name = 'flights'
urlpatterns= [
    path('', views.IndexView.as_view(), name='index'),
    path('<int:pk>/', views.DetailView.as_view(), name='detail'),
    path('tickets/', views.TicketCreate.as_view(), name='ticket-add'),
    path('add/',  views.FlightCreate.as_view(), name='flight-add'),
    path('update/<int:pk>/',  views.FlightUpdate.as_view(), name='flight-update'),
    path('<int:pk>/delete/',  views.FlightDelete.as_view(), name='flight-delete'),
    path('tickets/<int:pk>/delete/',  views.TicketDelete.as_view(), name='ticket-delete'),
]
