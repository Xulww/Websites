from rest_framework import serializers
from flights.models import Flight, Ticket
from django.contrib.auth.models import User

class FlightSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        fieldset = kwargs.pop('fieldset', None)
        super().__init__(*args, **kwargs)

        if fieldset == "fieldset_flight_extended":
            self.fields.update({
                'tickets': serializers.ListField(
                    child=TicketSerializer(), source="ticket_set.all"
                )
            })
            #self.fields.pop("seats", None) #removes field

    class Meta:
        model = Flight
        fields = ('datetime', 'airport', 'price', 'seats')
        #fields = '__all__' returns everything

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class TicketSerializer(serializers.ModelSerializer):
    # user = UserSerializer()

    class Meta:
        model = Ticket
        fields = '__all__'
        depth = 1
    
class TicketCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'