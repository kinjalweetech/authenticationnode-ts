import express from 'express';
import dotenv from 'dotenv'
import router from './routes/authRoutes';
import cookieParser from 'cookie-parser';
import { Request, Response } from 'express';

const port = process.env.SERVER_PORT || 5000
const app = express();

app.use(cookieParser());

app.use(express.json())
dotenv.config();

app.use((req, res, next) => {
    console.log(req.body,"dfgoidjgop");  // This will log the request body to the console
    next();
  });

// Routes
app.use('/api/auth', router);
app.post('/set-cookie', (req: Request, res: Response) => {
    // Set a cookie
    res.cookie('authToken', 'your_jwt_token', { httpOnly: true, maxAge: 3600000 });
    res.send('Cookie has been set');
  });

  app.get('/get-cookie', (req: Request, res: Response) => {
    const token = req.cookies['authToken'];  // Retrieve the JWT token from cookies
    if (token) {
      res.json({ message: 'Token found', token });
    } else {
      res.status(401).json({ message: 'No token found' });
    }
  });
  


app.get('/', (req,res) => {
    res.send("Main Page Is Running Now");
    
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})