const router = require('express').Router();
const Service = require('../models/Service');




// router.post('/addservice', async (req, res) =>{
//     let {barberID, name, description, price, duration} = req.body
    
//     console.log('register data: ',req.body)
//     // const barberExists = await NewBarber.find({ email: req.body.email })
//     // const userExists = await NewUser.find({ email: req.body.email })
//     // if (name.length>4) return res.send({error:'Service name too short'});
//     // if (description.length < 4 ) return res.send({error:'Description too short'})
//     // if (price =='') return res.send({error:'Please add service price'})
//     // if (duration=='') return res.send({error:'Please add service duration'})

//     const newService = new Service({   
//       barberID:barberID,
//       name:name,
//       description:description,
//       price:price,
//       duration:duration
//     })

//     newService.save()
//     res.status(200).send('success')
// })

// router.post('/addservice2', async (req, res) => {
//   try {
//     let { barberID, name, description, price, duration } = req.body;
//     console.log('register data: ', req.body);

//     // Validate request data
//     if (!barberID || !name || !description || !price || !duration) {
//       return res.status(400).send('All fields are required');
//     }

//     const newService = new Service({
//       barberID: barberID,
//       name: name,
//       description: description,
//       price: price,
//       duration: duration
//     });

//     // Save the new service to the database
//     const savedService = await newService.save();
//     res.status(201).send(savedService);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error adding service');
//   }
// });

router.post('/addservice', async (req, res) => {
  const { barberID, name, description, price, duration } = req.body;
  const newService = new Service({ barberID, name, description, price, duration });
  await newService.save();
  res.send({ message: 'Service added successfully', service: newService });
});

router.get('/getservices', async(req, res) => {
    console.log('get services')
    const serviceExist = await Service.find()
    if(!serviceExist[0]) return res.send({error:'No services'})
    
    res.send(serviceExist)
})

router.get('/getservices2', async (req, res) => {
  console.log('get services')
  const barberID = req.query.barberID;
  const serviceExist = await Service.find({ barberID: barberID });
  if (!serviceExist[0]) return res.send({ error: 'No services' });
  
  res.send(serviceExist)
})

router.post('/deleteservice', async(req, res) =>{

  console.log('delete service: ', req.body)


  try{
      let serviceDeleteRes = await Service.deleteOne({_id:req.body.id})
      // console.log('user deleted: ',userDeleteRes.deletedCount)

  }catch(e){
      console.log(e)
  }
   

  res.send('Service deleted successfully')

})

router.delete('/deleteservice/:serviceID', async (req, res) => {
  const serviceID = req.params.serviceID;
  await Service.findByIdAndRemove(serviceID);
  res.send({ message: 'Service deleted successfully' });
});
  
  
module.exports = router;