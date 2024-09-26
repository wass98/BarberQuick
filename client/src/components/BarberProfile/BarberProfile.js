import React, { useState , useEffect } from 'react';
import Navbar from '../Home/Navbar/Navbar';
import axios from 'axios';
import GovDel from '../../GovDel'; // Correctly import the data file
import { getCookie, setCookie, deleteCookie } from '../../cookies';
import { Toaster, toast } from 'react-hot-toast';

import {
  Container,
  Grid,
  Typography,
  Divider,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Tabs,
  Tab,
  Box,
  Badge,
  makeStyles,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import { VerifiedUser } from '@material-ui/icons'; // Import the VerifiedUser icon

// Styles for the components using makeStyles
const useStyles = makeStyles((theme) => ({
  cardHeader: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  avatar: {
    width: 120,
    height: 120,
    margin: '0 auto 1rem',
  },
  tabContent: {
    padding: theme.spacing(4),
  },
  badge: {
    margin: theme.spacing(0.5),
  },
  socialButton: {
    color: '#fff',
    backgroundColor: '#000',
    margin: theme.spacing(1),
  },
  formControlLabel: {
    display: 'block',
  },
}));

const ProfileComponent = () => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);

  //-------------------Profile Data----------------------------
    const [fname, setfName] = useState('');
    const [lname, setlName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [bio, setBio] = useState('');
    const [state, setState] = useState('');
    const [delegation, setDelegation] = useState([]);
    const [adress, setAdress] = useState('');
    const [evaluation, setEvaluation] = useState('');
    const [sname, setsName] = useState('');
    const [error, setError] = useState('');
    const [cDate, setcDate] = useState('');
    const [patente, setPatente] = useState('');
    const [verified, setVerified] = useState();
    const [req, SetReq] = useState ();
    const [selectedFile, setSelectedFile] = useState(null); // New state for the selected file
    const [profilePicture, setProfilePicture] = useState(null);
    const [maps, setMaps] = useState('')


    const [selectedGouvernorat, setSelectedGouvernorat] = useState('');
    const [selectedDelegation, setSelectedDelegation] = useState('');
    const [delegationOptions, setDelegationOptions] = useState([]);
//--------------------------------------------------------------------------
const [isConfirmVisible, setIsConfirmVisible] = useState(false);
const [openMapsModal, setOpenMapsModal] = useState(false);

//-----------------------------UPDATE DATA----------------------------------------------

    const [updatedfname, setupdatedfName] = useState('');
    const [updatedlname, setupdatedlName] = useState('');
    const [updatedemail, setupdatedEmail] = useState('');
    const [updatedphone, setupdatedPhone] = useState('');
    const [updatedbio, setupdatedBio] = useState('');
    const [updatedstate, setupdatedState] = useState('');
    const [updateddelegation, setupdatedDelegation] = useState([]);
    const [updatedadress, setupdatedAdress] = useState('');
    const [updatedsname, setupdatedsName] = useState('');
    const [updatedpatente, setupdatedPatente] = useState('');
    const [updatedmaps, setupdatedMaps] = useState('')
    const [cpass, setCpass] = useState('');
    const [pass, setPass] = useState('');
    const [repass, setRepass] = useState('');
    
//-----------------------------------------------------------------------

    const handleGouvernoratChange = (event) => {
        const gouvernorat = event.target.value;
        setSelectedGouvernorat(gouvernorat);
        setDelegationOptions(GovDel[gouvernorat] || []);
        setSelectedDelegation(''); // Reset delegation selection
      };




  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'fname':
        setupdatedfName(value);
        break;
      case 'lname':
        setupdatedlName(value);
        break;
      case 'email':
        setupdatedEmail(value);
        break;
      case 'phone':
        setupdatedPhone(value);
        break;
      case 'bio':
        setupdatedBio(value);
        break;
      default:
        break;
    }
  };

  const handleMapsModalOpen = () => {
    setOpenMapsModal(true);
  };

  const handleMapsModalClose = () => {
    setOpenMapsModal(false);
  };


  const handleFileInputClick = () => {
    document.getElementById('file-input').click(); // Trigger file input
    setIsConfirmVisible(true); // Show confirm button after "Modifier Photo" is clicked
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); // Update profile picture preview
      };
      reader.readAsDataURL(file); // Convert to base64 for preview
    }
  };

  const uploadProfilePicture = () => {
    if (!selectedFile) {
      toast.error('Veuillez sélectionner une image.');
      return;
    }
    const barberID = getCookie('id')
    const formData = new FormData();
    formData.append('profilePicture', selectedFile);
  
    axios
      .post(`http://localhost:5000/upload-bprofile/${barberID}`, formData)
      .then((response) => {
        const { error } = response.data;
        if (error) {
          toast.error('Erreur: ' + error);
        } else {
          toast.success('Photo de profil mise à jour avec succès');
          // Optionally reload the profile picture from the updated user data
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('Échec de la mise à jour de la photo de profil');
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
};



  useEffect(() => {
    const barberID = getCookie('id');
    getProfile(barberID);
}, []);

const getProfile = (barberID) => {
    axios.get(`http://localhost:5000/bprofiledata?id=${barberID}`).then((response) => {
        const { error, email, fname, lname, phone, state, delegation, adress, sname, verified, cDate, patente, maps, rating, bio, req, profilePicture } = response.data;
        if (error) {
            console.log(error);
        } else {
            setfName(fname);
            setlName(lname);
            setEmail(email);
            setPhone(phone);
            setState(state);
            setDelegation(delegation);
            setAdress(adress);
            setsName(sname);
            setVerified(verified);
            setcDate(cDate);
            setPatente(patente);
            setEvaluation(rating);
            setBio(bio);
            SetReq(req);
            setMaps(maps);
            setProfilePicture(`http://localhost:5000/${profilePicture}`);
            setCookie('phone', phone, 2);
        }
    });
};

const updateProfile = () => {
    
    
      const obj = {
        fname: updatedfname || fname, // Use updated value or fallback to original
        lname: updatedlname || lname,
        email: updatedemail || email,
        phone: updatedphone || phone,
        bio: updatedbio || bio,
        barberID: getCookie('id')
      };

      axios.post('http://localhost:5000/updatebprofiledata', obj).then((response) => {
        const { error } = response.data;
        if (error) {
          toast.error('Erreur: ' + error);
        } else {
          toast.success('Mises à jour avec succès');
          setTimeout(() => {
            window.location.reload(false);
        }, 2000); // 3000 milliseconds = 3 seconds
                }
      });
    
  };

  const updateSalon = () => {
    if(req===false){
    const obj = {
      patente: updatedpatente || patente, // Use updated or fallback
      sname: updatedsname || sname,
      state: selectedGouvernorat || state,
      delegation: selectedDelegation || delegation,
      adress: updatedadress || adress,
      maps: updatedmaps || maps,
      barberID: getCookie('id'),
    };

    const patenteRegex = /^\d{7}[A-Z]{3}\d{3}$/;

  // Validate patente
  if (!patenteRegex.test(obj.patente)) {
    toast.error('Patente invalide (exemple: 1234567AAM000)');
    return; // Exit the function if validation fails
  }

    axios.post('http://localhost:5000/updatebsalon', obj).then((response) => {
      const { error } = response.data;
      if (error) {
        toast.error('Erreur: ' + error);
      } else {
        toast.success('Votre demande a été envoyée avec succès, nous vous enverrons le résultat par e-mail ou par SMS');
        setTimeout(() => {
          window.location.reload(false);
        }, 2000);
      }
    });
    }
    else {
        toast(
            "Nous vous enverrons le résultat par e-mail ou par SMS, Si vous souhaitez modifier des données, envoyez-nous un message dans la page de contact",
            {
              duration: 4000,
            }
          );}
  };

  const updatePass = () => {
    const obj = {
      cpass: cpass, // Use updated or fallback
      pass: pass,
      repass: repass,
      barberID: getCookie('id'),
    };
    if (pass.length<6||cpass.length<6||repass.length<6) return toast.error('Mot de passe doit etre au moins 6 caractères!')
  
    axios.post('http://localhost:5000/updatebpass', obj).then((response) => {
      const { error } = response.data;
      if (error) {
        toast.error('Erreur: ' + error);
      } else {
        toast.success('Mot de Passe mis à jour avec succès');
        setTimeout(() => {
          window.location.reload(false);
        }, 2000);
      }
    });
  };
  
const cap = (string) => {
    if (!string) return ''; // Handle empty strings
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <>
            <Navbar />
            <Toaster/>
    <section style={{ backgroundColor: '#f8f9fa', padding: '3rem 0' }}>
        <br/>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={4}>
              {/* Welcome Card */}
              <Grid item xs={12}>
                <Card>
                  <CardHeader
                    title="PROFILE"
                    titleTypographyProps={{ align: 'center', variant: 'h6' }}
                    className={classes.cardHeader}
                  />
                  <CardContent style={{ textAlign: 'center' }}>
                  <Avatar
                      src={profilePicture || '../../assets/logo.png'} // Fallback to default image if none is set
                      className={classes.avatar}
                    />                      
                    <Typography
                      variant="button"
                      className={classes.uploadButton}
                      onClick={handleFileInputClick} // Trigger file input and show button
                    >
                      Modifier Photo
                    </Typography>

                    <input
                      id="file-input"
                      type="file"
                      style={{ display: 'none' }} // Hidden input field
                      onChange={handleFileChange} // Handle file change logic
                    />

                    {isConfirmVisible && ( // Only show this box if isConfirmVisible is true
                      <Box mt={2}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small" // Make the button smaller
                          onClick={uploadProfilePicture} // Upload file when confirmed
                        >
                          Confirmer
                        </Button>
                      </Box>
                    )}
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Typography style={{ fontWeight: 'bold' }} variant="h5">
                            {cap(fname)} {cap(lname)}
                        </Typography>
                        {/* Add some spacing between name and icon */}
                        {verified && <VerifiedUser style={{ color: '#3f51b5', marginLeft: 5 }} />}                    
                    </Box>
                    <Typography color="textSecondary">Coiffeur</Typography>
                    <List>
                        {[
                            bio && { title: 'Bio:', value: `${bio}` }, // Only include this if bio is not empty
                            sname && { title: 'Salon', value: `${cap(sname)}` },
                            { title: 'Évaluation', value: `${Math.round(evaluation*10)/10}` },
                            { title: 'Membre depuis', value: `${formatDate(cDate)}` },
                        ]
                            .filter(Boolean) // Remove any falsey values like `null` or `undefined`
                            .map((item, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={item.title} secondary={item.value} />
                            </ListItem>
                            ))}
                        </List>                    
                {/* <Button variant="outlined" color="primary">
                      Follow
                    </Button> */}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          {/* Profile Information Card */}
          <Grid item xs={12} lg={8}>
            <Card>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="Profile Tabs"
                className={classes.cardHeader}
              >
                <Tab label="Info" />
                <Tab label="Modifier info" />
                <Tab label="Salon" />
                <Tab label="Mot de passe" />
              </Tabs>
              <Box className={classes.tabContent}>
              {tabValue === 0 && (
    <Box>
        <Typography variant="h5">Information Personnelles:</Typography>
        <List>
        {[
            { title: 'Prénom:', value: `${cap(fname)}` },
            { title: 'Nom:', value: `${cap(lname)}` },
            { title: 'Email:', value: `${email}` },
            { title: 'Mobile:', value: `${phone}` },
            { title: 'Nom du Salon:', value: `${cap(sname)}` },
            { title: 'Gouvernorat:', value: `${state}` },
            { title: 'Delegation:', value: `${delegation}` },
            { title: 'Adresse:', value: `${adress}` },
            { title: 'Identifiant fiscal (patente):', value: `${patente}` },
        ].map((item, index) => (
            <ListItem key={index} style={{ padding: '0.5rem 0' }}>
            <ListItemText  primary={item.title} />
            <Typography >{item.value}</Typography>
            </ListItem>
        ))}
        </List>
    </Box>
    )}

    {tabValue === 1 && (
        <form onSubmit={(e) => { e.preventDefault(); updateProfile(); }}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
                label="Prénom"
                name="fname"
                defaultValue={cap(fname)}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                label="Nom"
                name="lname"
                defaultValue={cap(lname)}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                label="Email"
                type="email"
                name="email"
                defaultValue={email}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                label="Mobile"
                type="number"
                name="phone"
                defaultValue={phone}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                multiline
                rows={2}
                label="Bio"
                name="bio"
                defaultValue={bio}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
            />
            </Grid>
        </Grid>
        <Box mt={2} textAlign="right">
            <Button variant="contained" color="primary" type="submit">
            Enregistrer
            </Button>
        </Box>
        </form>
        )}
                
                {tabValue === 2 && (
                  <Box>
                    <Typography variant="h5">Mise à Jours Salon</Typography>
                    <br/>
                    {req && <Typography variant="h7" style={{ color: 'darkred' }}>
                        Votre demande a été envoyée, nous vous enverrons le résultat par e-mail ou par SMS <br/>
                        Vous obtiendrez une icône vérifiée une fois que vous serez vérifié
                    </Typography>}
                    {verified && <Typography variant="h7" style={{ color: 'Green' }}>
                      Envoyez une demande sur la page contact si vous souhaitez mettre à jour votre salon.
                    </Typography>}
                    <br/><br/>
                    <form onSubmit={(e) => { e.preventDefault(); updateSalon(); }}>
                      <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                            label="Identifiant fiscal (patente):"
                            name='patente'
                            onChange={(e) => setupdatedPatente(e.target.value)}
                            placeholder='exemple: 1234567AAM000'
                            defaultValue={patente}
                            // helperText={value === '' ? "Email is required" : ""}
                            // error={value === ''}
                            fullWidth
                            variant="outlined"
                            disabled={verified || req}
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            label="Nom du Salon"
                            name='sname'
                            onChange={(e) => setupdatedsName(e.target.value)}
                            defaultValue={sname}
                            // helperText={value === '' ? "Email is required" : ""}
                            // error={value === ''}
                            fullWidth
                            disabled={req || verified}
                            variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" fullWidth>
                            <InputLabel>Gouvernorat</InputLabel>
                            <Select
                                label="Gouvernorat"
                                value={selectedGouvernorat}
                                onChange={handleGouvernoratChange}
                                disabled={req || verified}
                            >
                                {Object.keys(GovDel).map((gouv) => (
                                <MenuItem key={gouv} value={gouv}>
                                    {gouv}
                                </MenuItem>
                                ))}
                            </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" fullWidth>
                            <InputLabel>Delegation</InputLabel>
                            <Select
                                label="Delegation"
                                value={selectedDelegation}
                                onChange={(event) => setSelectedDelegation(event.target.value)}
                                disabled={!selectedGouvernorat || req} // Disable if no gouvernorat is selected
                            >
                                {delegationOptions.map((deleg) => (
                                <MenuItem key={deleg} value={deleg}>
                                    {deleg}
                                </MenuItem>
                                ))}
                            </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                        <Button
                              variant="text"
                              color="primary"
                              onClick={handleMapsModalOpen} // Open the modal when clicked
                            >
                              comment obtenir lien google maps?
                            </Button>                        <TextField
                            label="Lien google maps"
                            name='maps'
                            onChange={(e) => setupdatedMaps(e.target.value)}
                            placeholder='Lien google maps'
                            defaultValue={maps}
                            // helperText={value === '' ? "Email is required" : ""}
                            // error={value === ''}
                            fullWidth
                            variant="outlined"
                            disabled={verified || req}
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            multiline
                            rows={2}
                            label="Adresse"
                            name='adress'
                            defaultValue={adress}
                            disabled={req}
                            onChange={(e) => setupdatedAdress(e.target.value)}
                            // helperText={value === '' ? "Email is required" : ""}
                            // error={value === ''}
                            fullWidth
                            variant="outlined"
                            />
                        </Grid>
                        
                      </Grid>
                      <Box mt={2} textAlign="right">
                        <Button variant="contained" color="primary" onClick={updateSalon}>
                            Modifier
                        </Button>
                      </Box>
                    </form>
                  </Box>
                )}
                {tabValue === 3 && (
            <Box>
              <Typography variant="h5">Changer le mot de passe</Typography>
              <br/>
              <form onSubmit={(e) => { e.preventDefault(); updatePass(); }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                  <TextField
                      label="Mot de passe actuel"
                      type='password'
                      name='cpass'
                      onChange={(e) => setCpass(e.target.value)}
                      // helperText={value === '' ? "Email is required" : ""}
                      // error={value === ''}
                      fullWidth
                      variant="outlined"
                      />
                  </Grid>
                  <Grid item xs={12}>
                  <TextField
                      label="Nouveau mot de passe"
                      type='password'
                      name='pass'
                      onChange={(e) => setPass(e.target.value)}
                      // helperText={value === '' ? "Email is required" : ""}
                      // error={value === ''}
                      fullWidth
                      variant="outlined"
                      />
                  </Grid>
                  <Grid item xs={12}>
                  <TextField
                      label="Confirmer mot de passe"
                      name='repass'
                      type='password'
                      onChange={(e) => setRepass(e.target.value)}
                      // helperText={value === '' ? "Email is required" : ""}
                      // error={value === ''}
                      fullWidth
                      variant="outlined"
                      />
                  </Grid>
                </Grid>
                <Box mt={2} textAlign="right">
                <Button variant="contained" color="primary" onClick={updatePass}>
                      Modifier
                  </Button>
                </Box>
              </form>
            </Box>
          )}
               
      
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
      {/* Modal for Google Maps Help */}
      <Dialog
          open={openMapsModal}
          onClose={handleMapsModalClose}
          aria-labelledby="maps-modal-title"
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle id="maps-modal-title">Comment obtenir le lien Google Maps</DialogTitle>
          <DialogContent dividers>
            <Typography variant="body1">
              <ol>
                <li>Ouvrez <a href='https://www.google.com/maps' target="_blank" rel="noreferrer">Google Maps</a> et recherchez votre emplacement.</li>
                <li>Cliquez sur l'emplacement de votre salon, s'il n'exuste pas,  
                  cliquez longuement sur l'emplacement souhaité jusqu'à ce qu'il soit épinglé</li>
                <li>Sélectionnez "Partager" et copiez le lien fourni.</li>
              </ol>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleMapsModalClose} color="primary">
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
    </section>
    </>
  );
};

export default ProfileComponent;
