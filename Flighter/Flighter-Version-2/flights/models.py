from django.db import models
from django.urls import reverse
from django.utils import timezone
from django.contrib.auth.models import User

class FlightQuerySet(models.QuerySet):
    def annotate_is_expired(self):
        return self.annotate(is_expired=models.Case(models.When(datetime__lt=timezone.now(), then=1), default=0, output_field=models.IntegerField()))

    def not_expired(self):
        return self.exclude(is_expired=1)


class FlightManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted=False)


class DefaultFlightManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset()


class Flight(models.Model):
    datetime = models.DateTimeField(default=timezone.now)
    #2020-07-27 07:44:24.680347
    airport = models.CharField(max_length=500)
    price = models.FloatField(blank=True, null=True)
    seats = models.IntegerField(blank=True, null=True)
    created_by = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE, default=1)
    is_deleted = models.BooleanField(default=False)
    objects = FlightManager.from_queryset(FlightQuerySet)()
    defaults = DefaultFlightManager.from_queryset(FlightQuerySet)()

    def get_absolute_url(self):
        return reverse('flights:detail', kwargs={'pk': self.pk})

    def __str__(self):
        return str(self.datetime) + ' - ' + self.airport

    # @property
    # def is_expired(self):
    #     return self.datetime < timezone.now()

class Ticket(models.Model):
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE)
    user = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE, default=1)

    def get_absolute_url(self):
        return reverse('flights:detail', kwargs={'pk': self.flight.pk})

    def __str__(self):
        return self.user.username
        