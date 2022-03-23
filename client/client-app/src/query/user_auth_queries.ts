import {gql} from "@apollo/client"

export const CURRENT_USER = gql`
	query ($email: String, $hash: String) {
		getCurrentUser(email: $email, hash: $hash) {
			id
			email
		}
	}
`

export const USER_SIGN_UP = gql`
	mutation ($email: String, $password: String) {
		createUser(email: $email, password: $password) {
			id
			hashed_password
			email
		}
	}
`

export const USER_SIGN_IN = gql`
	mutation ($email: String, $password: String) {
		signInUser (email: $email, password: $password) {
			id
			email
			hashed_password
		}
	}
`