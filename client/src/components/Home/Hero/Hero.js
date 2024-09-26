import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';

// Import the hero image
import heroImage from '../../../assets/hero.jpg'; // Adjust the path as needed

const useStyles = makeStyles((theme) => ({
  hero: {
    height: '100vh',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    padding: theme.spacing(2),
  },
  heroTitle: {
    fontSize: '50px',
    color: '#fff',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: '40px',
    },
  },
  heroText: {
    color: '#fff',
    fontSize: '24px',
    lineHeight: '1.5',
    width: '60%',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
      width: '90%',
    },
  },
  heroButton: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1, 4),
    backgroundColor: 'rgb(161, 136, 21)',
    borderRadius: '20px',
    color: '#fff',
    '&:hover': {
      backgroundColor: 'rgb(128, 106, 10)',
    },
  },
}));

const Hero = () => {
  const classes = useStyles();

  // Framer Motion animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.5 } },
  };

  return (
    <motion.div
      className={classes.hero}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.3 }}
    >
      {/* Animated Title */}
      <motion.div variants={textVariants}>
        <Typography className={classes.heroTitle} variant="h1">
          Welcome to BarberQuick
        </Typography>
      </motion.div>

      {/* Animated Paragraph */}
      <motion.div variants={textVariants}>
        <Typography className={classes.heroText}>
          Stop wasting time waiting for your turn! Get your next haircut as soon and easy as possible!
        </Typography>
      </motion.div>

      {/* Animated Button */}
      <motion.div variants={buttonVariants}>
        <Link to="/barberlist">
          <Button className={classes.heroButton} variant="contained">
            Book Now
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
