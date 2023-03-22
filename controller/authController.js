const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

let refreshTokens = [];
const authController = {
	//REGISTER
	registerUser: async (req, res) => {
		try {
			console.log('1');
			const salt = await bcrypt.genSalt(10);
			console.log('1.5');
			const hashed = await bcrypt.hash(req.body.password, salt);
			console.log('2');
			//Create  new user
			const newUser = await new User({
				username: req.body.username,
				email: req.body.email,
				password: hashed,
			});
			console.log('3');
			//save to DB
			const user = await newUser.save();
			console.log(user);
			return res.status(200).json(user);
		}
		catch (err) {
			return res.status(500).json("abc");
		}
	},
	generateAccessToken: (user) => {
		return jwt.sign({
			id: user.id,
			admin: user.admin
		},
			process.env.JWT_ACCESS_KEY,
			{
				expiresIn: "1d"
			}
		);
	},
	generateRefreshToken: (user) => {
		return jwt.sign({
			id: user.id,
			admin: user.admin
		},
			process.env.JWT_REFRESH_KEY,
			{
				expiresIn: "365d"
			}
		);
	},
	requestRefreshToken: async (req, res) => {

		const refreshToken = req.cookies.refreshToken;
		if (!refreshToken) { return res.status(401).json('You are authenticated') }
		if (!refreshTokens.includes(refreshToken)) {
			return res.status(403).json("Refresh token is not valid")
		}
		jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
			if (err) {
				console.log(err)
			}
			
				refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
				const newAccessToken = authController.generateAccessToken(user);
				const newRefreshToken = authController.generateRefreshToken(user);
				refreshTokens.push(newRefreshToken);
				res.cookie("refreshToken", newRefreshToken, {
					httOnly: true,
					secure: false,
					path: "/",
					sameSite: "strict",
				})
				return res.status(200).json({ accessToken: newAccessToken });
		})
	},
	userLogout: async (req, res) => {
		res.clearCookie('refreshToken');
		refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken)
		return res.status(200).json('Logged out successfuly');
	},

	loginUser: async (req, res) => {
		try {
			const user = await User.findOne({ username: req.body.username });
			if (!user) {
				return res.status(404).json("Wrong username")
			}
			const validPassword = await bcrypt.compare(
				req.body.password,
				user.password
			)
			if (!validPassword) {
				return res.status(404).json("Wrong password")
			}
			if (user && validPassword) {
				const accessToken = authController.generateAccessToken(user);
				
				const refreshToken = authController.generateRefreshToken(user);
				refreshTokens.push(refreshToken);
				res.cookie("refreshToken", refreshToken, {
					httOnly: true,
					secure: false,
					path: "/",
					sameSite:"strict",
				})
				const { password, ...orthers } = user._doc
				return res.status(200).json({ ...orthers, accessToken });
			}
			
		}
		catch (err) {
			return res.status(500).json("abc");
		}
	}
};
module.exports = authController