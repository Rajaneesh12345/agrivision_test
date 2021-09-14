const { User } = require('../../../models');
const bcrypt = require('bcrypt');
const { randString, generateToken } = require('../../../utils');
const transporter = require('../../../config/nodemailer');

module.exports.registerUser = async (req, res) => {
    try {

        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({
                message: 'User already exists',
                success: false,
            });
        }

        let confirmationCode = randString();
        await transporter.sendMail({
            from: process.env.email,
            to: req.body.email,
            subject: 'Please confirm your Email',
            html: `<h1>Email Confirmation</h1>
                      <h2>Hello ${req.body.name[0]}  ${req.body.name[1]}</h2>
                      <br>
                      <h3>We welcome you as a part of our <b>AgriVision4U</b> family.</h3>
                      <p>Kindly click on the link below to confirm your e-mail address.</p>
                      <a href='${process.env.siteURI}/v1/user/confirmEmail/${confirmationCode}'><h3> Click here</h3></a>
                      <p style = "color : rbg(150, 148, 137)">Please do not reply to this e-mail. This address is automated and cannot help with questions or requests.</p>
                      <h4>If you have questions please write to info@agrivision4u.com. You may also call us at <a href="tel:7510545225">7510545225</a></h4>
                      </div>`,
        });

        let hash = await bcrypt.hash(req.body.password, 10);

        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            randString: confirmationCode
        });

        let token = generateToken(user);

        await user.save();

        res.status(200).json({
            message: 'Please verify your email to login',
            data: {
                user: user,
                token: token,
            },
            success: true,
        });
    } catch (err) {
        res.status(500).json({
            message: 'something went wrong',
            success: false,
        });
    }
};

module.exports.login = async function (req, res) {

    try {
        let user = await User.findOne({ email: req.body.email });

        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(400).json({
                message: 'invalid email or password',
                success: false,
            });

        }

        if (!user.isVerified) {
            return res.status(200).json({
                message: 'Please verify your email',
                success: false
            });
        }

        let token = generateToken(user);

        res.status(200).json({
            message: 'User logged in successfully',
            data: {
                user, token
            },
            success: true,
        });

    } catch (error) {
        res.status(500).json({
            message: 'something went wrong',
            success: false,
        });
    }
};

module.exports.googleOauth = async function (req, res) {
    const user = await User.findOne({ email: req.user.email });
    const token = generateToken(user);
    return res.status(200).send({ token, user });
};


module.exports.confirmEmail = async function (req, res) {

    const secret = req.params.secret;
    const user = await User.findOne({ randString: secret });
    try {
        if (user) {
            user.isVerified = true;
            user.randString = null;
            await user.save();
            let token = generateToken(user);

            return res.status(200).json({
                message: 'Email verified. Welcome to AgriVision4u',
                data: {
                    user: user,
                    token: token,
                    success: true
                }
            });

        } else {
            return res.status(400).json({
                message: 'Bad request',
                success: false
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: 'something went wrong',
            success: false,
        });
    }
};

module.exports.resetPassword = async function (req, res) {

    try {
        let user = await User.findOne({ randString: req.params.secret });
        if (!user) {
            return res.status(400).json({
                message: 'Bad Request',
                success: false
            });
        } else {
            const hash = await bcrypt.hash(req.body.password, 10);
            user.password = hash;
            await user.save();
            return res.status(200).json({
                message: 'Password updated.Please login using new password',
                success: true
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'something went wrong',
            success: false,
        });
    }


};


module.exports.forgotPassword = async function (req, res) {

    try {
        const email = (req.body.email);
        let user = await User.findOne({ email });
        const confirmationCode = randString();

        if (user) {

            user.randString = confirmationCode;
            await user.save();

            transporter.sendMail({
                from: process.env.email,
                to: req.body.email,
                subject: 'Reset Password',
                html: `<h1>Reset Password</h1>
                  <h2>Hello ${user.name}</h2>
                  <br>
                  <p>Kindly click on the link below to reset your password.</p>
                  <a href=${process.env.siteURI}/v1/user/resetPassword/${confirmationCode}> Click here</a>
                  <p style = "color : rbg(150, 148, 137)">Please do not reply to this e-mail. This address is automated and cannot help with questions or requests.</p>
                  <h4>If you have questions please write to info@agrivision4u.com. You may also call us at <a href="tel:7510545225">7510545225</a></h4>
              </div>`,
            });

            return res.send(200).json({
                message: 'Please check your mail to reset password',
                success: true
            });

        }
        else {
            return res.status(400).json({
                message: 'Email is not registered',
                success: true
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'something went wrong',
            success: false,
        });
    }
};