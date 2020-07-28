from django.views import generic
from django.contrib import messages
from django.shortcuts import render, redirect, get_object_or_404, reverse
from django.db.models import Q
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from hashlib import sha1
from django.utils import timezone
import pytz
from .forms import RegisterForm, LoginForm
from .models import Person, Flight, Ticket

class IndexView(generic.ListView):
    template_name = 'flights/index.html'

    def get_queryset(self):
        qs = Flight.objects.all()
        query = self.request.GET.get("q", None)

        if query:
            qs = qs.filter(airport__icontains=query)

        return qs.annotate_is_expired()
    
class DetailView(generic.DetailView):
    model = Flight
    template_name = 'flights/detail.html'

class FlightCreate(CreateView):
    model = Flight
    fields = ["datetime", "airport", "price", "seats"]

    def form_valid(self, form):
        self.obj = form.save(commit=False)
        self.obj.created_by_id = self.request.session.get('user_id')
        self.obj.save()

        return redirect('flights:index')

class FlightUpdate(UpdateView):
    model = Flight
    fields = ["datetime", "airport", "price", "seats"]

    def form_valid(self, form):
        self.obj = form.save(commit=False)
        # self.obj.created_by_id = self.request.session.get('user_id')
        self.obj.save()

        return redirect('flights:index')

class FlightDelete(DeleteView):
    model = Flight
    success_url = reverse_lazy('flights:index')

class TicketCreate(CreateView):
    model = Ticket
    fields = ["flight"]

    def get_form(self, *args, **kwargs):
        form = super().get_form(*args, **kwargs)
        form.fields['flight'].queryset = Flight.objects.all().annotate_is_expired().not_expired()
        
        return form

    def form_valid(self, form):
        self.obj = form.save(commit=False)
        self.obj.name_id = self.request.session.get('user_id')
        self.obj.save()

        return redirect('flights:index')

def register(request):
    if request.session.get('user_id'):
        return redirect('flights:index')
        

    form = RegisterForm(request.POST or None)
    
    if form.is_valid():
        name = form.cleaned_data['name']
        password1 = form.cleaned_data['password1'].encode('utf-8')
        pass_hash = sha1(password1).hexdigest()
        person = Person.objects.create(name=name, password=pass_hash)
        messages.success(request, 'Welcome')
        request.session['user_id'] = person.id

        return redirect('flights:index')
		
    return render(request, 'flights/register.html', {
		'form': form
	})

def login(request):
    if request.session.get('user_id'):
        return redirect('flights:index')
        
    if request.method == 'POST':
        form = LoginForm(request.POST)
		
        if form.is_valid():
            person = Person.objects.get(name=form.cleaned_data['name'])
            messages.success(request, 'Login successfully')
            request.session['user_id'] = person.id

            return redirect('flights:index')
    else:
        form = LoginForm()

    return render(request, 'flights/login.html', {
		'form': form
	})

def logout(request):
	request.session.pop('user_id', None)

	return redirect('flights:login') 