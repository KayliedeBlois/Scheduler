import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList (props) {
console.log(props);
  const interviewers = props.interviewers;
  
  const listItems = interviewers.map((interviewer) => 
    <InterviewerListItem 
      key={interviewer.id}
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.name === props.interviewer}
      setInterviewer={props.setInterviewer}
    />
  )


  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{listItems}</ul>
    </section>
  );
}