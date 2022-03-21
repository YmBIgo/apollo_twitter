export type Tweet = {
	id: number
	user_id: number
	content: string
}

export type GetTweetsData = {
	getTweets: Tweet[]
}

export type TweetVars = {
	id: number;
	user_id: number;
	content: string;
}