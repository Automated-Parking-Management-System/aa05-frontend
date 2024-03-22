import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { StaticDateTimePicker } from '@mui/x-date-pickers';

export default function DateTimePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDateTimePicker
        defaultValue={dayjs('2022-04-17')}
        slotProps={{
          actionBar: {
            actions: ['today', 'clear', 'accept'],
          },
        }}
      />
    </LocalizationProvider>
  );
}