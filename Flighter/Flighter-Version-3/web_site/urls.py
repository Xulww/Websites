from django.urls import path, include
from . import views

app_name = 'web_site'
urlpatterns = [
    path('', views.index, name='index'),
    path('register/', views.register, name='register'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),
    path('user/<username>/', views.profile, name='profile'),
]
