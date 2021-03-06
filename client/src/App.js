import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Header from './components/Header';
import MyCalendar from './components/MyCalendar';
import { getWorktimes } from './store/worktime/worktimeAction';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWorktimes());
  }, []);

  return (
    <div>
        <Header />
        <div className="container">
          <MyCalendar />
        </div>
    </div>
  );
}

export default App;
