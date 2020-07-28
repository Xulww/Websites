from django.contrib import admin
from .models import Person, Flight, Ticket

admin.site.register(Person)
admin.site.register(Flight)
admin.site.register(Ticket)
