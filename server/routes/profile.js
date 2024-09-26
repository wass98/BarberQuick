const router = require('express').Router()
const Users = require('../models/User');
const Barbers = require('../models/Barber');
const NewAppointment = require('../models/Appointment');
const Review = require('../models/Review')


router.get('/profiledata', async(req, res) =>{
    
    console.log('profile data')
    
    const user = await Users.findOne({_id:req.query.id})
    if(!user) return res.send({error:'user dosent exists'})

    res.send({
    email:user.email,
    phone:user.phone,
    fname:user.fname,
    lname:user.lname,
    state:user.state,
    delegation:user.delegation,
    bio:user.bio,
    cDate:user.cDate,
    profilePicture:user.profilePicture
})
})

router.get('/bprofiledata', async(req, res) =>{
    
    console.log('profile data')
    
    const barber = await Barbers.findOne({_id:req.query.id})
    if(!barber) return res.send({error:'barber dosent exists'})

    res.send({
    email:barber.email,
    phone:barber.phone,
    fname:barber.fname,
    lname:barber.lname,
    state:barber.state,
    delegation:barber.delegation,
    adress:barber.adress,
    bio:barber.bio,
    sname:barber.sname,
    rating:barber.rating,
    cDate:barber.cDate,
    patente:barber.patente,
    verified:barber.verified,
    req:barber.req,
    profilePicture:barber.profilePicture,
    maps:barber.maps

    })
})
router.post('/updateprofiledata', async (req, res) => {
    try {
        console.log('update profile data');
        let { fname, lname, email, phone, delegation, state, bio, userID } = req.body;
        
        const user = await Users.findOne({ _id: userID });
        
        if (!user) {
            return res.send({ error: 'Erreur!' });
        }

        
        
        if (typeof fname === 'undefined'|| fname ==='')return res.send({ error: "Prénom invalide" });
        if (typeof lname === 'undefined'|| lname ==='')return res.send({ error: "Nom invalide" });
        
        const emailExists = await Users.findOne({ 
            email: email,
                _id: { $ne: userID } // Exclude the current barber by ID
        });
        const emailExistsb = await Barbers.findOne({ 
            email: email,
            _id: { $ne: userID } // Exclude the current barber by ID
        });
        
        const phoneExists = await Users.findOne({ 
            phone: phone,
            _id: { $ne: userID } // Exclude the current barber by ID
        });
        const phoneExistsb = await Barbers.findOne({ 
            phone: phone,
            _id: { $ne: userID } // Exclude the current barber by ID
        });
        
        // Check for existing emails
        if (typeof email === 'undefined')return res.send({ error: "Email invalide" });
        const Regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
            // Validate patente
            if (!Regex.test(email)) {
                return res.send({error:'Format email invalide'});
            }
        if (emailExists||emailExistsb) {
            return res.send({ error: 'Email déjà utilisée!' });
        }
        
        // Check for existing phone numbers
        if (typeof phone === 'undefined' || isNaN(phone))return res.send({ error: "Mobile invalide" });
        if (phone.length!==8 ) return res.send({ error: "Mobile doit etre 8 chiffres" });
        if (phoneExists||phoneExistsb) {
            return res.send({ error: 'Mobile déjà utilisé!' });
        }
        if(typeof state==='undefined') return res.send({error:'Choisir le gouvernorat'});
        if(typeof delegation==='undefined') return res.send({error:'Choisir le delegation'});
        if(state&&state!==user.state&&delegation===user.delegation) return res.send({error:'Choisir le delegation'});
        
        if (
            fname === user.fname &&
            lname === user.lname &&
            email === user.email &&
            phone === user.phone &&
            state === user.state &&
            delegation === user.delegation &&
            bio === user.bio
          ) return res.send({ error: "Tu n'as rien modifier!" });
        
        
        // Update only if fields are provided
        if (fname) user.fname = fname;
        if (lname) user.lname = lname;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (state) user.state = state;
        if (delegation) user.delegation = delegation;
        if (bio) user.bio = bio;
        
        // Save updated barber data
        await user.save();
        
        // Send success response
        res.send('update succeed');
    } catch (error) {
        // Handle any other errors that might occur
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});



router.post('/updatebprofiledata', async (req, res) => {
    try {
        console.log('update profile data');
        let { fname, lname, email, phone, bio, barberID } = req.body;
        
        const barber = await Barbers.findOne({ _id: barberID });
        
        if (!barber) {
            return res.send({ error: 'Erreur!' });
        }

        
        
        if (typeof fname === 'undefined'|| fname ==='')return res.send({ error: "Prénom invalide" });
        if (typeof lname === 'undefined'|| lname ==='')return res.send({ error: "Nom invalide" });
        
        const emailExists = await Barbers.findOne({ 
            email: email,
                _id: { $ne: barberID } // Exclude the current barber by ID
        });
        const emailExistsu = await Users.findOne({ 
            email: email,
            _id: { $ne: barberID } // Exclude the current barber by ID
        });
        
        const phoneExists = await Barbers.findOne({ 
            phone: phone,
            _id: { $ne: barberID } // Exclude the current barber by ID
        });
        const phoneExistsu = await Users.findOne({ 
            phone: phone,
            _id: { $ne: barberID } // Exclude the current barber by ID
        });
        
        // Check for existing emails
        if (typeof email === 'undefined')return res.send({ error: "Email invalide" });
        const Regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
            // Validate patente
            if (!Regex.test(email)) {
                return res.send({error:'Format email invalide'});
            }
        if (emailExists||emailExistsu) {
            return res.send({ error: 'Email déjà utilisée!' });
        }
        
        // Check for existing phone numbers
        if (typeof phone === 'undefined' || isNaN(phone))return res.send({ error: "Mobile invalide" });
        if (phone.length!==8 ) return res.send({ error: "Mobile doit etre 8 chiffres" });
        if (phoneExists||phoneExistsu) {
            return res.send({ error: 'Mobile déjà utilisé!' });
        }
        if (
            fname === barber.fname &&
            lname === barber.lname &&
            email === barber.email &&
            phone === barber.phone &&
            bio === barber.bio
          ) return res.send({ error: "Tu n'as rien modifier!" });
        
        // Check if no changes have been made
        if (
            barber.fname === fname &&
            barber.lname === lname &&
            barber.email === email &&
            barber.phone === phone &&
            barber.bio === bio
        ) {
            return res.send({ error: "Tu n'as rien modifié" });
        }
        
        // Update only if fields are provided
        if (fname) barber.fname = fname;
        if (lname) barber.lname = lname;
        if (email) barber.email = email;
        if (phone) barber.phone = phone;
        if (bio) barber.bio = bio;
        
        // Save updated barber data
        await barber.save();
        
        // Send success response
        res.send('update succeed');
    } catch (error) {
        // Handle any other errors that might occur
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


router.post('/updatebsalon', async(req, res) =>{

    console.log('update salon')
    let {patente, sname, state, delegation,maps, adress, barberID} = req.body
    
    const barber = await Barbers.findOne({_id:barberID})
    const patenteExists = await Barbers.findOne({ 
        patente: patente,
        _id: { $ne: barberID } // Exclude the current barber by ID
    });

    if (patenteExists) return res.send({error:'Matricule déjà utilisé!'})
    if(!barber) return res.send({error:'Erreur!'})
        if(sname=== undefined ||sname==='') return res.send({error:'Nom de Salon invalide'});
        if(state=== undefined || state ==='') return res.send({error:'Choisir le gouvernorat'});
        if(delegation=== undefined || delegation==='') return res.send({error:'Choisir le delegation'});
        if(state&&state!==barber.state&&delegation===barber.delegation) return res.send({error:'Choisir le delegation'});
        if(maps === undefined || maps ==='') return res.send({error:'Lien google maps invalide'});
        if(adress=== undefined || adress==='') return res.send({error:"Tapez l'Adresse"});

          
        if (
            barber.sname === sname &&
            barber.state === state &&
            barber.delegation === delegation &&
            barber.maps === maps &&
            barber.adress === adress
        ) {
            return res.send({ error: "Tu n'as rien modifié" });
        }
  
    if(patente !=='') barber.patente = patente
    if(sname !=='') barber.sname = sname
    if(state !=='') barber.state = state
    if(delegation !=='') barber.delegation = delegation
    if(maps !=='') barber.maps = maps
    if(adress !=='') barber.adress = adress
    barber.req=true

    barber.save()
    res.send('update succeed')
})

router.post('/updatebpass', async(req, res) =>{

    console.log('update profile pass')
    let {cpass, pass, repass, barberID} = req.body
    
    const barber = await Barbers.findOne({_id:barberID})
    
    if(!barber) return res.send({error:'Erreur!'})
    if(barber.password !== cpass) return res.send({error:'Mot de Passe actuelle incorrecte'})
    if(pass !== repass) return res.send({error:'Les mots de passe ne correspondent pas'})

  
    barber.password = pass

    barber.save()
    res.send('update succeed')
})

router.post('/updatepass', async(req, res) =>{

    console.log('update profile pass')
    let {cpass, pass, repass, userID} = req.body
    
    const user = await Users.findOne({_id:userID})
    
    if(!user) return res.send({error:'Erreur!'})
    if(user.password !== cpass) return res.send({error:'Mot de Passe actuelle incorrecte'})
    if(pass !== repass) return res.send({error:'Les mots de passe ne correspondent pas'})

  
    user.password = pass

    user.save()
    res.send('update succeed')
})


router.post('/deleteacc', async(req, res) =>{

    console.log('delete account: ', req.body)

    const appointmentExists = await NewAppointment.find({userID:req.body.id})   
    if(appointmentExists[0]){

        try{
            let deleteRes = await NewAppointment.deleteOne({_id:appointmentExists[0]._id})
            console.log('deleteRes: ',deleteRes)
        
        }catch(e){
            console.log(e)
        }
    }

    try{
        let userDeleteRes = await Users.deleteOne({_id:req.body.id})
        // console.log('user deleted: ',userDeleteRes.deletedCount)

    }catch(e){
        console.log(e)
    }
     

    res.send('Account deleted successfully')

})

router.post('/postreview', async (req, res) => {
    try {
      const { fname, lname, email, phone, subject, msg } = req.body;


  
      // Create a new review instance
      const newReview = new Review({
        fname,
        lname,
        email,
        phone,
        subject,
        msg
      });
  
      // Save the review to MongoDB
      await newReview.save();
  
      res.status(201).json({ message: 'Review submitted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  });
  

module.exports = router