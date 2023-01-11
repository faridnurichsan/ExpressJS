import 'dotenv/config'
import express from 'express';
import { sequelize } from './models/init-models';
import routes from './routes/IndexRouter';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}))

const port = process.env.PORT || 3000

app.listen(port,() => {
    console.log(`listening on ${port}`);
});

const dropDatabaseSync = false;
sequelize.sync({force: dropDatabaseSync}).then(()=>{
    if(dropDatabaseSync){
        console.log("Database do not drop");
    }
})

app.use(routes)