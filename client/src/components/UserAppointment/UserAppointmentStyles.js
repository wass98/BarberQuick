import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
    minHeight: '100vh', // This ensures the gray background takes the full viewport height
    backgroundColor: '#f0f0f0', // Light gray background
    padding: theme.spacing(4), // Optional padding for spacing around the card
    
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: theme.spacing(3),
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '1200px', // Max width for the card
    
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f0f0f5',
    borderRadius: theme.shape.borderRadius,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 'auto',
    },
  },
  addButton: {
    marginLeft: theme.spacing(2),
    backgroundColor: '#6200EE',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#3700B3',
    },
  },
  table: {
    minWidth: 650,
    borderRadius: '16px',
    overflow: 'hidden',
  },
  tableHeader: {
    fontWeight: 'bold',
  },
  statusButton: {
    borderRadius: '15px',
    padding: '2px 12px',
    textTransform: 'capitalize',
  },
  actionButtons: {
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default useStyles;
