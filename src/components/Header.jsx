import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header({title}) {

  return (
    <Box sx={{}}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{}}
          >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}