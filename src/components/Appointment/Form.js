import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const interviewers=props.interviewers;
  // const interview = getInterview(state, appointment.interview);
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  //on cancel reset to EMPTY component
  const cancel = () => {
    props.onCancel();
    reset();
  };

  //using student inputted name from form
  const save = () => {
    props.onSave(student, interviewer);
  }

  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            placeholder="Enter Student name"
          />
        </form>
        <InterviewerList
            interviewers={interviewers}
            value={interviewer}
            onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={save}>Save</Button>
        </section>
      </section>
    </main>
  );
}