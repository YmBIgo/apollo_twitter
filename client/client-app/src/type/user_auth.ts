export type User = {
	id: number
	email: string
	firstName: string
	lastName: string
	hashed_password: string
}

export type CurrentUserData = {
	getCurrentUser: User
}

export type SignUpUserData = {
	createUser: User
}

export type SignInUserData = {
	signInUser: User
}

export type CurrentUserVars = {
	email: string
	hash: string
}

export type UserSignInUpVar = {
	email: string
	password: string
}