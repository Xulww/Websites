from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.core.paginator import Paginator
from django.contrib.auth.models import User
from flights.models import Flight, Ticket
from .forms import UserForm


def index(request):
    try:
        page_size = int(request.GET.get('flights_per_page', '5'))
    except (TypeError, ValueError):
        page_size = 5

    try:
        page = int(request.GET.get('page'))
    except (TypeError, ValueError):
        page = 1

    flights_qs = Flight.objects.all().order_by(
        '-datetime'
    ).prefetch_all_tickets().prefetch_last_tickets()

    paginator = Paginator(flights_qs, page_size)
    flights = paginator.get_page(page)

    return render(request, 'web_site/index.html', {
        'flights': flights,
        'fpp': page_size
    })


def index_old(request):
    # tickets = Ticket.objects.raw("SELECT id, flight_id, group_concat(DISTINCT user_id) as fgroup FROM flights_ticket GROUP BY flight_id")
    # print(tickets.__dict__)

    # tickets = Ticket.objects.raw(
    # "SELECT * FROM flights_ticket WHERE flights_ticket.flight_id IN (SELECT flights_flight.id FROM flights_flight)")

    flights_per_page = request.GET.get('flights_per_page', '5')
    page = request.GET.get('page')

    flights = Flight.objects.raw("""
        SELECT *
        FROM (
            SELECT ROW_NUMBER () OVER (
                ORDER BY flights_flight.datetime DESC
            ) RowNum,
            flights_flight.id,
            flights_flight.datetime,
            flights_flight.airport
            FROM flights_flight
        )
        WHERE RowNum <= 200
    """)

    paginator = Paginator(flights, flights_per_page)

    flights = paginator.get_page(page)

    flight_id_map = {f.id: f for f in flights}

    tickets = Ticket.objects.raw("""
        SELECT *
        FROM flights_ticket
        WHERE flights_ticket.flight_id IN ({})""".format(
        ",". join(["%s"]*len(flights))
    ),  params=[f.id for f in flights])

    for ticket in tickets:
        flight = flight_id_map[ticket.flight_id]
        try:
            flight.tickets.append(ticket)
        except AttributeError:
            flight.tickets = [ticket]

    last_tickets = Ticket.objects.raw("""
        SELECT t.* FROM
        flights_ticket t
        WHERE t.id = (
            SELECT ft.id
            FROM flights_ticket ft
            WHERE ft.flight_id = t.flight_id
            ORDER BY added_on DESC, id DESC
            LIMIT 1
            )
            and t.flight_id in ({})
    """.format(
        ",". join(["%s"]*len(flights))
    ),  params=[f.id for f in flights])

    for ticket in last_tickets:
        flight = flight_id_map[ticket.flight_id]
        flight.last_ticket = ticket

    return render(request, 'web_site/index.html', {'flights': flights, 'fpp': flights_per_page, 'tickets': tickets, 'last_tickets': last_tickets})


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
