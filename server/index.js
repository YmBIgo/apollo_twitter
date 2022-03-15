import {ApolloServer, gql, UserInputError} from "apollo-server"
import jwt from "jsonwebtoken"
import axios from "axios"

let users = []
let user_id = 1
let tweets = []
let tweet_id = 1

const SECRET_KEY = process.env.TUTORIAL_SECRET_KEY

const typeDefs = gql`
	type User {
		id: ID
		firstName: String
		lastName: String
		email: String
		password: String
		created_at: Date
		updated_at: Date
	}

	type UserClient {
		id: ID
		firstName: String
		lastName: String
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

	type Query {
		getUser(id: Int): UserClient
		getEmailUser(email: String): UserClient
		getUsers: [UserClient]
		getCurrentUser(email: String, hash: String): UserClient
		getEmailUserServer(email: String): User
		getTweet(id: Int): Tweet
		getTweets(email: String, hash: String): [Tweet]
		isYourTweet(id: Int, email: String, hash: String): Boolean
	}

	type Mutation {
		createUser(email: String, password: String): CreateUserOutput
		updateUser(email: String, hash: String, firstName: String, lastName: String): UserClient
		createTweet(email: String, hash: String, content: String): Tweet
		deleteTweet(email: String, hash: String, id: Int): Boolean
	}

	scalar Date
`

const resolvers = {
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
			const decoded = jwt.verify(hash, SECRET_KEY)
			// result.then((r) => {
			const user_password_hash = result.data.data.getEmailUserServer.password
			if ( user_password_hash == decoded.password ) {
				return result.data.data.getEmailUserServer
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
			const tweet_id = args.id
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
		isYourTweet: async (root, args) => {
			const tweet_id = args.id
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
			if (tweet_result.data.data.getTweet.id == user_result.data.data.getCurrentUser.id) {
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
				// })
			// })
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

const request_get_tweet = (id) => {
	const result = axios({
		url: "http://localhost:4000/graphql",
		method: "POST",
		data: {
			query: `
				query ($id: Int) {
					getTweet(id: $id) {
						id
						content
						user_id
					}
				}`,
			variables: {id}
		}
	})
	return result
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

server.listen().then(({url}) => {
	console.log(`Server ready at ${url}`)
})