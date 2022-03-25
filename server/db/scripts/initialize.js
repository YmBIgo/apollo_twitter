import {getDB} from "../index.js"
import {User} from "../models/User.js"
import {Tweet} from "../models/Tweet.js"

(async() => {
	const db = await getDB();
	const users = db.users
	const tweets = db.tweets
	await users.sync()
	await tweets.sync()
	// await users.findOrCreate({where: {email: "IgYmb0218LP@gmail.com", password: "hogehoge"}})
	await users.create({email: "IgYmb0218LP@gmail.com", password: "hogehoge"})
	console.log("done!")
})();