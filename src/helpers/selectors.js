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

  }

  if (state.days !== []) {
    const filteredDays = state.days.filter(day => filterAppointments(day));
    return filteredAppointments;
  } else {
    return [];
  }

  
}