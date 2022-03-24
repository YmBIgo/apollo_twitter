import React, {useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import {useQuery, useLazyQuery, useMutation} from "@apollo/client"
import axios from "axios"

import {CURRENT_USER} from "../../query/user_auth_queries"
import {GET_USER, UPDATE_USER, UPLOAD_USER_IMAGE} from "../../query/user_queries"

import {CurrentUserData, CurrentUserVars} from "../../type/user_auth"
import {UpdateUserData, UpdateUserVars,
		UploadUserImageData, UploadUserImageVars} from "../../type/user"

import "../../css/user.css"

type Props = {}

const Edit: React.FC<Props> = () => {

	const ls_email = localStorage.getItem("email") || ""
	const ls_hash  = localStorage.getItem("hash") || ""

	const [userDataFirstName, setUserDataFirstName] = useState<string>("")
	const [userDataLastName, setUserDataLastName] = useState<string>("")
	const [userDataImage, setUserDataImage] = useState<string>("")

	const navigate = useNavigate()

	const {data: current_user_data, error: current_user_error, loading: current_user_loading} = useQuery<CurrentUserData, CurrentUserVars>(CURRENT_USER, {
		variables: {email: ls_email, hash: ls_hash}
	})

	const [fetch_user_data, {data: user_data, error: user_error, loading: user_loading}] = useLazyQuery(GET_USER)

	const [update_user] = useMutation<UpdateUserData, UpdateUserVars>(UPDATE_USER, {
		refetchQueries: [{query: GET_USER}]
	})
	const [upload_user_image, {data: upload_image_data, loading: upload_image_loading, error: upload_image_error}] = useMutation(UPLOAD_USER_IMAGE,{
		onCompleted: (data) => console.log(data)
	}) // <UploadUserImageData, UploadUserImageVars>

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
			setUserDataImage(user_data.getUser.image_url)
		}
	}, [user_data])

	const OnClickUpdateUserBtn = () => {
		const updateUserMutation = update_user({variables: {firstName: userDataFirstName, lastName: userDataLastName, email: ls_email, hash: ls_hash}})
		updateUserMutation.then((result) => {
			navigate("/")
		})
	}

	// const onClickUploadImage = () => {
	// 	const file_input = document.getElementsByClassName("file-upload-form")[0] as HTMLInputElement
	// 	if (!file_input || !file_input.files) {
	// 		return
	// 	}
	// 	const user_file = file_input.files[0]
	// 	upload_user_image({variables: {email: ls_email, hash: ls_hash, file: user_file}})
	// }

	const onChangeUploadImage = (event: any) => {
		if (!event.target.files) {
			return
		}
		const file_input = event.target.files[0]
		const uploadUserImage = upload_user_image({variables: {email: ls_email, hash: ls_hash, file: file_input}})
		// console.log(upload_image_data)
		uploadUserImage.then((result) => {
			console.log(result)
			if (result && result.data &&
				result.data.uploadUserImage) {
				setUserDataImage(result.data.uploadUserImage.fileUrl)
			}
		})
	}

	if (current_user_error) return <div>{current_user_error.message}</div>
	if (current_user_loading || user_loading) return <div>loading</div>
	if (user_error) return <div>{user_error.message}</div>
	if (upload_image_error) return <div>{upload_image_error.message}</div>

	return(
		<>
			{ (current_user_data &&
				current_user_data.getCurrentUser &&
				current_user_data.getCurrentUser.email) ?
				<>
					<h1>Edit User</h1>
					<hr />
					<label>File</label>
					<br />
					<img src={userDataImage} className="user_image"/>
					<input type="file" className="form-control file-upload-form user_input"
						onChange={(e) => onChangeUploadImage(e)}
					/>
					<br />
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