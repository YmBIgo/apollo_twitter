import React from "react"
import {Link} from "react-router-dom"

type Props = {

}

const UserSignIn: React.FC<Props> = () => {
	return (
		<>
			<h1>User Sign In</h1>
			<br />
			<Link to="/users/sign_in">Sign In</Link>
        	<Link to="/users/sign_up">Sign Up</Link>
		</>
	)
}

export default UserSignIn