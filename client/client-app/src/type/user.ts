export type User = {
	id: number
	email: string
	firstName: string
	lastName: string
}

export type GetUserData = {
	getUser: User
}

export type UpdateUserData = {
	updateUser: User
}

export type UpdateUserVars = {
	email: string
	hash: string
	firstName: string
	lastName: string
}

export type UserVars = {
	id: number
}