import express, { json } from "express";
import bcrypt from "bcrypt";
import jwt from "express-jwt"
import User from "../models/User.js";
import Hra from "../models/Hra.js";
import AppHra from "../models/AppHra.js";

const Router = express.Router();

Router.route('/').get((req, res) => {
    res.send(
        `<a href = "">Home</a>, <a href = "">somthing</a>, <a href = "">nothing</a>`
    )
})
Router.route('/signup').post(async (req, res) => {
    const { username, phone, email, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 12)
    const existingUser = await User.findOne({ email: email });
    if (!email) {
        res.status(401).json({ error: "email not found" })
    }
    else if (!password) {
        res.status(401).json({ error: "please enter password" })
    }
    else if (existingUser) {
        res.status(401).json({ error: "user already exist" })
    }
    try {
        const user = await User.create({ username, phone, email, password: hashpassword })
        res.status(201).json(user)
    } catch (error) {
        res.json({ error: `Uable to save the user details Error: ${error.message}` })
    }
});
Router.route('/signin').post(async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    const correctPassword = await bcrypt.compare(password, existingUser.password)
    if (!email) {
        res.status(401).json({ error: "email not found" })
    }
    else if (!password) {
        res.status(401).json({ error: "please enter password" })
    }
    else if (!correctPassword) {
        res.status(401).json({ error: "Email and password does not match" })
    }
    try {
        const token = jwt.sign({ _id: existingUser._id }, "secret")
        res.status(200).json({ token, existingUser })
    } catch (error) {
        res.status(400).json(`Something went wrong ${error}`)
    }
});
Router.route('/createEmp/:id').post(async (req, res) => {
    const { Bas, LTA, HRA, FA } = req.body;
    const User_id = req.params.id;
    try {
        await Hra.create({ Bas, LTA, HRA, FA, User_id })
        res.status(200).json({ message: "successful" })
    } catch (error) {
        res.status(404).json(`Uable to save the data please try again ${error}`)
    }
});
Router.route('/userinPuts/:id').put(async (req, res) => {
    const id = req.params.id;
    const { Inv, Rent, isMetroCity, Med } = req.body;
    try {
        const data = await Hra.findOneAndUpdate(
            { filter: { User_id: id } }, { Inv, Rent, isMetroCity, Med }, { new: true })
        res.status(200).jsonp(data)
    } catch (error) {
        res.status(404).json(`Uable to save the data please try again ${error}`)
    }
});
Router.route('/calculateAppHra/:id').patch(async (req, res) => {
    const User_id = req.params.id;
    const data = await Hra.findOneAndUpdate({ filter: { User_id: id } })
    let calBas = 0;
    let calRent = 0;
    if (isMetroCity === true) {
        calBas = 0.5 * data.Bas;
        calRent = 0.1 * data.Rent;
    } else {
        calBas = 0.4 * data.Bas;
        calRent = 0.1 * data.Rent;
    }
    let calculateAppHra = calBas + calRent + data.HRA
    try {
        await AppHra.create({calculateAppHra, User_id})
        res.status(200).json({message: "Created"})
    } catch (error) {
        res.status(404).json(`Uable to save the data please try again ${error}`)
    }
})
Router.route('/calculateTax/:id').get(async (req, res)  => {
    const Hra = await Hra.find
})



// Any individual’s salary consists of different components: Basic, LTA, HRA, Food Allowance etc. Ask the user to input these 4 parameters (Bas, LTA, HRA, FA)

// Ask the user to input the following:
// Investments under section 80C (Inv)
// Actual Rent paid by user (Rent)
// User stays in Metro/Non metro city (CityType)
// Mediclaim policy premium paid by user (Med)


export default Router