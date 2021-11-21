const app = require('./app.js')
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

// const multer = require('multer');
// const upload = multer({
//     dest: './src/images'
// });


// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send();
// });

// const Task = require('./db/models/task');
// const User = require('./db/models/user');

// const main = async () => {
//     // const task = await Task.findById('61915b1557de85481b6c03bb');
//     // await task.populate('owner');
//     // console.log(task.owner)

//     const user = await User.findById('61915a391656af8d1c68cc50');
//     await user.populate('tasks');

//     console.log(user.tasks)
// };

// main();

// const pet = {
//     name: 'Hal'
// }

// pet.toJSON = function() {
//     console.log(this);
//     return {};
// }

// console.log(JSON.stringify(pet)); 

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET Requests are disabled');
//     } else {
//         next();
//     }
// });

// app.use((req, res, next) => {
//     res.status(503).send('Site is under maintenance!');
// });

// const bcrypt = require('bcryptjs');

// const myFunction = async () => {
//     const password = 'red12342!';
//     const hashedPassword = await bcrypt.hash(password, 8);

//     console.log(password);
//     console.log(hashedPassword);

//     const isMatch = await bcrypt.compare(password, hashedPassword);
//     console.log(isMatch);
// }
// myFunction();

// const jwt = require('jsonwebtoken');

// const myFunction = async () => {
//     const token = jwt.sign({ _id: '123abc' }, 'hellosecretword', { expiresIn: '1 day'});
//     console.log(token);

//     const payload = jwt.verify(token, 'hellosecretword');
//     console.log(payload);

// }

// myFunction();

