const router = require('express').Router();
const NewAppointment = require('../models/Appointment');
const Users = require('../models/User');
const Barbers = require('../models/Barber'); 



router.post('/appointment', async (req, res)=>{
    console.log('making appointment')

    const appointmentExists = await NewAppointment.find({userID:req.body.userID}) // return array of objects
    if(appointmentExists[0]) return res.send({error:'You alreay have appointment'})


    const user = await Users.findOne({_id:req.body.userID})
    if(!user) return res.send({error:'user dosent exists'})

    let {barberID, userID, name, date, time, phone, day, service, price, avgTime, timeInMS} = req.body

    const newAppointment = new NewAppointment({   
        barberID,
        userID,
        name,
        date,
        time,
        phone,
        day,
        service,
        price,
        avgTime,
        timeInMS
      })
      newAppointment.save()

      user.phone = phone
      user.save()
      console.log('Appointment scheduled successfully!')
    res.status(200).send('Appointment scheduled successfully!')
})




router.post('/changeappointment', async (req, res)=>{
  console.log('changing appointment')

  const appointmentExists = await NewAppointment.find({userID:req.body.userID}) // return array of objects
  if(!appointmentExists[0]) return res.send({error:'Appointment not found'})

  let {key, date, time, day, timeInMS} = req.body

  appointmentExists[0].appointmentKey = key
  appointmentExists[0].date = date
  appointmentExists[0].time = time
  appointmentExists[0].day = day
  appointmentExists[0].timeInMS = timeInMS

  appointmentExists[0].save()
  res.status(200).send('appointment changed!')
})


router.get('/userappointment', async(req, res) =>{

  const appointmentExists = await NewAppointment.find({userID:req.query.id}) // return array of objects
  if(!appointmentExists[0]) return res.send({error:'Appointment not found'})

  console.log('user appointment')

  let obj = {}
  obj.day = appointmentExists[0].day
  obj.time = appointmentExists[0].time
  obj.date = appointmentExists[0].date
  obj.service = appointmentExists[0].service
  obj.price = appointmentExists[0].price
  obj.avgTime = appointmentExists[0].avgTime
  obj.status = appointmentExists[0].status
  
  res.send(obj)

})

router.get('/getappointments', async(req, res) => {

  console.log('get appointments')
  const barberID = req.query.barberID;
  const appointmentExists = await NewAppointment.find({ barberID, status: { $in: ['accepted', 'done'] } }) // return array of objects
  if(!appointmentExists[0]) return res.send({error:'You have no appointments'})

  res.send(appointmentExists)
})

router.get('/getappointmentreq', async(req, res) => {

  console.log('get appointments')
  const barberID = req.query.barberID;
  const appointmentExists = await NewAppointment.find({ barberID, status: 'pending' }) // return array of objects
  if(!appointmentExists[0]) return res.send({error:'You have no appointments'})

  res.send(appointmentExists)
})

router.put('/updateappointment', async (req, res) => {
  try {
    const { id, status } = req.body;
    const appointment = await NewAppointment.findByIdAndUpdate(id, { status }, { new: true });
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update appointment' });
  }
});


router.post('/cancelappointment', async(req, res) =>{

  console.log('cancel appointment', req.body)

  const appointmentExists = await NewAppointment.find({userID:req.body.id}) // return array of objects
  if(!appointmentExists[0]) return res.send({error:'Appointment not found'})

  try{
    let deleteRes = await NewAppointment.deleteOne({_id:appointmentExists[0]._id})
    console.log('deleteRes: ',deleteRes)

  }catch(e){
    console.log(e)
  }



  res.send('canceling appointment...')


})

router.get('/getusers', async(req, res) => {
  console.log('get users')
  const usersExists = await Users.find()
  if(!usersExists[0]) return res.send({error:'No Users'})

  res.send(usersExists)

})

router.get('/getbarbers', async(req, res) => {
  console.log('get barbers')
  const barberExist = await Barbers.find()
  if(!barberExist[0]) return res.send({error:'No barbers'})
  
  res.send(barberExist)
})


module.exports = router;