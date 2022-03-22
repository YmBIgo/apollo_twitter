import React, {useState} from "react"
import {useQuery} from "@apollo/react-hooks"
import {useNavigate} from "react-router-dom"

import TweetComponent from "./TweetComponent"

import {CURRENT_USER} from "../../query/user_auth_queries"
import {GET_TWEETS} from "../../query/tweet_queries"

import {GetTweetsData, TweetVars} from "../../type/tweet"

type Props = {}

const Index: React.FC<Props> = () => {

	const ls_email = localStorage.getItem("email") || ""
	const ls_hash  = localStorage.getItem("hash") || ""

	const navigate = useNavigate()

	const [email, setEmail] = useState<string>()

	const {loading: current_user_loading, error: current_user_error, data: current_user_data} = useQuery(CURRENT_USER, {
		variables: { email: ls_email, hash: ls_hash }
	})

	const {loading: tweets_loading, error: tweets_error, data: tweets_data} = useQuery<GetTweetsData, TweetVars>(GET_TWEETS)

	if (current_user_error) return <div>{current_user_error.message}</div>
	if (current_user_loading) return <div>loading...</div>
	if (current_user_data.getCurrentUser.email == null) navigate("/users/sign_in")

	return (
		<>
			<h1>Tweet Index</h1>
			<p>Hello {current_user_data.getCurrentUser.email} </p>
			<div className="tweet_timeline">
				{tweets_data!.getTweets.map((tweet, idx) => {
					return(
						<TweetComponent id={tweet.id} user_id={tweet.user_id} content={tweet.content} key={idx} />
					)
				})}
			</div>
		</>
	)
}

export default Index