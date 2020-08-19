from django.views import generic
from django.contrib import messages
from django.shortcuts import render, redirect, get_object_or_404, reverse
from django.db.models import Q
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from django.utils import timezone
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from hashlib import sha1
import pytz
from .models import Flight, Ticket, User

class IndexView(generic.ListView):
    template_name = 'flights/index.html'

    def get_queryset(self):
        qs = Flight.objects.all()
        query = self.request.GET.get("q", None)

        if query:
            if not query.isnumeric():
                qs = qs.filter(airport__icontains=query)
            elif query and query.isnumeric():
                qs = qs.filter(price=query)

        return qs.annotate_is_expired()
    
class DetailView(generic.DetailView):
    model = Flight
    template_name = 'flights/detail.html'

class FlightCreate(CreateView):
    model = Flight
    fields = ["datetime", "airport", "price", "seats"]

    def form_valid(self, form):
        self.obj = form.save(commit=False)
        self.obj.created_by_id = self.request.user.id
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
        self.obj.user_id = self.request.user.id
        self.obj.save()

        return redirect('flights:index')

class TicketDelete(DeleteView):
    model = Ticket
    success_url = reverse_lazy('flights:index')
