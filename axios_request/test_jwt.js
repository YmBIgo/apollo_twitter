import jwt from "jsonwebtoken"

const SECRET_KEY = process.env.TUTORIAL_SECRET_KEY

const option = {
	expiresIn: "1m"
}
const token = jwt.sign({user: "hogehoge"}, SECRET_KEY, option)
console.log(token)

jwt.verify(token, SECRET_KEY, function(err, decoded) {
	if (err) {
		console.log(err)
	} else {
		console.log(decoded)
	}
})