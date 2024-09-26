import React from 'react';
import { useState } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {Toaster, toast} from 'react-hot-toast'

const useStyles = makeStyles((theme) => ({
  contactSection: {
    padding: theme.spacing(5, 0),
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  contactInfo: {
    backgroundColor: '#000',
    color: '#fff',
    padding: theme.spacing(4),
    borderRadius: '8px',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
    },
  },
  formSection: {
    padding: theme.spacing(4),
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  formControl: {
    marginBottom: theme.spacing(2),
  },
  contactDetails: {
    marginBottom: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(1),
    verticalAlign: 'middle',
  },
  footer: {
    backgroundColor: '#000',
    color: '#fff',
    padding: theme.spacing(4),
    borderTop: '4px solid #fff',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
    },
  },
  footerLink: {
    color: '#fff',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  newsletterInput: {
    width: '100%',
    padding: theme.spacing(1),
    borderRadius: '4px',
    border: '1px solid #ddd',
    marginRight: theme.spacing(1),
    '&:focus': {
      outline: 'none',
      borderColor: '#000',
    },
  },
  button: {
    backgroundColor: '#000', // Button background
    color: '#fff',           // Button text color
    '&:hover': {
      backgroundColor: '#ddd', // Light gray on hover
      color: '#000',
    },
  },
}));

const Contact = () => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    subject: '',
    msg: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const regex =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email && !formData.phone) {
      return toast.error('Tapez au moins un contact (email ou mobile)');
    }
    if (formData.phone && (isNaN(formData.phone)||formData.phone.length<8||formData.phone.length>12)) {
      return toast.error('Format mobile invalide');
    }
    if (formData.email && !regex.test(formData.email)) {
      return toast.error('Format email invalide');
    }
    if (!formData.msg) return toast.error('Tapez un message!');

    try {
      const response = await axios.post('http://localhost:5000/postreview', formData); // Make sure your backend is running
      console.log(response.data);
      toast.success('Message sent successfully!');
    } catch (error) {
      console.error('There was an error submitting the form:', error);
    }
  };
  

  return (
    <>
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
      <Container className={classes.contactSection}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} className={classes.contactInfo}>
            <Typography variant="h6">Contact Information</Typography>
            <Typography variant="body2" className={classes.contactDetails}>
              <PhoneIcon className={classes.icon} />
              +216 21 477 802
            </Typography>
            <Typography variant="body2" className={classes.contactDetails}>
              <EmailIcon className={classes.icon} />
              barberquick@info.com
            </Typography>
            <Typography variant="body2" className={classes.contactDetails}>
              <LocationOnIcon className={classes.icon} />
              Borj Louzir, La soukra, Ariana - Tunisie
            </Typography>
          </Grid>

          <Grid item xs={12} md={8} className={classes.formSection}>
            <Grid container spacing={2}>
            <form onSubmit={handleSubmit}>
    {/* Update TextFields to have `name` and `onChange` */}
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Prénom"
          variant="outlined"
          name="fname"
          value={formData.fname}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Nom"
          variant="outlined"
          name="lname"
          value={formData.lname}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Mobile"
          variant="outlined"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Sujet"
          variant="outlined"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Message"
          multiline
          rows={4}
          variant="outlined"
          name="msg"
          value={formData.msg}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Button className={classes.button} size="large" fullWidth type="submit">
          Envoyer Message
        </Button>
      </Grid>
    </Grid>
  </form>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Box className={classes.footer}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Typography variant="h6">Contactez-nous</Typography>
              <Typography variant="body2" className={classes.contactDetails}>
                <PhoneIcon className={classes.icon} />
                +216 21 477 802
              </Typography>
              <Typography variant="body2" className={classes.contactDetails}>
                <EmailIcon className={classes.icon} />
                wass.socials@gmail.com
              </Typography>
              <Typography variant="body2" className={classes.contactDetails}>
                <LocationOnIcon className={classes.icon} />
                Borj Louzir, La soukra, Ariana - Tunisie
              </Typography>
            </Grid>

            <Grid item xs={12} md={2}>
              <Typography variant="h6">Entreprise</Typography>
              <Typography variant="body2">
                <a href="#" className={classes.footerLink}>
                À Propos
                </a>
              </Typography>
              <Typography variant="body2">
                <a href="#" className={classes.footerLink}>
                  Contact
                </a>
              </Typography>
              <Typography variant="body2">
                <a href="#" className={classes.footerLink}>
                  Blogs
                </a>
              </Typography>
            </Grid>

            <Grid item xs={12} md={2}>
              <Typography variant="h6">Legal</Typography>
              <Typography variant="body2">
                <a href="#" className={classes.footerLink}>
                  Politique de Confidentialité
                </a>
              </Typography>
              <Typography variant="body2">
                <a href="#" className={classes.footerLink}>
                  Conditions d'utilisation
                </a>
              </Typography>
              <Typography variant="body2">
                <a href="#" className={classes.footerLink}>
                  Conditions du Service
                </a>
              </Typography>
            </Grid>

            <Grid item xs={12} md={2}>
              <Typography variant="h6">Liens Rapides</Typography>
              <Typography variant="body2">
                <a href="#" className={classes.footerLink}>
                  BarberQuick
                </a>
              </Typography>
              <Typography variant="body2">
                <a href="#" className={classes.footerLink}>
                  FAQ
                </a>
              </Typography>
              <Typography variant="body2">
                <a href="#" className={classes.footerLink}>
                  Forum
                </a>
              </Typography>
            </Grid>

            <Grid item xs={12} md={3}>
              <Typography variant="h6">Rejoignez notre newsletter</Typography>
              <form noValidate style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className={classes.newsletterInput}
                />
                <Button className={classes.button}>
                S'abonner
                </Button>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Contact;
