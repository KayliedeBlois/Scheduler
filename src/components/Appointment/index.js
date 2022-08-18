import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";



export default function Appointment(props) {


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // takes in student name and interviewer ID
  function save(name, interviewer) {
    

    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));

  }

  const remove = () => {

    transition(DELETING)

    props.cancelInterview(props.id)
      .then(()=> transition(EMPTY));

  }



  return (
    <>
      <Header time={props.time}/>
      <article className="appointment">
      {mode === EMPTY && 
    <Empty 
    onAdd={() => transition(CREATE)} 
    />
  }
  {mode === SHOW && props.interview && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer.name}
      onDelete={remove}
    />
  )}
  {mode === CREATE && (
    <Form
    name={props.name}
    interviewer={props.interviewer}
    interviewers={props.interviewers}
    onCancel={() => back(EMPTY)}
    onSave={save}
    />
  )}
  {mode === SAVING && (
    <Status 
    message="Saving"
    />
  )}
  {mode === DELETING && (
    <Status 
    message="Deleting"
    />
  )}
      </article>
    </>
  );
}
