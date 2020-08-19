import React, { useState, useEffect } from "react";
import axios from "axios";

import { getHeaders } from "../../utils";

import TicketCard from "./TicketCard/TicketCard";
import styles from "./Ticket.less";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [userId, setUserId] = useState(0);
  const [flightId, setFlightId] = useState(0);
  const [username, setUsername] = useState("");
  const [datetime, setDatetime] = useState();

  // getting the logged in user
  const fetchUser = async () => {
    try {
      const response = await axios.get("/api/logged_in/");
      const { data } = response;

      setUserId(data.id);
      setUsername(data.username);
    } catch (error) {
      console.error(error);
    }
  };

  const buyTicket = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `/api/flights/${flightId}/create-ticket/`,
        {
          flight: flightId,
          user: userId,
        },
        { headers: getHeaders() }
      );

      const { data } = response;

      setTickets([]);
      setTickets(Object.values(data.tickets));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTicket = async (ticketId) => {
    try {
      await axios.delete(`/api/flights/${flightId}/delete-ticket/`, {
        data: { ticket_id: ticketId },
        headers: getHeaders(),
      });

      const newTickets = tickets.filter((ticket) => ticket.id !== ticketId);
      setTickets(newTickets);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // axios.get('http://dev.flighter.com/api/flights/')
    //     .then(response => {
    //         const data = response.data;
    //         console.log(data)
    //         setTickets(Objects.values(data))
    //     }).catch(error => {
    //         console.log(error);
    //     });

    const fetchTickets = async () => {
      try {
        // getting the flight id from the url
        const urlPath = window.location.pathname;
        const filter = /\d+/;
        const id = Number(urlPath.match(filter)[0]);

        setFlightId(id);

        const response = await axios.get(`/api/flights/${id}`);
        const { data } = response;

        setDatetime(new Date(data.datetime));
        setTickets(Object.values(data.tickets));
      } catch (error) {
        console.error(error);
      }
    };

    fetchTickets();
    fetchUser();
  }, []);

  const flightTickets = tickets.map((ticket) => {
    return (
      <TicketCard
        key={ticket.id}
        id={ticket.id}
        loggedUser={username}
        name={ticket.user.username}
        deleteTicket={deleteTicket}
      />
    );
  });

  const today = new Date();
  const date = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  const dateTime = new Date(`${date} ${time}`);

  return (
    <div>
      {flightTickets}
      {username && dateTime < datetime ? (
        <div>
          <p>Buy a ticket for this flight</p>
          <form method="POST">
            <input type="hidden" id={flightId} value={flightId} />
            <input type="hidden" id={userId} value={userId} />
            <button
              className={styles.ticketBtn}
              type="submit"
              onClick={buyTicket}
            >
              Buy
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default Tickets;
