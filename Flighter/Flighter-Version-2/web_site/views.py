from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.models import User
from flights.models import Flight, Ticket
from .forms import UserForm

def index(request):
    return render(request, 'web_site/index.html', {})

def register(request):
    if request.user.id:
        return redirect('flights:index')

    form = UserForm(request.POST or None, register=True)

    if form.is_valid():
        user = form.save(commit=False)
        username = form.cleaned_data['username']
        password = form.cleaned_data['password']
        messages.success(request, 'Welcome')
        user.set_password(password)
        user.save()
        user = authenticate(username=username, password=password)

        if user:
            if user.is_active:
                login(request, user)
        
                return redirect('flights:index')
    
    return render(request, 'web_site/register.html', {'form': form})

def login_user(request):
    if request.user.id:
        return redirect('flights:index')

    if request.method == "POST":
        form = UserForm(request.POST)
        username = request.POST['username']
        password = request.POST['password']
        messages.success(request, 'Login successfully')
        user = authenticate(username=username, password=password)

        if user:
            if user.is_active:
                login(request, user)

                return redirect('flights:index')
    else:
        form = UserForm()

    return render(request, 'web_site/login.html', {'form': form})

def logout_user(request):
    logout(request)

    return redirect('web_site:login')

def profile(request, username):
    if not request.user.id:
        return redirect('web_site:login')

    user = User.objects.get(username=username)
    tickets = Ticket.objects.filter(user=user)
    flights = Flight.objects.filter(created_by=user)

    return render(request, 'web_site/profile.html', {'user': user, 'tickets': tickets, 'flights': flights})
    
           