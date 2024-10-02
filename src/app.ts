import express from 'express';
import dotenv from 'dotenv'
import router from './routes/authRoutes';

const port = process.env.SERVER_PORT || 5000
const app = express();

app.use(express.json())
dotenv.config();

app.use('/api/auth', router);

app.get('/', (req,res) => {
    res.send("Main Page Is Running Now");
    
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})