import {DataSource} from "apollo-datasource"

export class Tweet extends DataSource {
	constructor({store}) {
		super()
		this.store = store
	}
	initialize(config) {
		this.context = config.context
	}
	async findAll() {
		return this.store.tweets.findAll()
	}
	async findById(id) {
		return this.store.tweets.findOne({where: {id}})
	}
	async findByUserId(user_id) {
		return this.store.tweets.findAll({where: {user_id}})
	}
	async create(user_id, content) {
		return this.store.tweets.create({user_id, content})
	}
}
