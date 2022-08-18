export function getAppointmentsForDay(state, name) {
  
  const filteredAppointments = [];

  function filterAppointments(day) {

    if(day.name === name) {

      for(const appointment in state.appointments) {
        if(day.appointments.includes(parseInt(appointment)) === true) {
          filteredAppointments.push(state.appointments[appointment]);
        }
      }
    }
  };

  if (state.days !== []) {
    const filteredDays = state.days.filter(day => filterAppointments(day));
    return filteredAppointments;
  } else {
    return [];
  }
}

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }

  return {student: interview.student, interviewer: state.interviewers[interview.interviewer]};
};


export function getInterviewersForDay(state, name) {
  
  const filteredInterviewers = [];

  if (state.days.length === 0) {
    return [];
  }

  const filteredDay = state.days.filter(day => day.name === name);

  if (filteredDay.length === 0) {
    return [];
  }

  const appointments = filteredDay[0].appointments;
  for(let appointment in state.appointments) {
    if(appointments.includes(parseInt(appointment)) && state.appointments[appointment].interview) {
      // console.log(state.appointments[appointment].interview);
      filteredInterviewers.push(state.interviewers[state.appointments[appointment].interview.interviewer]);
    }
  }

  return filteredInterviewers;
}
