import UserModals from "../Modals/User.Modals.js";
import bcrypt from 'bcrypt';

export const Login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password)res.status(401).json({success:false, message: error})

        const user  = await UserModals.find({email: email})
        console.log(user, "user")
        return res.send(true)
    } 
    catch(error){
        return res.status(500).json({success:false, message: error})
    }
}

export const Register = async (req, res) => {
    try {

        const{ name, email, password, number } = req.body;

        console.log(req.body, "req.body")

        if(!name || !email || !password || !number){
            return res.status(401).json({success:'false', message:'all fields mandatory'})
        }

        const hashPassword = await bcrypt.hash(password, 10);
        // console.log(hashPassword)

        const user = new UserModals({
            name, 
            email, 
            userPassword: hashPassword,
            userNumber: number
        })

        await user.save();

        return res.status(200).json({ success: 'true', message: 'Registration Successfull' })

    } catch (error) {
        return res.status(500).json({ success: 'false', message: 'error' })
    }
}

export const getCurrentUser = (req, res) => {
    res.send("HII")
}