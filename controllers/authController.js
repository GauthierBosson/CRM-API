const {
    promisify
} = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Client = require('../models/clientModel');
const Company = require('../models/companyModel');
const AppError = require('../utils/appError');
const { signUpMail } = require('../utils/sendEmail');
const generator = require('generate-password');


const createToken = (id, role) => {
    return jwt.sign({
        id,
        role
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

exports.login = Model => async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body;

        // 1) check if email and password exist
        if (!email || !password) {
            return next(new AppError(404, 'fail', 'Please provide email or password'), req, res, next);
        }

        // 2) check if user exist and password is correct
        const user = await Model.findOne({
            email
        }).select('+password');

        if (!user || !await user.correctPassword(password, user.password)) {
            return next(new AppError(401, 'fail', 'Email or Password is wrong'), req, res, next);
        }

        // 3) All correct, send jwt to client
        const token = createToken(user.id, user.role);

        // Remove the password from the output 
        user.password = undefined;

        res.status(200).json({
            status: 'success',
            token,
            data: {
                user
            }
        });

    } catch (err) {
        next(err);
    }
};

exports.signup = async (req, res, next) => {
    req.body.password = generator.generate({
        length: 16,
        uppercase: true,
        numbers: true
    });

    try {
        const user = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            role: req.body.role,
        });

        await signUpMail(user.email, req.body.password)

        res.status(201).json({
            data: {
                user
            }
        });

    } catch (err) {
        next(err);
    }

};

exports.signupClient = async (req, res, next) => {
    req.body.password = generator.generate({
        length: 16,
        uppercase: true,
        numbers: true
    });

    req.body.role = 'client';
    
    try {
        const idCompany = await Company.findOne({ name: req.body.company })
        if (!idCompany) {
            const newCompany = await Company.create({ name: req.body.company })
            req.body.company = newCompany._id;
        } else {
            req.body.company = idCompany;
        }
        
        const client = await Client.create(req.body);

        await signUpMail(client.email, req.body.password);

        res.status(201).json({
            status: 'success',
            data: {
                client
            }
        });
    } catch(error) {
        next(error)
    }
}

exports.protect = async (req, res, next) => {
    try {
        // 1) check if the token is there
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return next(new AppError(401, 'fail', 'Veuillez vous connecter pour continuer'), req, res, next);
        }


        // 2) Verify token 
        const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        // 3) check if the user is exist (not deleted)
        const user = await User.findById(decode.id);
        if (!user) {
            return next(new AppError(401, 'fail', 'This user is no longer exist'), req, res, next);
        }

        req.user = user;
        next();

    } catch (err) {
        next(err);
    }
};

// Authorization check if the user have rights to do this action
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError(403, 'fail', 'Vous n\'êtes pas autorisé à effectuer cette action'), req, res, next);
        }
        next();
    };
};