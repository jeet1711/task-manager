const mongoose = require('mongoose');
//const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true
//     },
//     age: {
//         type: Number,
//         validate(value) {
//              if(value<0)
//                  error;
//         }
//     }
// })

// const me = new User({
//     name: '    Sagnik',
//     //age: 21,
//     email: 'JEET@hmail.in   ',
//     password: 'password123'
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error! ',error)
// })




// const task = new Task({
//     description: 'A basic example using Mongoose',
//     completed: true
// })

// task.save().then(() => {
//     console.log(task);
// }).catch((error) => {
//     console.log(error);
// })

