import UserModals from "../Modals/User.Modals.js";
import bcrypt from 'bcrypt';

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

        return res.status(200).json({ success: true, message: 'Login Success' })

    } catch (error) {
        return res.status(500).json({ success: false, message: 'login error' })
    }
    // try{
    //     const {email, password} = req.body;
    //     if(!email || !password)res.status(401).json({success:false, message: error})

    //     const user  = await UserModals.find({email: email})
    //     console.log(user, "user")
    //     return res.send(true)
    // } 
    // catch(error){
    //     return res.status(500).json({success:false, message: error})
    // }
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
        return res.status(500).json({ success: 'false', message: 'error' })
    }
}

// export const getCurrentUser = (req, res) => {
//     res.send("HII")
// }



  // "userKaEmail": "xyz@gmail.com",
  // "userKaPassword": "xyz123"

//   {
//     "userKaEmail": "xyz1@gmail.com",
//     "userKaPassword": "xyz1111"
//   }