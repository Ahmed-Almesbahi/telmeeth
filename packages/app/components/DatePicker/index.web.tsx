import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const DatePicker = () => {
  const [state, setState] = useState({
    startDate: new Date()
  });

  const handleChange = (date: any) => {
    setState({
      startDate: date
    });
  };

  return null;
  // return (
  //   // <_DatePicker
  //   //   style={{ borderWidth: 1, borderColor: 'red' }}
  //   //   selected={state.startDate}
  //   //   onChange={handleChange}
  //   // />
  // );
};

export default DatePicker;
