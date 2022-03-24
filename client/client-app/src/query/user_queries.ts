import {gql} from "@apollo/client"

export const GET_USER = gql`
	query ($id: Int) {
		getUser(id: $id) {
			id
			email
			firstName
			lastName
			image_url
		}
	}
`

export const GET_USERS = gql`
	query {
		getUsers {
			id
			email
			image_url
		}
	}
`

export const UPDATE_USER = gql`
	mutation ($email: String, $hash: String, $firstName: String, $lastName: String) {
		updateUser(email: $email, hash: $hash, firstName: $firstName, lastName: $lastName) {
			id
			email
			firstName
			lastName
			image_url
		}
	}
`

export const UPLOAD_USER_IMAGE = gql`
	mutation ($file: Upload!, $email: String, $hash: String) {
		uploadUserImage(file: $file, email: $email, hash: $hash) {
			fileName
			fileUrl
		}
	}
`