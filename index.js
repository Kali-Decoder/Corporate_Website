const express= require('express');
const app = express();
const port = process.env.PORT || 3000;
const nodeMailer= require("nodemailer");
require('dotenv').config();

// const baseRoutes= require('./routes/baseRoutes');
const authRoutes= require('./routes/authRoutes');
// const protectedRoutes= require('./middleware/protectedRoutes');
// const errorRoutes= require('./routes/errorRoutes');
// const session= require('express-session');
// const checkAuthentication= require('./middleware/checkAuthentication');
// const errorMiddleware= require('./middleware/errorMiddleware');
// const mongoDbSession= require('connect-mongodb-session');
// const mongoDBStore= mongoDbSession(session);





// const sessionStore= new mongoDBStore({
//     uri:'mongodb+srv://nikku876:nikku123@cluster0.1pqux.mongodb.net/BLOG?retryWrites=true&w=majority',
//     databaseName:'BLOG',
//     collection:'confessionSession',
// });


app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('view engine','ejs');

// app.use(session({
//     secret:'love-radhe',
//     resave:false,
//     saveUninitialized:false,
//     store:sessionStore,
//     cookie:{
//         maxAge:60*60*1000,
//     },
// }));
// app.use(checkAuthentication);
require('./database/db');

/** Routes Use As Middleware */
// app.use(protectedRoutes);
// app.use(baseRoutes);
// app.use(errorRoutes);
app.use(authRoutes);
// app.use(errorMiddleware);


app.listen(port,()=>{
    console.log("Server is listen on :"+port);
})