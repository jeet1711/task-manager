const express = require('express')
require('./db/mongoose');

const userRouter = require('./router/user')
const taskRouter = require('./router/task')


const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('server is running on port ' + port);
})

//MIDDLEWARE FOR MAITAINANCE AUTHENTICATION
// app.use((req, res, next) => {
//     if(req.method){
//         res.status(503).send('Site under maintainance, please try after sometime')
//     }   
// })


// //UPLOAD FILE MULTER
// const multer = require('multer')
// const upload = multer ({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000 //Files less than or equal to 1mb
//     },
//     //filter using file type
//     fileFilter(req, file, cb){
//         if(!file.originalname.endsWith('.pdf')){
//             return cb(new Error ('Only pdf files are allowed.'))
//         }
//         // Another syntax for mutliple file type check...
//         // if(!file.originalname.match(/\.(doc|docx)$/)){
//         //     return cb(new Error ('Only Word files are allowed.'))
//         // }
//         return cb(undefined, true)
//     }
// })
// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send();
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// })


// const jwt = require('jsonwebtoken')

// const fun = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'thisismytoken', { expiresIn: '1 hour' })
//     console.log(token);

//     const data = jwt.verify(token, 'thisismytoken')
//     console.log(data);
// }

// fun()

// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {
//     // const task = await Task.findById('5f6452459d988a3d8895e87a')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user = await User.findById('5f62f3d73f365e1b30ad3ca9')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks);
// }

// main()
