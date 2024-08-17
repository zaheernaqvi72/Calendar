import { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

export const EventContext = createContext();

const eventReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      return [...state, action.payload];
    case 'EDIT_EVENT':
      return state.map(event =>
        event.id === action.payload.id ? action.payload : event
      );
    case 'DELETE_EVENT':
      return state.filter(event => event.id !== action.payload);
    default:
      return state;
  }
};

export const EventProvider = ({ children }) => {
  const [events, dispatch] = useReducer(eventReducer, []);

  const addEvent = event => {
    dispatch({ type: 'ADD_EVENT', payload: event });
  };

  const editEvent = event => {
    dispatch({ type: 'EDIT_EVENT', payload: event });
  };

  const deleteEvent = id => {
    dispatch({ type: 'DELETE_EVENT', payload: id });
  };

  return (
    <EventContext.Provider value={{ events, addEvent, editEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};

EventProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
