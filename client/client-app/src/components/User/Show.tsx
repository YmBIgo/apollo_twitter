import React, {useState, useEffect} from "react"
import {useQuery} from "@apollo/react-hooks"
import {useParams} from "react-router-dom"

import TweetComponent from "../Tweets/TweetComponent"

import {GET_USER} from "../../query/user_queries"
import {GET_USER_TWEETS} from "../../query/tweet_queries"

import {GetUserData, UserVars} from "../../type/user"
import {GetUserTweetsData, UserTweetVars} from "../../type/tweet"

import "../../css/user.css"

type Props = {

}

const Show: React.FC<Props> = () => {

	const {user_id} = useParams<{user_id: string}>()
	const [userImage, setUserImage] = useState<string>("")

	const {data: user_data, loading: user_loading, error: user_error} = useQuery<GetUserData, UserVars>(GET_USER, {
		variables: {id: Number(user_id)}
	})

	const {data: tweet_data, loading: tweet_loading, error: tweet_error} = useQuery<GetUserTweetsData, UserTweetVars>(GET_USER_TWEETS, {
		variables: {user_id: Number(user_id)}
	})

	useEffect(() => {
		if (user_data && user_data.getUser) {
			setUserImage(user_data.getUser.image_url)
		}
	}, [user_data])

	if (user_loading) return <div>loading...</div>
	if (user_error) return <div>user error : {user_error.message}</div>

	if (tweet_error) return <div>tweet error : {tweet_error.message}</div>

	return(
		<>
			<div className="row">
				<div className="col-1">
					<img src={userImage} className="user_image_small"
						style={{margin: "30px 0"}}
					/>
				</div>
				<div className="col-11">
					<h1>
						{ (user_data && user_data.getUser) &&
							<>
								ID: {user_data!.getUser.id}
								{user_data!.getUser.firstName} {user_data!.getUser.lastName}
								<br />
								{user_data!.getUser.email}
							</>
						}
					</h1>
				</div>
			</div>
			<hr />
			<div className="tweet_timeline">
				{ tweet_data &&
					tweet_data.getUserTweets &&
					tweet_data!.getUserTweets.map((tweet, idx) => {
					return(
						<TweetComponent id={tweet.id} user_id={tweet.user_id} content={tweet.content} key={idx} />
					)
					})
				}
			</div>
		</>
	)
}

export default Show