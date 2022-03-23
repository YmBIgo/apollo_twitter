import React, {useState} from "react"
import {useQuery, useMutation} from "@apollo/client"
import {useNavigate, Link} from "react-router-dom"

import {CURRENT_USER} from "../../query/user_auth_queries"
import {CREATE_TWEET, GET_TWEETS} from "../../query/tweet_queries"

import {CurrentUserData, CurrentUserVars} from "../../type/user_auth"

import "../../css/tweet.css"

type Props = {}

const New: React.FC<Props> = () => {

	const [content, setContent] = useState<string>()

	const navigate = useNavigate()

	const ls_email = localStorage.getItem("email") || ""
	const ls_hash  = localStorage.getItem("hash") || ""

	const {loading: current_user_loading, error: current_user_error, data: current_user_data} = useQuery<CurrentUserData, CurrentUserVars>(CURRENT_USER, {
		variables: { email: ls_email, hash: ls_hash }
	})

	const [create_tweet] = useMutation(CREATE_TWEET, {
		refetchQueries: [{query: GET_TWEETS}]
	})

	const CreateTweet = () => {
		const createTweetData = create_tweet({variables: { content, email: ls_email, hash: ls_hash }})
		createTweetData.then((result) => {
			navigate("/")
		})
	}

	if (current_user_error) return <div>{current_user_error.message}</div>
	if (current_user_loading) return <div>loading...</div>

	return(
		<>
			{ ( current_user_data &&
				current_user_data.getCurrentUser &&
				current_user_data.getCurrentUser.email != null) ?
				<>
					<h1>Create Tweet</h1>
					<hr />
					<textarea className="form-control tweet-form"
						value={content} onChange={(e) => setContent(e.target.value)} />
					<br />
					<button className="btn btn-primary" onClick={() => CreateTweet()}>Send</button>
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

export default New