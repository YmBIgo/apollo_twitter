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
	// await users.create({email: "IgYmb0218LP@gmail.com", password: "hogehoge"})
	// const user = await users.findOne({where: {email: "IgYmb0218LP@gmail.com"}})
	// console.log(user.dataValues)
	// const user_accounts = await users.findAll()
	// console.log(user_accounts)
	// const tweet = await tweets.create({user_id: 1, content: "hoge"})
	console.log("done!")
})();