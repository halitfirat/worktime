import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, set, isSameMonth } from 'date-fns';

import AddWorktime from './worktime/AddWorktime';
import UpdateDeleteWorktime from './worktime/UpdateDeleteWorktime';
import Export from './Export';
import Print from './Print';
import { periodSansPause, hmToMS, msToHM } from '../services/time';
import { worktimeList } from '../store/worktime/worktimeSelector';
const locales = {
  'en-US': require('date-fns/locale/en-US')
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

const MyCalendar = (props) => {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState({});
  const [worktime, setWorktime] = useState({});
  const [addWtOpen, setAddWtOpen] = useState(false);
  const [updDelWtOpen, setUpdDelWtOpen] = useState(false);

  const worktimeListSelector = useSelector(worktimeList);

  useEffect(() => {
    handleNavigateEvent(new Date());
  }, []);

  useEffect(() => {
    if (worktimeListSelector.length > 0) {
      setEvents(worktimeListSelector.map((w) => mapEvent(w)));
    }
  }, [worktimeListSelector]);

  const setTime = (date, hm) => {
    return set(date, { milliseconds: hmToMS(hm) });
  };

  const mapEvent = (worktime) => {
    const { date, start, end, pause } = worktime;

    const dateZoned = new Date(date);
    const startDateTime = setTime(dateZoned, start);
    const endDateTime = setTime(dateZoned, end);
    const period = periodSansPause(end, start, pause);
    const periodHM = msToHM(period);

    return {
      title: `${periodHM} Work | ${pause} Pause`,
      start: startDateTime,
      end: endDateTime,
      resource: worktime
    };
  };

  const handleSelectSlot = ({ start }) => {
    setDate(start);
    setAddWtOpen(true);
  };

  const handleSelectEvent = (e) => {
    setUpdDelWtOpen(true);
    setWorktime(e.resource);
  };

  const handleNavigateEvent = (date) => {
    setDate(date);
  };

  const getMonthWorktimes = () => {
    const dateZoned = new Date(date);

    const worktimes = worktimeListSelector
      .map((w) => {
        return { ...w, date: new Date(w.date) };
      })
      .filter((w) => isSameMonth(w.date, dateZoned))
      .sort((a, b) => a.date - b.date);

    return worktimes;
  };

  return (
    <div style={{ backgroundColor: 'white' }}>
      <Calendar
        style={{ backgroundColor: 'navy' }}
        selectable
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        onNavigate={handleNavigateEvent}
      />
      <div style={{ paddingTop: '30px', textAlign: 'center'}}>
        <Export getMonthWorktimes={getMonthWorktimes} />
        <Print getMonthWorktimes={getMonthWorktimes} />
      </div>
      <AddWorktime
        date={date}
        open={addWtOpen}
        close={() => setAddWtOpen(false)}
      />
      <UpdateDeleteWorktime
        worktime={worktime}
        open={updDelWtOpen}
        close={() => setUpdDelWtOpen(false)}
      />
    </div>
  );
};

export default MyCalendar;
