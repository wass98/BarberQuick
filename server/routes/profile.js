const router = require('express').Router()
const Users = require('../models/User');
const Barbers = require('../models/Barber');
const NewAppointment = require('../models/Appointment');


router.get('/profiledata', async(req, res) =>{
    
    console.log('profile data')
    
    const user = await Users.findOne({_id:req.query.id})
    if(!user) return res.send({error:'user dosent exists'})

    res.send({
    email:user.email,
    phone:user.phone,
    name:user.name})
})

router.get('/bprofiledata', async(req, res) =>{
    
    console.log('profile data')
    
    const barber = await Barbers.findOne({_id:req.query.id})
    if(!barber) return res.send({error:'barber dosent exists'})

    res.send({
    email:barber.email,
    phone:barber.phone,
    name:barber.name,
    state:barber.state,
    adress:barber.adress
    })
})

router.post('/updateprofile', async(req, res) =>{

    console.log('update profile')
    let {name, email, phone, userID} = req.body

    const user = await Users.findOne({_id:userID})
    if(!user) return res.send({error:'user dosent exists'})
  
    if(name !=='') user.name = name
    if(email !=='') user.email = email
    if(phone !=='') user.phone = phone

    user.save()
    res.send('update succeed')
})

router.post('/updatebprofile', async(req, res) =>{

    console.log('update profile')
    let {name, email, phone, state, adress, barberID} = req.body

    const barber = await Barbers.findOne({_id:barberID})
    if(!barber) return res.send({error:'barber dosent exists'})
  
    if(name !=='') barber.name = name
    if(email !=='') barber.email = email
    if(phone !=='') barber.phone = phone
    if(state !=='') barber.state = state
    if(adress !=='') barber.adress = adress

    barber.save()
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

module.exports = router