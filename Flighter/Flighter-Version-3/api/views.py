from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from flights.models import Flight, Ticket, User
from .serializers import FlightSerializer, TicketSerializer, UserSerializer, TicketCreateSerializer


class FlightList(APIView):
    def get(self, request):
        flights = Flight.objects.all()
        serializer = FlightSerializer(flights, many=True)

        return Response(serializer.data)
        
@csrf_exempt
@api_view(['GET'])
def flight_detail_get(request, pk):
    try:
        flight = Flight.objects.get(pk=pk)
    except Flight.DoesNotExist:
        return Response(status=404)
    
    if request.method == 'GET':
        serializer = FlightSerializer(flight, fieldset="fieldset_flight_extended")

        return Response(serializer.data)

@csrf_exempt
@api_view(['POST'])
def flight_detail_create(request, pk):
    try:
        flight = Flight.objects.get(pk=pk)
    except Flight.DoesNotExist:
        return Response(status=404)

    if request.method == 'POST':
        serializer = TicketCreateSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            serializer = FlightSerializer(flight, fieldset="fieldset_flight_extended")

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['DELETE'])
def flight_detail_delete(request, pk):
    if request.method == 'DELETE':
        ticket = Ticket.objects.get(id=request.data['ticket_id'])
        
        ticket.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@csrf_exempt
@api_view(['GET'])
def logged_in(request):
        serializer = UserSerializer(request.user)

        return Response(serializer.data)