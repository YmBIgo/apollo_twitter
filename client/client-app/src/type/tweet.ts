export type Tweet = {
	id: number
	user_id: number
	content: string
}

export type GetTweetsData = {
	getTweets: Tweet[]
}

export type GetUserTweetsData = {
	getUserTweets: Tweet[]
}

export type TweetVars = {
	id: number;
	user_id: number;
	content: string;
}

export type UserTweetVars = {
	user_id: number
}