const experss = require('express')
const app = experss()
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const { v4: uuid } = require('uuid')
app.use(experss.json())
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
dotenv.config()

const userSchema = new mongoose.Schema({
    name: String,
    phone: { type: String, unique: true },
    email: String,
    id: { type: Number, required: true }
})
mongoose.connect('mongodb+srv://root:1234@cluster0.hfc09rz.mongodb.net/contacts-lists')
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

const Data = mongoose.model('contacts-collection', userSchema, 'contacts-collection')


app.get('/', async (req, res) => {
    try {
        const getData = await Data.find()
        res.json(getData)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.post('/contacts', async (req, res) => {
    try {
        const { name, email, phone } = req.body
        if (!name || !email || !phone) return res.status(400)
        const exists = await Data.findOne({ phone })
        if (exists) return res.status(400).json({ message: 'Contact Already there' })
        const lastData = await Data.findOne().sort({ id: -1 })
        const newId = lastData ? lastData.id + 1 : 1
        const newData = new Data({ id: newId, name, email, phone })
        await newData.save()
        res.status(200).json({ message: "New contact added" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.delete('/contacts/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) return res.status(400).json({ message: 'Invalid car ID' });
        const deletedContact = await Data.findOneAndDelete({ id: id });

        if (!deletedContact) return res.status(404).json({ message: 'Contact not found ' });
        res.status(200).json({ message: 'Contact Deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.get('/contacts/:id', async (req, res) => {
    const id = req.params.id
    try {
        const contact = await Data.findOne({ id: id })
        if (contact) {
            res.status(200).json(contact)
        } else {
            res.status(404).json({ message: "Contact Not Found" })
        }
    } catch {
        res.status(500).json({ message: 'User Not Found' })
    }

})


app.listen(3000, () => {
    console.log(`Server Started Successfully http://localhost:${3000}`)
})