export type User = {
	id: number
	email: string
	firstName: string
	lastName: string
	image_url: string
}

export type FileType = {
	fileName: string
	fileUrl: string
}

export type GetUserData = {
	getUser: User
}

export type UpdateUserData = {
	updateUser: User
}

export type UploadUserImageData = {
	uploadUserImage: FileType
}

export type UploadUserImageVars = {
	email: string
	hash: string
	file: File
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