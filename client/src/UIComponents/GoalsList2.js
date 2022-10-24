import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import '../CSSComponents/GoalsList2.css';


function createData(title, sdate, edate, status, manager) {
  return {
    title,
    sdate,
    edate,
    status,
    manager
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment >
      <TableRow sx={{ '& > *': { 
          borderBottom: 'unset',
           } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={{fontFamily: "Varela Round"}} component="th" scope="row" >{row.title}</TableCell>
        <TableCell sx={{fontFamily: "Varela Round"}} align="right">{row.sdate}</TableCell>
        <TableCell sx={{fontFamily: "Varela Round"}} align="right">{row.edate}</TableCell>
        <TableCell sx={{fontFamily: "Varela Round"}} align="right">{row.status}</TableCell>
        <TableCell sx={{fontFamily: "Varela Round"}} align="right">{row.manager}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography sx={{fontFamily: "Varela Round"}} variant="h6" gutterBottom component="div">
                Comments
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                <Typography sx={{fontFamily: "Varela Round"}} variant="h10" gutterBottom component="div">
                No comments yet.
              </Typography>
                </TableHead>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    sdate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    edate: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    manager: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [
  createData('Finish Project 1', "10/12/22", "10/12/22", "Completed", "John Doe"),
  createData('Contact Client A', "10/12/22", "10/12/22", "Completed", "Jane Doe"),
  createData('Review Document 1', "10/12/22", "10/12/22", "In Progress", "Jane Doe"),
  createData('Finish Project 2', "10/12/22", "10/12/22", "In Progress", "John Doe"),
  createData('Contact Client B', "10/12/22", "10/12/22", "To Do", "Jane Doe"),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}sx={{
      '.MuiTable-root': {
        fontFamily: "Varela Round"
      },
    }}>
      <Table aria-label="collapsible table">
        <TableHead >
          <TableRow >
            <TableCell />
            <TableCell sx={{fontFamily: "Varela Round"}}>Goals</TableCell>
            <TableCell sx={{fontFamily: "Varela Round"}} align="right">Start Date</TableCell>
            <TableCell sx={{fontFamily: "Varela Round"}} align="right">End Date</TableCell>
            <TableCell sx={{fontFamily: "Varela Round"}} align="right">Status</TableCell>
            <TableCell sx={{fontFamily: "Varela Round"}} align="right">Manager</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {rows.map((row) => (
            <Row key={row.title} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}