import React from "react";
import PropTypes from "prop-types";

import styles from "./TicketCard.less";

const TicketCard = (props) => {
  return (
    <div>
      <hr />
      <p className={styles.para}>{props.name}</p>
      {props.loggedUser === props.name ? (
        <button
          className={styles.deleteBtn}
          type="button"
          onClick={() => {
            props.deleteTicket(props.id);
          }}
        >
          X
        </button>
      ) : null}
      <hr />
    </div>
  );
};

TicketCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  loggedUser: PropTypes.string.isRequired,
  deleteTicket: PropTypes.func.isRequired,
};

export default TicketCard;
