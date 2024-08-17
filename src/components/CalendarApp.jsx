import { useState } from "react";
import Calendar from "./Calendar";
import EventForm from "./EventForm";
import FilterEvents from "./EventFilter";
import { useEvents } from "../hooks/useEvents";

const CalendarApp = () => {
  const { events, deleteEvent } = useEvents();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [filter, setFilter] = useState("All");

  const filteredEvents =
    filter === "All"
      ? events
      : events.filter((event) => event.category === filter);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowEventForm(true);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleDelete = () => {
    deleteEvent(selectedEvent.id);
    setShowEventForm(false);
    setSelectedDate(null);
    setSelectedEvent(null);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="p-4">
      <FilterEvents onFilterChange={handleFilterChange} />
      <Calendar
        events={filteredEvents}
        onDateClick={handleDateClick}
        onEventClick={handleEventClick}
      />
      {selectedDate && showEventForm && (
        <EventForm
          event={selectedEvent}
          date={selectedDate}
          onCancel={() => {
            setShowEventForm(false);
            setSelectedDate(null);
            setSelectedEvent(null);
          }}
          onDelete={handleDelete}
          onSave={() => {
            setShowEventForm(false);
            setSelectedDate(null);
            setSelectedEvent(null);
          }}
        />
      )}
    </div>
  );
};

export default CalendarApp;
