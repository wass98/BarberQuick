const router = require('express').Router()
const Users = require('../models/User');
const Barbers = require('../models/Barber');
const NewAppointment = require('../models/Appointment');
const Admin = require('../models/Admin');
const Review = require ('../models/Review')




router.get('/getallusers', async (req, res) => {
    const users = await Users.find();
    res.send(users);
});


router.get('/getallbarbers', async (req, res) => {
    const barbers = await Barbers.find();
    res.send(barbers);
});

router.get('/getsalonreq', async (req, res) => {
    try {
        // Find barbers where barber.req is true
        const barbers = await Barbers.find({ req: true });
        res.send(barbers);
    } catch (error) {
        console.error("Error fetching barbers:", error);
        res.status(500).send("Server Error");
    }
});




// Update barber's request status
router.put('/updatebarber/:id', async (req, res) => {
  try {
    const { req: requestStatus, verified } = req.body; // Destructure req and verified from the request body
    const barberId = req.params.id;

    // Find the barber by ID and update the necessary fields
    const updatedBarber = await Barbers.findByIdAndUpdate(
      barberId,
      { req: requestStatus, verified: verified || false },
      { new: true } // Return the updated document
    );

    if (!updatedBarber) {
      return res.status(404).json({ message: 'Barber not found' });
    }

    res.status(200).json(updatedBarber);
  } catch (error) {
    res.status(500).json({ message: 'Error updating barber', error });
  }
});

module.exports = router;



router.get('/getallreviews', async (req, res) => {
    const barbers = await Review.find();
    res.send(barbers);
});

router.get('/getuserscount', async (req, res) => {
    const usersCount = await Users.countDocuments();
    res.send({ count: usersCount });
});

router.get('/getbarberscount', async (req, res) => {
    const barbersCount = await Barbers.countDocuments();
    res.send({ count: barbersCount });
});

router.get('/getbookingscount', async (req, res) => {
    const bookingsCount = await NewAppointment.countDocuments();
    res.send({ count: bookingsCount });
});

router.get('/getreviewscount', async (req, res) => {
    const bookingsCount = await Review.countDocuments();
    res.send({ count: bookingsCount });
});

router.post('/adminlogin', async (req, res) => {
    

    let {email, pass} = req.body
    // console.log('login data: ',req.body)
    const  adminExists = await Admin.find({email:email}) // return array of objects
    
    console.log(adminExists);

    if(adminExists[0]){
        if(pass === adminExists[0].password){
            let adminname = adminExists[0].fname+' '+adminExists[0].lname
            let adminPhone = adminExists[0].phone
            let role = adminExists[0].role
            
        
            res.send({id:adminExists[0]._id,
                status:'loggedin',
                name:adminname,
                superadmin: 'superadmin' === role,
                phone:adminPhone
            })
        }
        else return res.send({error:'Sorry wrong password'})
    } 

    if (!adminExists[0]) return res.send({error:'Email not found'})
        
        
})

router.delete('/deletebarber/:id', async (req, res) => {
    try {
      const barber = await Barbers.findByIdAndDelete(req.params.id);
      if (!barber) {
        return res.status(404).json({ message: 'Barber not found' });
      }
      res.json({ message: 'Barber deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.delete('/deletereview/:id', async (req, res) => {
    try {
      const barber = await Review.findByIdAndDelete(req.params.id);
      if (!barber) {
        return res.status(404).json({ message: 'Review not found' });
      }
      res.json({ message: 'Review deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.delete('/deleteuser/:id', async (req, res) => {
    try {
      const user = await Users.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'user not found' });
      }
      res.json({ message: 'user deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });



module.exports = router