import React, {useState, useEffect} from "react"
import {useQuery, useLazyQuery} from "@apollo/react-hooks"
import {useParams, Link} from "react-router-dom"

import {GET_TWEET} from "../../query/tweet_queries"
import {GET_USER} from "../../query/user_queries"

import {} from "../../type/user"

type Props = {

}

const Show: React.FC<Props> = () => {

	const {tweet_id} = useParams<{tweet_id: string}>()
	const [userPath, setUserPath] = useState<string>("")

	const {data: tweet_data, loading: tweet_loading, error: tweet_error} = useQuery(GET_TWEET,{
		variables: {tweet_id: Number(tweet_id)},
		onCompleted: (data) => {
			setUserPath("/users/" + data.getTweet.user_id)
		}
	})

	const [getUserQuery, {data: user_data, loading: user_loading, error: user_error}] = useLazyQuery(GET_USER)

	useEffect(() => {
		if (tweet_data && tweet_data.getTweet) {
			getUserQuery({variables: {id: Number(tweet_data.getTweet.user_id)}})
		}
	}, [tweet_data])

	if (tweet_error) return <div>{tweet_error.message}</div>
	if (tweet_loading) return <div>loading...</div>
	// if (user_error) return <div>{user_error.message}</div>
	if (user_loading) return <div>loading</div>

	return(
		<>
			<p>
			Tweeted by {" "}
			<Link to={userPath}>
				{
				user_data &&
				user_data.getUser &&
					user_data.getUser.email
				}
				{
				user_error &&
					<div>{user_error}</div>
				}
			</Link>
			</p>
			<h3>{
				tweet_data &&
				tweet_data.getTweet &&
					tweet_data.getTweet.content
				}
			</h3>
		</>
	)
}

export default Show