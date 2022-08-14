import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem (props) {
let interviewerClass = classNames("interviewers__item", {
  "interviewers__item--selected":props.selected,
})

  const interviewerName = (props) => {
    if (props.selected) {
      return `${props.name}`;
    } else {
      return "";
    }
  }

  return (
    <li className={interviewerClass} onClick={() => props.setInterviewer(props.id)}>
      <img
        className= "interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {interviewerName(props)}
    </li>
  );
}