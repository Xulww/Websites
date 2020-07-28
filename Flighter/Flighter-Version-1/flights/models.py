from django.db import models
from django.urls import reverse
from django.utils import timezone


class Person(models.Model):
    name = models.CharField(max_length=255)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class FlightQuerySet(models.QuerySet):
    def annotate_is_expired(self):
        return self.annotate(is_expired=models.Case(models.When(datetime__lt=timezone.now(), then=1), default=0, output_field=models.IntegerField()))

    def not_expired(self):
        return self.exclude(is_expired=1)

class Flight(models.Model):
    datetime = models.DateTimeField(default=timezone.now)
    #2020-07-27 07:44:24.680347
    airport = models.CharField(max_length=500)
    price = models.FloatField()
    seats = models.IntegerField()
    created_by = models.ForeignKey(Person, on_delete=models.CASCADE, default=1)

    objects = FlightQuerySet.as_manager()

    def get_absolute_url(self):
        return reverse('flights:detail', kwargs={'pk': self.pk})

    def __str__(self):
        return str(self.datetime) + ' - ' + self.airport

    # @property
    # def is_expired(self):
    #     return self.datetime < timezone.now()

class Ticket(models.Model):
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE)
    name = models.ForeignKey(Person, on_delete=models.CASCADE, default=1)

    def get_absolute_url(self):
        return reverse('flights:detail', kwargs={'pk': self.flight.pk})

    def __str__(self):
        return self.name + ' ' + self.surname
        