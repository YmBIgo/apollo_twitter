export type User = {
	id: number
	email: string
	firstName: string
	lastName: string
}

export type GetUserData = {
	getUser: User
}

export type UserVars = {
	id: number
}