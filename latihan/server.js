import express from 'express';
import 'dotenv/config';
import { sequelize } from './models/init-models';
import routes from './routes/userRoutes';
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = process.env.PORT || 3008

app.listen(port,() => {console.log(`server listen on port ${port}`);})

// app.use('/',(req, res) => {
//     res.send('Hello')
// })

const dropDatabaseSync = false;
sequelize.sync({force: dropDatabaseSync}).then(()=>{
    if(dropDatabaseSync){
        console.log("Database do not drop");
    }
})

app.use(routes);