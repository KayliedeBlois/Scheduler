import React, { useState, useEffect, setState } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import InterviewerList from "./InterviewerList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useVisualMode from "hooks/useVisualMode";
import useApplicationData from "hooks/useApplicationData";

// const interviewers = [
//   { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
//   { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
//   { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
//   { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
//   { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
// ];


export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  
  // [state, setState] = useState({
  //   day: "Monday", 
  //   days: [],
  //   interviewer: "name",
  //   interviewers: {},
  //   appointments: {}
  // });



  // const bookInterview = (appointmentId, interview) => {

  //   // const appointment = {
  //   //   ...state.appointments[appointmentId],
  //   //   interview: { ...interview }
  //   // };

  //   // const appointments = {
  //   //   ...state.appointments,
  //   //   [appointmentId]: appointment
  //   // };


  //   // setState({
  //   //   ...state,
  //   //   appointments
  //   // });

  //   return axios.put(`/api/appointments/${appointmentId}`, { interview }).then(res => {
  //   });

  // };

    // use appointment id to find the right appointment and set interview data to null
  // const cancelInterview = (appointmentId) => {

  //   return axios.delete(`/api/appointments/${appointmentId}`).then(res => {
  //   });

  //   };

  const interviewers = getInterviewersForDay(state, state.day)

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });



  // const setDay = day => setState({ ...state, day });
  // const setInterviewer = interviewer => setState({ ...state, interviewer });


  // useEffect(() => {
  //   Promise.all([
  //     axios.get(`/api/days`),
  //     axios.get(`/api/appointments`),
  //     axios.get(`/api/interviewers`),
  //   ]).then((all) => {
  //     setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
  //   })

  // }, [state.days], [state.appointments], [state.interviewers]);

  
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList 
          days={state.days} 
          value={state.day} 
          onChange={setDay} 
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment 
          key="last"
          time="5pm"
        /> 
      </section>
    </main>
  );
}

