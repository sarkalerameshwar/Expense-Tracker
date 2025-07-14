import express from 'express'
import connectDB from './config/db.js'
import authRoutes from './routes/auth.route.js';
import expenseRoutes from './routes/expense.route.js';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
const port = 3000;

dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());

// routes handler
app.use('/api/auth', authRoutes);
app.use('/api/expense', expenseRoutes);

app.get('/', (req,res)=>{
    res.send('Hello World!');
})

app.listen(port, (req, res)=>{
    console.log(`Server is running on port ${port}`);
})