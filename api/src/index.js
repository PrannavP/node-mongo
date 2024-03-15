import express from 'express';
import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/bca4semnews');

// schema
const Student = mongoose.model('Student', {
    name: String,
    email: String,
    address: String
});

const app = express();
app.use(express.json());

// default get method
app.get('/', async function(req, res){
    const students = await Student.find();
    res.json(students);
});

// get method with id
app.get('/:id', (req, res) => {
    res.send('Get student by id.')
});

// post method
app.post('/', async (req, res) => {
    const student = new Student(req.body);

    await student.save();
    res.json({ status: 201, message: "Student Saved" });
});

// put (edit) method
app.put('/', (req, res) => {
    res.send('I am put method');
});

app.delete('/', (req, res) => {
    res.send('I am delete method');
});

app.listen(3000, function(){
    console.log('Server is running on port 3000');
});