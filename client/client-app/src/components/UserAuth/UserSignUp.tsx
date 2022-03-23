import React, {useState} from "react"
import {useQuery, useMutation} from "@apollo/react-hooks"
import {Link, useNavigate} from "react-router-dom"

import {CURRENT_USER, USER_SIGN_UP} from "../../query/user_auth_queries"

import {CurrentUserData, CurrentUserVars,
		SignUpUserData, UserSignInUpVar} from "../../type/user_auth"

import "../../css/user_auth.css"

type Props = {

}

const UserSignUp: React.FC<Props> = () => {

	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")

	const [user_sign_up] = useMutation<SignUpUserData, UserSignInUpVar>(USER_SIGN_UP)

	const navigate = useNavigate()

	const ls_email = localStorage.getItem("email") || ""
	const ls_hash  = localStorage.getItem("hash") || ""

	const {loading, error, data} = useQuery<CurrentUserData, CurrentUserVars>(CURRENT_USER, {
		variables: { email: ls_email, hash: ls_hash }
	})

	const userSignUp = () => {
		const userSignUpData = user_sign_up({variables: {email, password}})
		// localStorage.setItem("email", email)
		userSignUpData.then((result) => {
			// console.log(result!.data!.createUser)
			if (result && result.data &&
				result.data.createUser) {
				localStorage.setItem("email", result.data.createUser.email)
				localStorage.setItem("hash", result.data.createUser.hashed_password)
				setEmail("")
				setPassword("")
				navigate("/")
			}
		})
	}

	if (error) return <div>{error.message}</div>
	if (loading) return <div>loading...</div>
	if (data!.getCurrentUser.email != null) return( 
		<>
			<div>You are already sign In</div>
			<div>Go explore your next!</div>
		</>
	)

	return (
		<>
			<h1>User Sign Up</h1>
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
			<button className="btn btn-primary" onClick={userSignUp}>Send</button>
			<br />
			<Link to="/users/sign_in">Sign In</Link>
		</>
	)
}

export default UserSignUp