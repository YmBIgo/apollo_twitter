import React, {useState} from "react"
import {useQuery} from "@apollo/react-hooks"
import {useNavigate, Link} from "react-router-dom"

import TweetComponent from "./TweetComponent"

import {CURRENT_USER} from "../../query/user_auth_queries"
import {GET_TWEETS} from "../../query/tweet_queries"

import {CurrentUserData, CurrentUserVars} from "../../type/user_auth"
import {GetTweetsData, TweetVars} from "../../type/tweet"

type Props = {}

const Index: React.FC<Props> = () => {

	const ls_email = localStorage.getItem("email") || ""
	const ls_hash  = localStorage.getItem("hash") || ""

	const navigate = useNavigate()

	const [email, setEmail] = useState<string>()

	const {loading: current_user_loading, error: current_user_error, data: current_user_data} = useQuery<CurrentUserData, CurrentUserVars>(CURRENT_USER, {
		variables: { email: ls_email, hash: ls_hash }
	})

	const {loading: tweets_loading, error: tweets_error, data: tweets_data} = useQuery<GetTweetsData, TweetVars>(GET_TWEETS)

	if (current_user_error) return <div>{current_user_error.message}</div>
	if (current_user_loading) return <div>loading...</div>

	return (
		<>
			{ (current_user_data &&
				current_user_data.getCurrentUser &&
				current_user_data.getCurrentUser.email) ?
				<>
					<h1>Tweet Index</h1>
					<p>Hello {current_user_data.getCurrentUser.email} </p>
					<hr />
					<div className="tweet_timeline">
						{ tweets_data &&
							tweets_data!.getTweets &&
							tweets_data!.getTweets.map((tweet, idx) => {
								return(
									<TweetComponent id={tweet.id} user_id={tweet.user_id} content={tweet.content} key={idx} />
								)
							})
						}
					</div>
					<br />
					<Link to="/tweets/new">ツイートを作成する</Link>
					<br />
					<Link to="/users/edit">ユーザーを編集する</Link>
				</>
			:
				<>
					You should sign in.
					<br />
					<Link to="/users/sign_in">Sign In Page</Link>
				</>
			}
		</>
	)
}

export default Index