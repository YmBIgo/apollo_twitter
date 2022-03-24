import {ApolloServer, gql} from 'apollo-server-express' // UserInputError
import {GraphQLUpload,
		graphqlUploadExpress} from "graphql-upload"
import jwt from "jsonwebtoken"
import axios from "axios"
import express from "express"
import {Storage} from "@google-cloud/storage"

let users = []
let user_id = 1
let tweets = []
let tweet_id = 1

const SECRET_KEY = process.env.TUTORIAL_SECRET_KEY

const projectId = "storageapi-334003"
const keyFilename = "./auth/storageapi-334003-ae1dbe77d032.json"
const storage = new Storage({projectId, keyFilename})

const typeDefs = gql`
	type User {
		id: ID
		firstName: String
		lastName: String
		image_url: String
		email: String
		password: String
		created_at: Date
		updated_at: Date
	}

	type UserClient {
		id: ID
		firstName: String
		lastName: String
		image_url: String
		email: String
		created_at: Date
		updated_at: Date
	}

	type CreateUserOutput{
		id: Int
		hashed_password: String
		email: String
	}

	type Tweet {
		id: ID
		user_id: ID
		content: String
		created_at: Date
		updated_at: Date
	}

	type File {
		fileName: String
		fileUrl: String
	}

	type Query {
		getUser(id: Int): UserClient
		getEmailUser(email: String): UserClient
		getUsers: [UserClient]
		getCurrentUser(email: String, hash: String): UserClient
		getEmailUserServer(email: String): User
		getTweet(tweet_id: Int): Tweet
		getTweets(email: String, hash: String): [Tweet]
		getUserTweets(user_id: Int): [Tweet]
		isYourTweet(tweet_id: Int, email: String, hash: String): Boolean
	}

	type Mutation {
		createUser(email: String, password: String): CreateUserOutput
		updateUser(email: String, hash: String, firstName: String, lastName: String): UserClient
		uploadUserImage(email: String, hash: String, file: Upload): File
		signInUser(email: String, password: String): CreateUserOutput
		createTweet(email: String, hash: String, content: String): Tweet
		deleteTweet(email: String, hash: String, id: Int): Boolean
	}

	scalar Date
	scalar Upload
`

const resolvers = {

	Upload: GraphQLUpload,

	Query: {
		getUser: (root, args) => {
			const user = users.find((u) => u.id === args.id)
			if (!user) {
				// throw new UserInputError("user id not found")
				return null
			}
			return user
		},
		getEmailUser: (root, args) => {
			const user = users.find((u) => u.email === args.email)
			if (!user) {
				// throw new UserInputError("user id not found")
				return null
			}
			return user
		},
		getUsers: () => {
			return users
		},
		getCurrentUser: async (root, args) => {
			const email = args.email
			const hash  = args.hash
			const result = await request_email_user_server(email)
			let decoded;
			try {
				decoded = jwt.verify(hash, SECRET_KEY)
			} catch(error) {
				return {}
			}
			// result.then((r) => {
			const user_password_hash = result.data.data.getEmailUserServer.password
			if ( user_password_hash == decoded.password ) {
				return result.data.data.getEmailUserServer // Server でいいのか？
			} else {
				return {}
			}
			// })
		},
		getEmailUserServer: (root, args) => {
			const email = args.email
			const user = users.find((u) => u.email === email)
			if (!user) {
				// throw new UserInputError("user id not found")
				return null
			}
			return user
		},
		getTweet: (root, args) => {
			const tweet_id = args.tweet_id
			const tweet = tweets.find((t) => t.id == tweet_id)
			console.log(tweet_id, tweet)
			if (!tweet) {
				return null
			}
			return tweet
		},
		getTweets: () => {
			return tweets
		},
		getUserTweets: (root, args) => {
			const user_id = args.user_id
			const user_tweets = tweets.filter((t) => t.user_id == user_id)
			return user_tweets
		},
		isYourTweet: async (root, args) => {
			const tweet_id = args.tweet_id
			const email = args.email
			const hash = args.hash
			const user_result = await request_current_user(email, hash)
			if (!user_result) {
				return null
			}
			const tweet_result = await request_get_tweet(tweet_id)
			if (!tweet_result) {
				return null
			}
			if (tweet_result.data.data.getTweet.user_id == user_result.data.data.getCurrentUser.id) {
				return true
			} else {
				return false
			}
		}
	},
	Mutation: {
		createUser: async (root, args) => {
			const email = args.email
			const result = await request_email_user_server(email)
			if (result.data.data.getEmailUserServer != null && result.data.data.getEmailUserServer != undefined) {
				if (result.data.data.getEmailUserServer.email == email) {
					// throw new UserInputError("user already exists")
					return {id: 0, hashed_password: "", email: ""}
				}
			}
			const option = {
				expiresIn: "30d"
			}
			const hashed_password = jwt.sign({password: args.password}, SECRET_KEY, option)
			const user = {id: user_id, email: email, password: args.password}
			const user_output = {id: user_id, hashed_password, email }
			users = [...users, user]
			console.log(user_output)
			user_id ++
			return user_output
		},
		updateUser: async (root, args) => {
			const email = args.email
			const hash = args.hash
			const result = await request_current_user(email, hash)
			// result.then((r) => {
				// jwt.verify(args.password, SECRET_KEY, function(err, decoded){
			if (result.data.data.getCurrentUser == null || result.data.data.getCurrentUser == undefined) {
				return null 
			} else {
				let user = users.find((u) => u.email == email)
				const firstName = args.firstName
				const lastName = args.lastName
				console.log(firstName, lastName)
				user = Object.assign({}, user, {firstName, lastName})
				users = users.map((u) => u.email == email ? user : u)
				return user
			}
		},
		uploadUserImage : async (root, {file, email, hash}) => {
			const result = await request_current_user(email, hash)
			if (result.data.data.getCurrentUser == null || result.data.data.getCurrentUser == undefined) {
				return null 
			}
			const user = users.find((u) => u.email == email)
			const { createReadStream, filename, mimetype, encording } = await file
			const bucket = storage.bucket("apollo_twitter")
			const file_path = user.id + "/" + filename
			await createReadStream().pipe(bucket.file(file_path).createWriteStream({}))
			const fileUrl = "https://storage.googleapis.com/apollo_twitter/" + file_path
			const file_output = {fileName: filename, fileUrl}
			user.image_url = fileUrl
			users = users.map((u) => u.id == user.id ? user : u)
			return file_output
		},
		signInUser: async (root, args) => {
			const email = args.email
			const password = args.password
			const result = await request_email_user_server(email)
			const user = result.data.data.getEmailUserServer
			if (user == null || user == undefined) {
				return null
			}
			if (user.password != password) {
				return null
			}
			const option = {
				expiresIn: "30d"
			}
			const hashed_password = jwt.sign({password: password}, SECRET_KEY, option)
			const user_output = {id: user.id, hashed_password, email: user.email}
			console.log(user_output)
			return user_output
		},
		createTweet: async (root, args) => {
			const email = args.email
			const hash = args.hash
			const content = args.content
			const user_result = await request_current_user(email, hash)
			console.log(user_result.data.data.getCurrentUser)
			if (user_result.data.data.getCurrentUser == null || user_result.data.data.getCurrentUser == undefined) {
				return null 
			} else {
				const tweet = {
					id: tweet_id,
					user_id: user_result.data.data.getCurrentUser.id,
					content,
				}
				tweets = [...tweets, tweet]
				tweet_id ++
				return tweet
			}
		},
		deleteTweet: async (root, args) => {
			const tweet_id = args.id
			const email = args.email
			const hash = args.hash
			const user_result = await request_current_user(email, hash)
			if (!user_result) {
				return false
			}
			const tweet_result = await request_get_tweet(tweet_id)
			if (!tweet_result) {
				return false
			}
			if (tweet_result.data.data.user_id == user_result.data.data.id) {
				tweets = tweets.filter((t) => t.id != tweet_id)
				return true
			} else {
				return false
			}
		}
	}
}

const request_email_user_server = (email) => {
	const result = axios({
		url: "http://localhost:4000/graphql",
		method: "POST",
		data: {
			query: `
				query ($email: String) {
					getEmailUserServer (email: $email) {
						id
						email
						password
						firstName
						lastName
					}
				}`,
				variables: {email: email}
			}
	})
	return result
}

const request_current_user = (email, hash) => {
	const result = axios({
		url: "http://localhost:4000/graphql",
		method: "POST",
		data: {
			query: `
				query ($email: String, $hash: String) {
					getCurrentUser (email: $email, hash: $hash) {
						id
						email
						firstName
						lastName
					}
				}`,
			variables: {email, hash}
		}
	})
	return result
}

const request_get_tweet = (tweet_id) => {
	const result = axios({
		url: "http://localhost:4000/graphql",
		method: "POST",
		data: {
			query: `
				query ($tweet_id: Int) {
					getTweet(tweet_id: $tweet_id) {
						id
						content
						user_id
					}
				}`,
			variables: {tweet_id}
		}
	})
	return result
}

async function startServer() {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		uploads: {
	        maxFileSize: 10000000,
	        maxFiles: 20
	    },
	})
	await server.start()

	const app = express()
	app.use(graphqlUploadExpress())

	server.applyMiddleware({app})

	await new Promise(r => app.listen({ port: 4000 }, r));
	console.log("Server ready at http://localhost:4000")
}

startServer()
