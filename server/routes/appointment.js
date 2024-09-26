const router = require('express').Router();
const NewAppointment = require('../models/Appointment');
const Users = require('../models/User');
const Barbers = require('../models/Barber'); 





router.post('/appointment', async (req, res) => {
  console.log('making appointment');

  const appointmentExists = await NewAppointment.find({ userID: req.body.userID });
  
  // Check if any existing appointment has the status 'En attente' or 'Accepté'
  const hasActiveAppointment = appointmentExists.some(appointment => 
      appointment.status === 'En attente' || appointment.status === 'Accepté'
  );

  if (hasActiveAppointment) {
      return res.send({ error: 'Vous avez déjà un rendez-vous' });
  }

  const user = await Users.findOne({ _id: req.body.userID });
  const barber = await Barbers.findOne({ _id: req.body.barberID });

  if (!user) return res.send({ error: 'User doesn\'t exist' });

  let { barberID, userID, name, date, time, phone, day, service, price, avgTime, timeInMS } = req.body;

  const bname = barber.fname + ' ' + barber.lname;
  const cname = user.fname + ' ' + user.lname;
  const sname = barber.sname;
  const bphone = barber.phone;
  const cphone = user.phone;

  const newAppointment = new NewAppointment({
      barberID,
      userID,
      bname,
      cname,
      sname,
      date,
      day,
      time,
      bphone,
      cphone,
      service,
      price,
      avgTime,
      timeInMS
  });

  await newAppointment.save();

  user.phone = phone;
  await user.save();

  console.log('Appointment scheduled successfully!');
  res.status(200).send({message:'Rendez-vous planifié avec succès !'});
});

// New API to fetch appointments for a specific date
router.post('/appointmentscheck', async (req, res) => {
  const { barberID, date } = req.body; // Destructure from req.body

  try {
      // Find appointments for the barber on the selected date
      const appointments = await NewAppointment.find({ barberID, date });

      if (!appointments || appointments.length === 0) {
          return res.status(404).send({ error: 'No appointments found' });
      }

      // Return the list of times that are already booked
      res.status(200).send(appointments.map(app => app.time));
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Server error' });
  }
});


router.put('/userappointment/feedback/:id', async (req, res) => {
  const { note, feedback } = req.body;
  const appointmentId = req.params.id;

  try {
    const appointment = await NewAppointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Update the evaluation fields
    appointment.evaluation = {
      note,
      feedback
    };

    await appointment.save();

    // Calculate the new rating for the barber
    const barberId = appointment.barberID;

    const ratingAggregate = await NewAppointment.aggregate([
      {
        $match: {
          barberID: barberId,
          "evaluation.note": { $exists: true, $ne: null }
        }
      },
      {
        $group: {
          _id: '$barberID',
          totalNotes: { $sum: "$evaluation.note" },
          count: { $sum: 1 }
        }
      }
    ]);

    if (ratingAggregate.length > 0) {
      const { totalNotes, count } = ratingAggregate[0];
      const newRating = totalNotes / count;

      // Update the barber's rating
      await Barbers.findByIdAndUpdate(barberId, { rating: newRating });
    }

    res.json({ message: 'Feedback submitted successfully and rating updated', appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to submit feedback and update rating' });
  }
});




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


router.get('/userappointment', async (req, res) => {
  try {
    // Find all appointments for the given userID
    const appointments = await NewAppointment.find({ userID: req.query.id });

    // If no appointments are found, send an error response
    if (appointments.length === 0) {
      return res.send({ error: 'No appointments found' });
    }

    console.log('User appointments fetched');

    // Format the data if needed (this will send the entire array of appointments)
    const formattedAppointments = appointments.map(appointment => ({
      id:appointment._id,
      day: appointment.day,
      time: appointment.time,
      date: appointment.date,
      service: appointment.service,
      price: appointment.price,
      avgTime: appointment.avgTime,
      status: appointment.status,
      bname: appointment.bname,   // Barber's name
      cname: appointment.cname,   // Client's name
      sname: appointment.sname,   // Salon name
      bphone: appointment.bphone, // Barber's phone
      cphone: appointment.cphone, // Client's phone
      barberID: appointment.barberID,
      evaluation: appointment.evaluation || null,
    }));

    // Send the formatted array of appointments
    res.send(formattedAppointments);
  } catch (error) {
    // Catch any potential errors and return a 500 status code
    console.error('Error fetching appointments:', error);
    res.status(500).send({ error: 'Server error' });
  }
});

router.delete('/userappointmentdel/:id', async (req, res) => {
  try {
    const appointmentId = req.params.id;  // Ensure this is being passed correctly

    const deletedAppointment = await NewAppointment.findByIdAndDelete(appointmentId);

    if (!deletedAppointment) {
      return res.status(404).send({ error: 'Appointment not found' });
    }

    res.send({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).send({ error: 'Server error' });
  }
});



router.get('/getappointments', async(req, res) => {

  console.log('get appointments')
  const barberID = req.query.barberID;
  const appointmentExists = await NewAppointment.find({ barberID, status: { $in: ['Accepté'] } }) // return array of objects
  if(!appointmentExists[0]) return res.send({error:'You have no appointments'})

  res.send(appointmentExists)
})

router.get('/getappointmentreq', async(req, res) => {

  console.log('get appointments')
  const barberID = req.query.barberID;
  const appointmentExists = await NewAppointment.find({ barberID, status: 'En attente' }) // return array of objects
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

router.put('/status/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Update the appointment's status to "Terminé"
    const updatedAppointment = await NewAppointment.findByIdAndUpdate(
      id,
      { status: "Terminé" },
      { new: true } // Return the updated document
    );
    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


router.put('/report/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Increment the user's report count
    const updatedUser = await Users.findByIdAndUpdate(
      id,
      { $inc: { report: 1 } }, // Increment report count by 1
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/api/revenue', async (req, res) => {
  const { barberID } = req.query; // Get barberID from query parameters

  if (!barberID) {
    return res.status(400).json({ message: 'barberID is required' });
  }

  try {
    const totalRevenue = await NewAppointment.aggregate([
      { $match: { status: 'Terminé', barberID: barberID } }, // Match appointments with the given barberID
      { $group: { _id: null, total: { $sum: '$price' } } }
    ]);

    res.json({ totalRevenue: totalRevenue[0]?.total || 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/api/appointments/count', async (req, res) => {
  const { barberID } = req.query; // Get barberID from query parameters

  if (!barberID) {
    return res.status(400).json({ message: 'barberID is required' });
  }

  try {
    const count = await NewAppointment.countDocuments({
      status: 'Terminé',
      barberID: barberID, // Filter by barberID
    });
    res.json({ totalAppointments: count });
  } catch (error) {
    console.error('Error counting appointments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Count distinct clients (userID) from appointments
router.get('/clients/count', async (req, res) => {
  const { barberID } = req.query;

  if (!barberID) {
    return res.status(400).json({ message: 'barberID is required' });
  }

  try {
    const distinctClients = await NewAppointment.distinct('userID', { barberID });
    res.json({ totalClients: distinctClients.length });
  } catch (error) {
    console.error('Error counting clients:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Count total reviews based on evaluation notes or feedback
router.get('/reviews/count', async (req, res) => {
  const { barberID } = req.query;

  if (!barberID) {
    return res.status(400).json({ message: 'barberID is required' });
  }

  try {
    const totalReviews = await NewAppointment.countDocuments({
      barberID,
      'evaluation.note': { $ne: null },  // Ensure the note exists and is not null
      'evaluation.feedback': { $exists: true, $ne: null }  // Optional: Ensure feedback exists
    });
    res.json({ totalReviews });
  } catch (error) {
    console.error('Error counting reviews:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/getBlockedTimes', async (req, res) => {
  const { barberID, date } = req.query;

  try {
      // Fetch all appointments for the given barber and date
      const appointments = await NewAppointment.find({ barberID, date });

      // Create a set to hold blocked times
      const blockedTimes = new Set();

      // Loop through each appointment and add the time to the blocked times
      appointments.forEach(appointment => {
          blockedTimes.add(appointment.time); // Assuming `time` is in 'HH:mm' format
      });

      // Convert Set to Array
      const blockedTimesArray = Array.from(blockedTimes);

      res.json({ blockedTimes: blockedTimesArray });
  } catch (error) {
      console.error('Error fetching blocked times:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});








module.exports = router;