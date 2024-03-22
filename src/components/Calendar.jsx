import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  LocalizationProvider,
  StaticDateTimePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";


const theme = createTheme({
  components: {
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: "#bbdefb",
          borderRadius: 11,
          borderWidth: 2,
          borderColor: "#2196f3",
          border: "2px solid",
          backgroundColor: "#0d47a1",
        },
      },
    },
  },
});


const Calendar = () => {
  function disableWeekends(date) {
    const dayOfWeek = date.day();
    return dayOfWeek === 6 || dayOfWeek === 0; // Disable weekends
  }

  function disableRandomDates() {
    return Math.random() > 0.7;
  }

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDateTimePicker 
				defaultValue={dayjs('2022-04-17')}
				shouldDisableDate={disableWeekends}
				slotProps={{
					actions: ['today'],
				}} />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default Calendar;
