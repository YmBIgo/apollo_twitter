export type User = {
	id: number
	email: string
	firstName: string
	lastName: string
}

export type CurrentUserData = {
	getCurrentUser: User
}

export type UserVars = {
	email: string
	hash: string
}