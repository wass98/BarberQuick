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
  InputLabel
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

const UserProfile2 = () => {
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
    const [cDate, setcDate] = useState('');
    const [selectedFile, setSelectedFile] = useState(null); // New state for the selected file
    const [profilePicture, setProfilePicture] = useState(null);
  
    const [selectedGouvernorat, setSelectedGouvernorat] = useState('');
    const [selectedDelegation, setSelectedDelegation] = useState('');
    const [delegationOptions, setDelegationOptions] = useState([]);
//--------------------------------------------------------------------------
const [isConfirmVisible, setIsConfirmVisible] = useState(false);

//-----------------------------UPDATE DATA----------------------------------------------

    const [updatedfname, setupdatedfName] = useState('');
    const [updatedlname, setupdatedlName] = useState('');
    const [updatedemail, setupdatedEmail] = useState('');
    const [updatedphone, setupdatedPhone] = useState('');
    const [updatedbio, setupdatedBio] = useState('');
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
    const userID = getCookie('id')
    const formData = new FormData();
    formData.append('profilePicture', selectedFile);
  
    axios
      .post(`http://localhost:5000/upload-profile/${userID}`, formData)
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
    const userID = getCookie('id');
    getProfile(userID);
}, []);

const getProfile = (userID) => {
  axios
    .get(`http://localhost:5000/profiledata?id=${userID}`)
    .then((response) => {
      const { error, email, fname, lname, phone, state, delegation, cDate, bio, profilePicture } = response.data;
      if (error) {
        console.log(error);
      } else {
        setfName(fname);
        setlName(lname);
        setEmail(email);
        setPhone(phone);
        setState(state);
        setDelegation(delegation);
        setcDate(cDate);
        setBio(bio);
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
        state: selectedGouvernorat || state,
        delegation: selectedDelegation || delegation,
        bio: updatedbio || bio,
        userID: getCookie('id')
      };

      axios.post('http://localhost:5000/updateprofiledata', obj).then((response) => {
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



  const updatePass = () => {
    const obj = {
      cpass: cpass, // Use updated or fallback
      pass: pass,
      repass: repass,
      userID: getCookie('id'),
    };
    if (pass.length<6||cpass.length<6||repass.length<6) return toast.error('Mot de passe doit etre au moins 6 caractères!')
  
    axios.post('http://localhost:5000/updatepass', obj).then((response) => {
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
                    </Box>
                    <Typography color="textSecondary">Utilisateur</Typography>
                    <List>
                        {[
                            bio && { title: 'Bio:', value: `${bio}` }, // Only include this if bio is not empty
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
                            { title: 'Gouvernorat:', value: `${state}` },
                            { title: 'Delegation:', value: `${delegation}` },
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
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" fullWidth>
                            <InputLabel>Gouvernorat</InputLabel>
                            <Select
                                label="Gouvernorat"
                                value={selectedGouvernorat}
                                onChange={handleGouvernoratChange}
                                
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
                                disabled={!selectedGouvernorat} // Disable if no gouvernorat is selected
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
    </section>
    </>
  );
};

export default UserProfile2;
