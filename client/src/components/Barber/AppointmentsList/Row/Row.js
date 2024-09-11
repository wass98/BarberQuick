import React from 'react';
import './Row.css';
import TableData from '../TableData/TableData';

const Row = ({ appointments, time }) => {
  console.log('Row rendered');

  return (
    <tr>
      <th className="left-th">{time}</th>
      <TableData appointments={appointments.filter((obj) => obj.day === 'Sun')} time={time} day="Sun" />
      <TableData appointments={appointments.filter((obj) => obj.day === 'Mon')} time={time} day="Mon" />
      <TableData appointments={appointments.filter((obj) => obj.day === 'Tue')} time={time} day="Tue" />
      <TableData appointments={appointments.filter((obj) => obj.day === 'Wed')} time={time} day="Wed" />
      <TableData appointments={appointments.filter((obj) => obj.day === 'Thu')} time={time} day="Thu" />
      <TableData appointments={appointments.filter((obj) => obj.day === 'Fri')} time={time} day="Fri" />
      <TableData appointments={appointments.filter((obj) => obj.day === 'Sat')} time={time} day="Sat" />
    </tr>
  );
};

export default Row;