import { useState } from "react";
import PropTypes from "prop-types";
import { useEvents } from "../hooks/useEvents";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const EventForm = ({ event, date, onCancel, onSave, onDelete }) => {
  const { addEvent, editEvent, deleteEvent } = useEvents();
  const [title, setTitle] = useState(event ? event.title : "");
  const [eventDate, setEventDate] = useState(event ? event.date : date);
  const [category, setCategory] = useState(event ? event.category : "Work");

  const handleDelete = () => {
    if (event) {
      deleteEvent(event.id);
      onDelete(event);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: event ? event.id : Date.now(),
      title,
      date: eventDate,
      category,
    };
    event ? editEvent(newEvent) : addEvent(newEvent);
    onSave();
  };

  return (
    <div className="p-4 border rounded-lg shadow-md my-6">
      <h2 className="text-xl font-bold mb-4 text-center">
        {title == "" ? "New Event" : title}
      </h2>
      <div className="flex flex-wrap justify-between p-3">
        <p><strong>Date:</strong> {eventDate}</p>
        <p><strong>Category:</strong> {category}</p>
      </div>

      <hr />
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 my-6">
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Date"
          type="date"
          variant="outlined"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          required
        />
        <Select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
        >
          <MenuItem value="Work">Work</MenuItem>
          <MenuItem value="Personal">Personal</MenuItem>
        </Select>
        <div className="flex justify-end space-x-4 ">
          <Button variant="contained" type="submit" color="success">
            {event ? "Update" : "Add Event"}
          </Button>
          {event && (
            <Button variant="outlined" color="warning" onClick={handleDelete}>
              Delete
            </Button>
          )}
          <Button variant="contained" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

EventForm.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    date: PropTypes.string,
    category: PropTypes.string,
  }),
  date: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EventForm;
