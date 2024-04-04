const User = require("../models/userModel");
const authMiddleware = require("../middleware/authMiddleware");

const Register = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (password !== req.body.confirmPassword) {
            return res.status(400).send("Password and confirm password do not match.");
        }

        let existingEmailUser = await User.findOne({ email });
        if (existingEmailUser) {
            return res.status(409).send("A user with that email has already been registered!");
        }

        let passwordDigest = await authMiddleware.hashPassword(password);
        const userData = await User.create({
            name,
            email,
            password: passwordDigest,
            confirmPassword: passwordDigest,
            role: 'user',
        });
        res.status(201).send('user created successfully');
    } catch (error) {
        console.error("Registration error: ", error);
        res.status(500).send('Internal Server Error');
    }
};


const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send('Invalid data');
        }
        const user = await User.findOne({ email });
        if (user) {
            let passwordMatched = await authMiddleware.comparePassword(
                user.password,
                password
            );
            if (passwordMatched) {
                let payload = {
                    id: user.id,
                    role: user.role,
                };
                let token = authMiddleware.createToken(payload);
                return res.status(200).json({ token });
            }
        }
        res.status(401).send('Invalid Credentials!');
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
};

const GetUsers = async (req, res) => {
    try {
        const users = await User.find({});

        // Sort the users array by step counts in descending order
        users.sort((a, b) => b.stepCount - a.stepCount);

        res.status(200).json({ users });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}


const stepCount = async (req, res) => {
    try {
        const userId = res.locals.payload.id;
        const user = await User.findById(userId);
        user.stepCount += req.body.stepsCount;
        console.log('Updated Steps: ', user.stepCount);
        if (!user) {
            return res.status(404).send("User not found");
        }
        user.lastUpdateDate = new Date();
        await user.save();
        res.status(200).send("Step count updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to update step count. Please try again later.");
    }
}

const shouldAllowInput = async (req, res) => {
    try {
        const userId = res.locals.payload.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        if(!user.lastUpdateDate) {
            return res.status(200).json({ allow: true });
        }
        console.log('User Updated At: ', user.lastUpdateDate.setHours(0, 0, 0, 0));
        console.log('Current Date: ', new Date());
        res.status(200).json({ allow: user.lastUpdateDate.setHours(0, 0, 0, 0) !== new Date().setHours(0, 0, 0, 0) ? true : false });
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to check if user should allow input. Please try again later.");
    }
}

const resetSteps = async (req, res) => {
    try {
        await User.updateMany({}, { $set: { stepCount: 0 } });
        res.status(200).send("Step count reset successfully for all users");
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to reset step count for all users. Please try again later.");
    }
}

module.exports = {
    Login,
    Register,
    GetUsers,
    stepCount,
    shouldAllowInput,
    resetSteps,
};
