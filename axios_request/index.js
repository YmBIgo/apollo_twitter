import axios from "axios"

// [ Create User API ]

// const create_user_request = axios({
// 	url: "http://localhost:4000/graphql",
// 	method: "POST",
// 	data: {
// 		query:
// 		`mutation createUser($email: String!, $password: String!) {
// 			createUser(email: $email, password: $password) {
// 				id
// 				hashed_password
// 				email
// 			}
// 		}`,
// 		variables:
// 		{
// 			email: "IgYmb0218LP@gmail.com",
// 			password: "hogehoge"
// 		}
// 	}
// })

// create_user_request.then((result) => {
// 	console.log(result.data.data.createUser)
// })

// [ Get Users API ]

// const get_users_request = axios({
// 	url: "http://localhost:4000/graphql",
// 	method: "POST",
// 	data: {
// 		query:
// 		`query {
// 			getUsers {
// 				id
// 			}
// 		}`
// 	}
// })

// get_users_request.then((result) => {
// 	console.log(result.data.data.getUsers)
// })

// [ Get Email User API ]

// const get_email_user_request = axios({
// 	url: "http://localhost:4000/graphql",
// 	method: "POST",
// 	data: {
// 		query:
// 		`query($email: String!) {
// 			getEmailUser(email: $email) {
// 				id
// 				email
// 			}
// 		}`,
// 		variables: {email: "IgYmb0218LP@gmail.com"}
// 	}
// })

// get_email_user_request.then((result) => {
// 	console.log(result.data.data)
// })

// [ Get ID User API ]

// const get_id_user_request = axios({
// 	url: "http://localhost:4000/graphql",
// 	method: "POST",
// 	data: {
// 		query:
// 		`query($id: Int) {
// 			getUser(id: $id) {
// 				id
// 				firstName
// 			}
// 		}`,
// 		variables: {id: 1}
// 	}
// })

// get_id_user_request.then((result) => {
// 	console.log(result.data.data.getUser)
// })

// [ Get Current User API ]

// const get_current_user_request = axios({
// 	url: "http://localhost:4000/graphql",
// 	method: "POST",
// 	data: {
// 		query:
// 		`query ($email: String, $hash: String) {
// 			getCurrentUser(email: $email, hash: $hash) {
// 				id
// 				email
// 				firstName
// 				lastName
// 			}
// 		}`,
// 		variables: {
// 			email: "IgYmb0218LP@gmail.com",
// 			hash: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImhvZ2Vob2dlIiwiaWF0IjoxNjQ3MzUzNTcyLCJleHAiOjE2NDk5NDU1NzJ9.H-BznT-f3pjH3z8RskfvWS4SABrgv3TJNeBmP0Vxb8M"
// 		}
// 	}
// })

// get_current_user_request.then((result) => {
// 	console.log(result.data)
// })

// [Get Email User Server API]

// const get_email_user_server_request = axios({
// 	url: "http://localhost:4000/graphql",
// 	method: "POST",
// 	data: {
// 		query: `
// 			query ($email: String) {
// 				getEmailUserServer (email: $email) {
// 					id
// 					email
// 					password
// 				}
// 			}`,
// 		variables: {email: "IgYmb0218LP@gmail.com"}
// 	}
// })

// get_email_user_server_request.then((result) => {
// 	console.log(result.data.data)
// })

// [ Update Current User API ]

// const update_current_user_request = axios({
// 	url: "http://localhost:4000/graphql",
// 	method: "POST",
// 	data: {
// 		query: `
// 			mutation ($email: String, $hash: String, $firstName: String, $lastName: String) {
// 				updateUser(email: $email, hash: $hash, firstName: $firstName, lastName: $lastName){
// 					id
// 					firstName
// 					lastName
// 					email
// 				}
// 			}
// 		`,
// 		variables: {
// 			email: "IgYmb0218LP@gmail.com",
// 			hash: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImhvZ2Vob2dlIiwiaWF0IjoxNjQ3MzUzOTg5LCJleHAiOjE2NDk5NDU5ODl9.vCq15Qd40Ihzk9ezgEi-RXRF9hFGG94iP44NYLhhHug",
// 			firstName: "kazuya",
// 			lastName: "kurihara"
// 		}
// 	}
// })

// update_current_user_request.then((result) => {
// 	console.log(result.data.data)
// })

// [ Create Tweet API ]

// const create_tweet_request = axios({
// 	url: "http://localhost:4000/graphql",
// 	method: "POST",
// 	data: {
// 		query: `
// 			mutation ($email: String, $hash: String, $content: String) {
// 				createTweet(email: $email, hash: $hash, content: $content) {
// 					id
// 					content
// 					user_id
// 				}
// 			}
// 		`,
// 		variables: {
// 			email: "IgYmb0218LP@gmail.com",
// 			hash: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImhvZ2Vob2dlIiwiaWF0IjoxNjQ3MzYwMTE5LCJleHAiOjE2NDk5NTIxMTl9.gcGWL8ZDJCEBSw86NAw7Dt3waFlR8kBTz_2Lkw6jWD4",
// 			content: "hello world!"
// 		}
// 	}
// })

// create_tweet_request.then((result) => {
// 	console.log(result.data.data)
// })

// [ Get Tweet API ]

// const get_tweet_request = axios({
// 	url: "http://localhost:4000/graphql",
// 	method: "POST",
// 	data: {
// 		query: `
// 			query ($id: Int) {
// 				getTweet(id: $id) {
// 					id
// 					content
// 					user_id
// 				}
// 			}`,
// 		variables: {id: 1}
// 	}
// })

// get_tweet_request.then((result) => {
// 	console.log(result.data.data.getTweet)
// })

// [ Get Tweets API ]

// const get_tweets_request = axios({
// 	url: "http://localhost:4000/graphql",
// 	method: "POST",
// 	data: {
// 		query: `
// 			query {
// 				getTweets {
// 					id
// 					user_id
// 					content
// 				}
// 			}
// 		`
// 	}
// })

// get_tweets_request.then((result) => {
// 	console.log(result.data.data.getTweets)
// })

// [ is Your Tweet API ]

// const is_your_tweet_request = axios({
// 	url: "http://localhost:4000/graphql",
// 	method: "POST",
// 	data: {
// 		query: `
// 			query ($id: Int, $email: String, $hash: String) {
// 				isYourTweet (id: $id, email: $email, hash: $hash)
// 			}
// 		`,
// 		variables: {
// 			email: "IgYmb0218LP@gmail.com",
// 			hash: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImhvZ2Vob2dlIiwiaWF0IjoxNjQ3MzU5NzI2LCJleHAiOjE2NDk5NTE3MjZ9.cb5hL01d4GKIHaV59PE6fzC4MJ3INQgBh8gwng4F4JM",
// 			id: 1
// 		}
// 	}
// })

// is_your_tweet_request.then((result) => {
// 	console.log(result.data)
// })

// [ Delete Tweet API ]

// const delete_tweet_request = axios({
// 	url: "http://localhost:4000/graphql",
// 	method: "POST",
// 	data: {
// 		query: `
// 			mutation ($email: String, $hash: String, $id: Int) {
// 				deleteTweet(email: $email, hash: $hash, id: $id)
// 			}
// 		`,
// 		variables : {
// 			email: "IgYmb0218LP@gmail.com",
// 			hash: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImhvZ2Vob2dlIiwiaWF0IjoxNjQ3MzU5NzI2LCJleHAiOjE2NDk5NTE3MjZ9.cb5hL01d4GKIHaV59PE6fzC4MJ3INQgBh8gwng4F4JM",
// 			id: 1
// 		}
// 	}
// })

// delete_tweet_request.then((result) => {
// 	console.log(result.data)
// })
