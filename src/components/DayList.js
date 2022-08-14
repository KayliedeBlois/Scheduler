import React from "react";
import DayListItem from "./DayListItem";



export default function DayList (props) {

  const days = props.days;
  const listItems = days.map((day) =>
    <li>
      <DayListItem         
        key={day.id}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}   
        />
    </li>
  );

  return (
    <ul>{listItems}</ul>
  );
}