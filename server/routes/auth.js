const router = require('express').Router();
const NewUser = require('../models/User');
const NewBarber = require('../models/Barber');


var key = 'real secret keys should be long and random';
var encryptor = require('simple-encryptor')(key);


router.get('/', async (req, res) => {

    // var encrypted = encryptor.encrypt('eliiii');
    // console.log('encrypted: %s', encrypted);

    // var decrypted = encryptor.decrypt(encrypted);
    // console.log('decrypted: %s', decrypted);

    res.send('hi from the server')
})

router.post('/register', async (req, res) =>{
    let {email, pass, confirmPass} = req.body

    console.log('register data: ',req.body)
    const userExists = await NewUser.find({ email: req.body.email })
    if (userExists[0]) return res.send({error:'The user already exists'})
    if (email.length < 10 ) return res.send({error:'Invalid email'})
    if (email.indexOf("@") < 1) return res.send({error:'Email must have @'})
    if (email.lastIndexOf(".") < email.indexOf("@")+2) return res.send({error:'Email must have . after @'})
    if (email.lastIndexOf(".")+2 >= email.length) return res.send({error:'Email not valid'})
    if (pass.length < 6) return res.send({error:'Password too short'})
    if( pass !== confirmPass) return res.send({error:'Password  does not match'})
        else{

    // if i will put extra data it will not added to the DB because Sechma
    // only the correct keys will added to the DB!
    let username = email.substring(0, email.indexOf('@'))

    const newUser = new NewUser({   
      email:email,
      password:pass,
      name:username
    })

    newUser.save()
    res.status(200).send('success')}
})

router.post('/registerb', async (req, res) =>{
    let {email, pass, confirmPass} = req.body
    
    console.log('register data: ',req.body)
    const barberExists = await NewBarber.find({ email: req.body.email })
    // const userExists = await NewUser.find({ email: req.body.email })
    if (barberExists[0]) return res.send({error:'Email already in use'});
    if (email.length < 10 ) return res.send({error:'Invalid email'})
    if (email.indexOf("@") < 1) return res.send({error:'Email must have @'})
    if (email.lastIndexOf(".") < email.indexOf("@")+2) return res.send({error:'Email must have . after @'})
    if (email.lastIndexOf(".")+2 >= email.length) return res.send({error:'Email not valid'})
    if (pass.length == 0) return res.send({error:'Please type a password'})
        if (pass.length < 6) return res.send({error:'Password too short'})


    else if( pass !== confirmPass) return res.send({error:'Password does not match'});
    else{

    
    let username = email.substring(0, email.indexOf('@'))
    
    const newBarber = new NewBarber({   
      email:email,
      password:pass,
      name:username
    })

    newBarber.save()
    res.status(200).send('success')}
})

router.post('/login', async (req, res) => {
    

    let {email, pass} = req.body
    // console.log('login data: ',req.body)
    const userExists = await NewUser.find({email:email}) // return array of objects
    const barberExists = await NewBarber.find({email:email}) // return array of objects
    
    console.log(userExists);
    // if(!userExists[0]) return res.send({error:'Email not found'})
    //     if (email.length < 10 ) return res.send({error:'Invalid email'})
    //         if (email.indexOf("@") < 1) return res.send({error:'Email must have @'})
    //             if (email.lastIndexOf(".") < email.indexOf("@")+2) return res.send({error:'Email must have . after @'})
    //                 if (email.lastIndexOf(".")+2 >= email.length) return res.send({error:'Email not valid'})    
    // if(pass !== userExists[0].password) return res.send({error:'Sorry wrong password'})

    if(userExists[0]){
        if(pass == userExists[0].password){
            let username = email.substring(0, email.indexOf('@'))
            let userPhone = ''
            let role = userExists[0].role
            if(userExists[0].phone)
                userPhone = userExists[0].phone
        
            res.send({id:userExists[0]._id,
                status:'logged',name:username,
                barber: false,
                phone:userPhone
            })
        }
        else return res.send({error:'Sorry wrong password'})
    }
    if(barberExists[0]){
        if(pass == barberExists[0].password){
            let username = email.substring(0, email.indexOf('@'))
            let barberPhone = ''
            let role = barberExists[0].role
            if(barberExists[0].phone)
                barberPhone = barberExists[0].phone
        
            res.send({id:barberExists[0]._id,
                status:'logged',name:username,
                barber: true,
                phone:barberPhone
            })
        }
        else return res.send({error:'Sorry wrong password'})
    } 

    if (!barberExists[0] && !userExists[0]) return res.send({error:'Email not found'})
        
        
    })

    
    router.post('/loginb', async (req, res) => {
        
        
        let {email, pass} = req.body
        // console.log('login data: ',req.body)
        const barberExists = await NewBarber.find({email:email}) // return array of objects
        // console.log(barberExists);
        // const userExists2 = await NewUser.findOne({_id:"5f2040182747a520a4b7a8be"}) // work only with id and return one object
        // const barberExists = await NewBarber.find({email:email})
    if(!barberExists[0]) return res.send({error:'Email not found'})
        if (email.length < 10 ) return res.send({error:'Invalid email'})
    if (email.indexOf("@") < 1) return res.send({error:'Email must have @'})
        if (email.lastIndexOf(".") < email.indexOf("@")+2) return res.send({error:'Email must have . after @'})
    if (email.lastIndexOf(".")+2 >= email.length) return res.send({error:'Email not valid'})    
    if(pass !== barberExists[0].password) return res.send({error:'Sorry wrong password'})
    
    let username = email.substring(0, email.indexOf('@'))
    let barberPhone = ''
    let role = barberExists[0].role
    if(barberExists[0].phone)
        barberPhone = barberExists[0].phone
    
    res.send({id:barberExists[0]._id,
        status:'logged',name:username,
        barber: true,
        phone:barberPhone
    })
})

// router.post('/register', async (req, res) =>{
//     let {email, pass, confirmPass} = req.body

//     console.log('register data: ',req.body)
//     const userExists = await NewUser.find({ email: req.body.email })
//     if (userExists[0]) return res.send({error:'The user already exists'})

//     if( pass !== confirmPass) return res.send({error:'pass not match'})

//     // if i will put extra data it will not added to the DB because Sechma
//     // only the correct keys will added to the DB!
//     let username = email.substring(0, email.indexOf('@'))

//     const newUser = new NewUser({   
//       email:email,
//       password:pass,
//       name:username
//     })

//     newUser.save()
//     res.status(200).send('success')
// })


// router.post('/login', async (req, res) => {
    
    
    //     let {email, pass} = req.body
    //     console.log('login data: ',req.body)
    //     const userExists = await NewUser.find({email:email}) // return array of objects
    //     // const userExists2 = await NewUser.findOne({_id:"5f2040182747a520a4b7a8be"}) // work only with id and return one object
//     if(!userExists[0]) return res.send({error:'Sorry user not found'})
    
//     if(pass !== userExists[0].password) return res.send({error:'Sorry wrong password'})

//     let username = email.substring(0, email.indexOf('@'))
//     let userPhone = 'phone...'
//     if(userExists[0].phone)
//         userPhone = userExists[0].phone

//     res.send({id:userExists[0]._id,
//         status:'logged',name:username,
//         admin:email.includes('admin'),
//         phone:userPhone
//         })
// })


module.exports = router;
