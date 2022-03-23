import {gql} from "@apollo/client"

export const GET_USER = gql`
	query ($id: Int) {
		getUser(id: $id) {
			id
			email
			firstName
			lastName
		}
	}
`

export const GET_USERS = gql`
	query {
		getUsers {
			id
			email
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
		}
	}
`