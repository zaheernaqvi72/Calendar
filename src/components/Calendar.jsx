import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameDay,
} from 'date-fns';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Calendar = ({ events, onDateClick, onEventClick }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const startDate = startOfWeek(startOfMonth(currentMonth));
  const endDate = endOfWeek(endOfMonth(currentMonth));

  const days = [];
  let day = startDate;

  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  const renderWeekDays = () => {
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      weekDays.push(
        <div key={i} className='p-2 font-bold text-center'>
          {format(addDays(startDate, i), 'EEE')}
        </div>
      );
    }
    return weekDays;
  };

  const renderDays = () => {
    const weekDays = [];
    days.forEach((day, i) => {
      const isToday = isSameDay(day, today);
      weekDays.push(
        <div
          key={i}
          className={`p-2 border text-center rounded-2xl overflow-hidden shadow-sm ${
            isToday ? 'bg-blue-200' : ''
          } cursor-pointer hover:bg-blue-100`}
          onClick={() => onDateClick(format(day, 'yyyy-MM-dd'))}
        >
          <div className={isToday ? 'font-bold' : ''}>{format(day, 'd')}</div>
          <div>
            {events
              .filter(event => format(new Date(event.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'))
              .map((event, i) => (
                <div
                  key={i}
                  className="block text-blue-500 cursor-pointer "
                   onClick={() => 
                     onEventClick(event)}
                >
                  {event.title}
                </div>
              ))}
          </div>
        </div>
      );
    });
    return weekDays;
  };

  const prevMonth = () => setCurrentMonth(addDays(currentMonth, -30));
  const nextMonth = () => setCurrentMonth(addDays(currentMonth, 30));

  return (
    <div className="p-4 pb-10 border rounded-lg shadow-md my-6">
      <div className="flex justify-between items-center mb-4">
        <button className='border rounded-full shadow-sm' onClick={prevMonth}><ChevronLeftIcon /></button>
        <h2 className="text-xl font-bold p-2">{format(currentMonth, 'MMMM yyyy')}</h2>
        <button className='border rounded-full shadow-sm' onClick={nextMonth}><ChevronRightIcon /></button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {renderWeekDays()}
      </div>
      <div className="grid grid-cols-7 gap-x-3 gap-y-2">
        {renderDays()}
      </div>
    </div>
  );
};

Calendar.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      category: PropTypes.string,
    })
  ).isRequired,
  onDateClick: PropTypes.func.isRequired,
  onEventClick: PropTypes.func.isRequired,
};

export default Calendar;
