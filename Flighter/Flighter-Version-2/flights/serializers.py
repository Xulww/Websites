from rest_framework import serializers
from .models import Flight

class FlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flight
        fields = ('datetime', 'airport', 'price', 'seats')
        #fields = '__all__' returns everything
        