import React from 'react';
import {
    Card,
    CardContent,
    Avatar,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    Button,
    makeStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { VerifiedUser } from '@material-ui/icons'; // Import the VerifiedUser icon

const useStyles = makeStyles((theme) => ({
    card: {
        width: '100%',
        maxWidth: 320,
        height: 'auto',
        margin: 'auto',
        marginBottom: theme.spacing(3),
        padding: theme.spacing(3),
        borderRadius: '16px', // Rounded corners
        backgroundColor: '#FFF',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Soft shadow for a lighter feel
        position: 'relative', // Set position relative to allow absolute positioning of the rating
    },
    avatar: {
        width: 120,
        height: 120,
        margin: '0 auto',
        border: '3px solid #3385ff', // Coral border for avatar
    },
    verifiedIcon: {
        color: 'blue', // Blue verified icon
        marginLeft: 5,
    },
    ratingBadge: {
        position: 'absolute',
        top: theme.spacing(2),
        right: theme.spacing(2),
        backgroundColor: '#FF6F61', // Coral background for rating
        color: '#FFF',
        padding: theme.spacing(0.5, 1),
        borderRadius: '12px',
        fontWeight: 'bold',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Soft shadow for a lighter feel
    },
    listItem: {
        padding: theme.spacing(1),
        '&:not(:last-child)': {
            borderBottom: '1px solid #D1D1D1', // Light gray divider
        },
    },
    button: {
        marginTop: theme.spacing(2),
        backgroundColor: '#FF6F61', // Coral button
        color: '#FFF',
        '&:hover': {
            backgroundColor: '#FF8A65', // Slightly lighter on hover
        },
    },
}));

const BarberCard = ({ barber }) => {
    const classes = useStyles();

    const pdp = `http://localhost:5000/${barber.profilePicture}`;

    return (
        <Card className={classes.card}>
            {/* Rating Badge in the top-right corner */}
            {barber.rating !== undefined && (
                <Box className={classes.ratingBadge}>
                    {Math.round(barber.rating * 10) / 10} ★
                </Box>
            )}
            <CardContent style={{ textAlign: 'center' }}>
                <Avatar
                    alt={`${barber.fname} ${barber.lname}`}
                    src={pdp || '../../assets/logo.png'} // Fallback to default image if none is set
                    className={classes.avatar}
                />
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Typography style={{ fontWeight: 'bold' }} variant="h5">
                        {barber.fname} {barber.lname}
                    </Typography>
                    {barber.verified && (
                        <VerifiedUser className={classes.verifiedIcon} />
                    )}
                </Box>
                <Typography color="textSecondary">
                    {barber.bio ? barber.bio : 'Coiffeur'}
                </Typography>
                <List>
                    {[
                        barber.sname && { title: 'Salon', value: `${barber.sname}` },
                        { title: 'Gouvernorat', value: `${barber.state}, ${barber.delegation}` },
                        { title: 'Adresse', value: `${barber.adress}` },
                    ]
                        .filter(Boolean) // Remove any falsey values like `null`, `undefined`, or `false`
                        .map((item, index) => (
                            <ListItem key={index} className={classes.listItem}>
                                <ListItemText
                                    primary={item.title}
                                    secondary={item.value}
                                />
                            </ListItem>
                        ))}
                </List>
                <Button
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to={`/ap/${barber._id}`}
                >
                    Réservez
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    href={barber.maps} // Link to the barber's maps URL
                    target="_blank" // Open in a new tab
                    rel="noopener noreferrer" // Security attribute when opening external links
                >
                    Voir sur Maps
                </Button>
            </CardContent>
        </Card>
    );
};

export default BarberCard;
