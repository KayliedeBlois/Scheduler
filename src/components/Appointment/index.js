import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE";



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
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE), true);

  }

  const remove = () => {
    if (mode === CONFIRM) {
      transition(DELETING, true);
      props
       .cancelInterview(props.id)
       .then(() => transition(EMPTY))
       .catch(error => transition(ERROR_DELETE, true));
    } 
    else {
      transition(CONFIRM)
    }
  }

  const errorClose = () => {
    back();
  };

  const edit = () => {
    transition(EDIT);
  };

  return (
    <>
      <Header time={props.time}/>
      <article className="appointment" data-testid="appointment">
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
      onEdit={edit}
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
  {mode === CONFIRM && (
    <Confirm
    onCancel={back}
    onConfirm={remove}
    message="Are you sure you would like to delete?"
    />
  )}
  {mode === EDIT && (
    <Form
    student={props.interview.student}
    interviewer={props.interview.interviewer.id}
    interviewers={props.interviewers}
    onCancel={() => back(EMPTY)}
    onSave={save}
    />
  )}
  {mode === ERROR_DELETE && (
    <Error 
    message="Could not delete appointment" 
    onClose={errorClose} />
  )}
    {mode === ERROR_SAVE && (
    <Error 
    message="Could not save appointment" 
    onClose={errorClose} />
  )}
      </article>
    </>
  );
}
