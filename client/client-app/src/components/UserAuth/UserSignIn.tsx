import React, {useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import {useMutation, useQuery} from "@apollo/client"

import {CurrentUserData, CurrentUserVars,
		SignInUserData, UserSignInUpVar} from "../../type/user_auth"

import {USER_SIGN_IN, CURRENT_USER} from "../../query/user_auth_queries"

import "../../css/user_auth.css"

type Props = {

}

const UserSignIn: React.FC<Props> = () => {

	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")

	const navigate = useNavigate()

	const ls_email = localStorage.getItem("email") || ""
	const ls_hash  = localStorage.getItem("hash") || ""

	const {data: current_user_data, loading: current_user_loading, error: current_user_error} = useQuery<CurrentUserData, CurrentUserVars>(CURRENT_USER, {
		variables: { email: ls_email, hash: ls_hash }
	})

	const [user_sign_in] = useMutation<SignInUserData, UserSignInUpVar>(USER_SIGN_IN, {
		onCompleted: (data) => {
			console.log(data.signInUser)
			if (data && data.signInUser != null) {
				localStorage.setItem("email", data.signInUser.email)
				localStorage.setItem("hash", data.signInUser.hashed_password)
			}
		}
	})

	const userSignIn = () => {
		const userSignInData = user_sign_in({variables: {email, password}})
		userSignInData.then((result) => {
			console.log(result)
			if (result!.data!.signInUser != null) {
				setEmail("")
				setPassword("")
				navigate("/")
			}
		})
	}

	if (current_user_loading) return <div>loading</div>
	if (current_user_error) return <div>error</div>

	return (
		<>
			{ 	(current_user_data &&
				current_user_data.getCurrentUser &&
				!current_user_data.getCurrentUser.email) ?
				<>
					<h1>User Sign In</h1>
					<label>Email</label>
					<br />
					<input type="text" name="email" className="form-control user_auth_input"
						   value={email} onChange={(e) => setEmail(e.target.value)} />
					<br />
					<label>Password</label>
					<br />
					<input type="password" name="password" className="form-control user_auth_input"
						   value={password} onChange={(e) => setPassword(e.target.value)} />
					<br />
					<button className="btn btn-primary" onClick={userSignIn}>Send</button>
					<br />
					<Link to="/users/sign_up">Sign Up</Link>
	        	</>
	        :
	        	<>
	        		<div>You are already sign In</div>
					<div>Go explore your next!</div>
	        	</>
        	}
		</>
	)
}

export default UserSignIn