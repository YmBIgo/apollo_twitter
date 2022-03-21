import React from "react"
import {useQuery} from "@apollo/react-hooks"

import {GET_USER} from "../../query/user_queries"
import {GetUserData, UserVars} from "../../type/user"

type Props = {
	id: number
	user_id: number
	content: string
}

const TweetComponent: React.FC<Props> = ({user_id, content}) => {

	const {data: user_data, loading: user_loading, error: user_error} = useQuery<GetUserData, UserVars>(GET_USER, {
		variables: {id: Number(user_id)}
	})

	if (user_loading) return <div>loading</div>
	if (user_error) return <div>{user_error.message}</div>

	return(
		<div className="tweet_area">
			<div className="row">
				<div className="col-4">
					{user_data!.getUser.email}
				</div>
				<div className="col-8">
					{content}
				</div>
			</div>
		</div>
	)
}

export default TweetComponent;