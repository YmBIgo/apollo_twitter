import {gql} from "@apollo/client"

export const GET_TWEET = gql`
	query ($tweet_id: Int) {
		getTweet(tweet_id: $tweet_id) {
			id
			content
			user_id
		}
	}
`

export const GET_TWEETS = gql`
	query {
		getTweets {
			id
			content
			user_id
		}
	}
`

export const GET_USER_TWEETS = gql`
	query ($user_id: Int) {
		getUserTweets (user_id: $user_id) {
			id
			user_id
			content
		}
	}
`

export const CREATE_TWEET = gql`
	mutation ($email: String, $hash: String, $content: String) {
		createTweet(email: $email, hash: $hash, content: $content) {
			id
			content
			user_id
		}
	}
`

export const IS_YOUR_TWEET = gql`
	query ($tweet_id: Int, $email: String, $hash: String) {
		IsYourTweet (tweet_id: $tweet_id, email: $email, hash: $hash)
	}
`
