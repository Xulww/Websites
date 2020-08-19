from django.core.management.base import BaseCommand, CommandError
from datetime import datetime, timezone
from django.utils.timezone import make_aware
from flights.models import Flight
import requests

class Command(BaseCommand):
    help = "Creates new flights by fetching data from an API"

    def handle(self, *args, **options):
        url = "https://dxdancho:test1234@opensky-network.org/api/flights/departure?airport=LBSF&begin=1593475200&end=1593907200"
        #https://developer.flightstats.com/ 
        response = requests.get(url)
        emp_data = response.json()
        
        for e in emp_data:
            try:
                f = Flight.defaults.get(datetime=make_aware(datetime.utcfromtimestamp(e['firstSeen'])), airport=e['estDepartureAirport'])
                
                print('Flight exists')
            except Flight.DoesNotExist:
                f = Flight(datetime=make_aware(datetime.utcfromtimestamp(e['firstSeen'])), airport=e['estDepartureAirport'])
                f.save()
                
                print('Flight added')
