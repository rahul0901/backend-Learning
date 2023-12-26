import UserModals from "../Modals/User.Modals.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const Login = async (req, res) => {

    try {

        const { userKaEmail, userKaPassword } = req.body;

        console.log(req.body)

        if (!userKaEmail || !userKaPassword) {
            return res.status(401).json({ success: false, message: 'All field required.' })
        }

        const user = await UserModals.findOne({ email: userKaEmail })

        if (!user) {
            return res.status(401).json({ success: false, message: 'email not found' })
        }

        const isPassword = await bcrypt.compare(userKaPassword, user.userPassword)

        if (!isPassword) {
            return res.status(401).json({ success: false, message: 'pass not matched' })
        }
// token id ka bana na hai toh id ayega sign ki baad
        const token = await jwt.sign({id: user._id}, process.env.Jwt_Secret)

        return res.status(200).json({ success: true, message: 'Login Success', user: { userKaName: user.name, id: user.id }, token })

    } catch (error) {
        return res.status(500).json({ success: false, message: 'login error' })
    }
}

export const Register = async (req, res) => {
    try {

        const { userKaName, userKaEmail, userKaPassword, userKaNumber } = req.body;
        // , userKaNumber

        console.log(req.body, "req.body")

        if (!userKaName || !userKaEmail || !userKaPassword || !userKaNumber) {
            return res.status(401).json({ success: 'false', message: 'all fields mandatory' })
        }

        // || !userKaNumber

        const hashPassword = await bcrypt.hash(userKaPassword, 10);
        console.log(hashPassword);

        const user = new UserModals({
            name: userKaName,
            email: userKaEmail,
            userPassword: hashPassword,
            userNumber: userKaNumber
        })

        await user.save();

        return res.status(200).json({ success: 'true', message: 'Registration Successfull' })

    } catch (error) {
        return res.status(500).json({ success: 'false', message: error })
    }
}

export const getCurrentUser = async (req, res) => {
    try {
        
        const {token} = req.body; 

        if(!token) return res.status(401).json({success:false, message: 'token not found'})

        const {id} = await jwt.verify(token, process.env.Jwt_Secret);

        if(!id){
            return res.status(401).json({success: false, message:'id required'})
        }

        const user = await UserModals.findById(id);

        if(!user) return res.status(401).json({success:false, message:'user not found'})

        return res.status(200).json({success: true, message:'User id Got success', user})

    } catch (error) {
        return res.status(500).json({success:false, message: error})
    }
}



// "userKaEmail": "xyz@gmail.com",
// "userKaPassword": "xyz123"

//   {
//     "userKaEmail": "xyz1@gmail.com",
//     "userKaPassword": "xyz1111"
//   }