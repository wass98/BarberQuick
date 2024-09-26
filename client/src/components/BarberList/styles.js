import { makeStyles } from '@material-ui/core/styles';
import bg from '../../assets/hero.jpg'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',  // Ensures the content and drawer are side by side
    flexGrow: 1,
    backgroundColor: '#f0f0f0'
    
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,  // Prevents the drawer from shrinking
      position: 'fixed',  // Makes the drawer fixed and always visible
      marginTop: '60px',
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#294a80', // Purple background color matching the image
    borderTopRightRadius: 0, // Rounded corner at the top-left
    borderBottomRightRadius: 0, // Rounded corner at the bottom-left
    marginTop: '60px',
    [theme.breakpoints.up('sm')]: {
      height: `100%`,  // Full height for desktop view
      boxShadow: '10px 20px 20px rgba(0, 0, 0, 0.7)',  // Adds shadow to the drawer
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // Space out the top and bottom elements
    padding: theme.spacing(2), // Add some padding to the drawer
  },
  topLine: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)', // White horizontal line with some opacity
    margin: theme.spacing(2, 0), // Add vertical spacing around the line
  },
  bottomLine: {
    borderTop: '1px solid rgba(255, 255, 255, 0.3)', // White horizontal line with some opacity
    margin: theme.spacing(2, 0), // Add vertical spacing around the line
  },
  content: {
    flexGrow: 1,  // Allows the content to take the remaining space
    padding: theme.spacing(3),
    marginLeft: drawerWidth,  // Offsets the main content when the drawer is open
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,  // No margin for small screens
    },
    minWidth: 0,  // Ensures that the content doesn't shrink too much
    marginTop: 60,  // Ensures content starts below the navbar
  },
  menuButton: {
    position: 'absolute',  // Position the button absolutely
    top: 60,  // Sets the button 60px below the top of the screen
    left: 10,  // Adjust left padding as needed
    zIndex: 1300,  // Ensures it is on top of other elements
  },
  formControl: {
    margin: theme.spacing(2),  // Add spacing around form controls
    color: '#fff', // White text color for form control
  },
  searchInput: {
    width: '100%',
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor: '#294a80', // White background for search input
    borderRadius: 0, // Slightly rounded corners
  },
}));

export default useStyles;
 