import React, {useState, useEffect} from "react"
import {useQuery} from "@apollo/react-hooks"
import {Link} from "react-router-dom"

import {GET_USER} from "../../query/user_queries"
import {GetUserData, UserVars} from "../../type/user"

import "../../css/user.css"

type Props = {
	id: number
	user_id: number
	content: string
}

const TweetComponent: React.FC<Props> = ({id, user_id, content}) => {

	const [userImage, setUserImage] = useState<string>("")

	const {data: user_data, loading: user_loading, error: user_error} = useQuery<GetUserData, UserVars>(GET_USER, {
		variables: {id: Number(user_id)}
	})

	useEffect(() => {
		if (user_data && user_data.getUser && user_data.getUser.image_url) {
			setUserImage(user_data.getUser.image_url)
		}
	}, [user_data])

	if (user_loading) return <div>loading</div>
	if (user_error) return <div>{user_error.message}</div>

	return(
		<div className="tweet_area">
			<div className="row">
				<div className="col-4">
					<img src={userImage} 
						className="user_image_small"
					/>
					<Link to={"/users/" + user_data!.getUser.id}>
						{user_data!.getUser.email}
					</Link>
				</div>
				<div className="col-8">
					<Link to={"/tweets/" + id}>
						{content}
					</Link>
				</div>
			</div>
		</div>
	)
}

export default TweetComponent;