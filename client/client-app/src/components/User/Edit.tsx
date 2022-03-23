import React, {useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import {useQuery, useLazyQuery, useMutation} from "@apollo/client"

import {CURRENT_USER} from "../../query/user_auth_queries"
import {GET_USER, UPDATE_USER} from "../../query/user_queries"

import {CurrentUserData, CurrentUserVars} from "../../type/user_auth"
import {UpdateUserData, UpdateUserVars} from "../../type/user"

import "../../css/user.css"

type Props = {}

const Edit: React.FC<Props> = () => {

	const ls_email = localStorage.getItem("email") || ""
	const ls_hash  = localStorage.getItem("hash") || ""

	const [userDataFirstName, setUserDataFirstName] = useState<string>("")
	const [userDataLastName, setUserDataLastName] = useState<string>("")

	const navigate = useNavigate()

	const {data: current_user_data, error: current_user_error, loading: current_user_loading} = useQuery<CurrentUserData, CurrentUserVars>(CURRENT_USER, {
		variables: {email: ls_email, hash: ls_hash}
	})

	const [fetch_user_data, {data: user_data, error: user_error, loading: user_loading}] = useLazyQuery(GET_USER)

	const [update_user] = useMutation<UpdateUserData, UpdateUserVars>(UPDATE_USER, {
		refetchQueries: [{query: GET_USER}]
	})

	useEffect(() => {
		if (current_user_data &&
			current_user_data.getCurrentUser &&
			current_user_data.getCurrentUser.id) {
			fetch_user_data({variables: {id: Number(current_user_data.getCurrentUser.id)}})
		}
	}, [current_user_data])

	useEffect(() => {
		if (user_data &&
			user_data.getUser) {
			setUserDataFirstName(user_data.getUser.firstName)
			setUserDataLastName(user_data.getUser.lastName)
		}
	}, [user_data])

	const OnClickUpdateUserBtn = () => {
		const updateUserMutation = update_user({variables: {firstName: userDataFirstName, lastName: userDataLastName, email: ls_email, hash: ls_hash}})
		updateUserMutation.then((result) => {
			navigate("/")
		})
	}

	if (current_user_error) return <div>{current_user_error.message}</div>
	if (current_user_loading || user_loading) return <div>loading</div>
	if (user_error) return <div>{user_error.message}</div>

	return(
		<>
			{ (current_user_data &&
				current_user_data.getCurrentUser &&
				current_user_data.getCurrentUser.email) ?
				<>
					<h1>Edit User</h1>
					<hr />
					<label>First Name</label>
					<input type="text" className="form-control user_input"
						value={userDataFirstName} onChange={(e) => setUserDataFirstName(e.target.value)}
					/>
					<label>Last Name</label>
					<input type="text" className="form-control user_input"
						value={userDataLastName} onChange={(e) => setUserDataLastName(e.target.value)}
					/>
					<br />
					<button className="btn btn-primary" onClick={() => OnClickUpdateUserBtn()}>Send</button>
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

export default Edit