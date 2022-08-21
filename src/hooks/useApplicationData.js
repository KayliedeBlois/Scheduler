import React, { useState, useEffect} from "react";
import useVisualMode from "./useVisualMode";
import axios from "axios";


const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday", 
    days: [],
    interviewer: "name",
    interviewers: {},
    appointments: {}
  });

  // updates the number of spots available to book

  // assign key-value pair to identify day
  const selectDay = (day) => {
    const daysOfTheWeek = {
      Monday: 0, 
      Tuesday: 1, 
      Wendesday: 2, 
      Thursday: 3, 
      Friday: 4
    }
    return daysOfTheWeek[day]
  };

  // books interview for selected appointment time
  const bookInterview = (appointmentId, interview) => {

    const appointment = {
      ...state.appointments[appointmentId],
      interview: {...interview}
    };

    const appointments = {
      ...state.appointments,
      [appointmentId]: appointment
    };

    const dayOfWeek = selectDay(state.day)
      let day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek]
      }

    if (!state.appointments[appointmentId].interview) {
      day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek].spots - 1
      }
    } else {
      day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek].spots
      }
    }

    let days = state.days
    days[dayOfWeek] = day;

    return axios.put(`/api/appointments/${appointmentId}`, { interview })
      .then(res => {
    });
  };

  // cancels interview for selected appointment time
  const cancelInterview = (appointmentId) => {

    const appointment = {
      ...state.appointments[appointmentId], 
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [appointmentId]: appointment
    };

    const dayOfWeek = selectDay(state.day)

    const day = {
      ...state.days[dayOfWeek],
      spots: state.day[dayOfWeek].spots + 1
    }

    let days = state.days
    days[dayOfWeek] = day;
    
    return axios.delete(`/api/appointments/${appointmentId}`)
      .then(() => {setState({...state, appointments, days});
    });
  };

  // sets Day and Interviewer state
  const setDay = day => setState({ ...state, day });
  const setInterviewer = interviewer => setState({ ...state, interviewer });


  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })

  }, [state.days], [state.appointments], [state.interviewers]);

  return {
    state,
    setDay, 
    bookInterview, 
    cancelInterview
  }
}


export default useApplicationData;