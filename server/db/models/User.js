import {DataSource} from "apollo-datasource"

export class User extends DataSource {
	constructor({store}) {
		super()
		this.store = store
	}
	initialize(config) {
		this.context = config.context
	}
	async findAll() {
		return this.store.users.findAll()
	}
	async findOrCreate({where, defaults = {}}){
		return await this.store.users.findOrCreate({where, defaults})
	}
	async findByEmail(email) {
		return this.store.users.findOne({where: {email}})
	}
	async findById(id) {
		return this.store.users.findOne({where: {id}})
	}
	async userSignIn(email, password) {
		return this.store.users.findOne({where: {email, password}})
	}
	async update(id, firstName, lastName) {
		const user = await this.store.users.findOne({where: {id}})
		user.firstName = firstName
		user.lastName = lastName
		user.save()
		return user
	}
	async updateImage(id, image_url) {
		const user = await this.store.users.findOne({where: {id}})
		user.image_url = image_url
		user.save()
		return user
	}
	async create(user_id, content) {
		return this.store.users.create({user_id, content})
	}
}
