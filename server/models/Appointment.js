const mongoose = require('mongoose');

const newAppointment = new mongoose.Schema({
    barberID: {
        type: String
    },
    userID: {
        type: String
    },
    name: {
        type: String
    },
    date: {
        type: String
    },
    day: {
        type: String
    },
    time: {
        type: String
    },
    phone: {
        type: String
    },
    service: {
        type: String
    },
    price: {
        type: Number
    },
    avgTime: {
        type: Number
    },
    timeInMS: {
        type: Number
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'declined', 'expired', 'done'],
        default: 'pending'
    }
});

const appoint = mongoose.model('appointments', newAppointment);

// Create a function to update expired appointments
async function updateExpiredAppointments() {
    const currentTime = new Date();
    await appoint.updateMany({
      status: 'pending',
      $expr: {
        $lt: [
          {
            $dateFromString: {
              dateString: { $concat: ['$date', ' ', '$time'] },
              timezone: 'Europe/Paris' // adjusted to GMT+1
            }
          },
          currentTime
        ]
      }
    }, {
      $set: { status: 'expired' }
    });
  }

//   async function updateDoneAppointments() {
//     const currentTime = new Date().getTime(); // get the current timestamp
//     await appoint.updateMany({
//       status: 'accepted',
//       $expr: {
//         $lt: [
//           currentTime,
//           {
//             $add: [
//               {
//                 $dateFromString: {
//                   dateString: `$date $time`,
//                   format: `%Y-%m-%d %H:%M`,
//                   timezone: 'Europe/Paris' // adjust to your timezone (GMT+1)
//                 }
//               }.getTime(), // convert to timestamp
//               { $multiply: [this.avgTime, 60000] }
//             ]
//           }
//         ]
//       }
//     }, {
//       $set: { status: 'done' }
//     });
//   }

// Run the function at a specific interval (e.g., every 1 minute)
setInterval(updateExpiredAppointments, 1000); // 60000 ms = 1 minute
// setInterval(updateDoneAppointments, 1000); // 60000 ms = 1 minute


module.exports = appoint