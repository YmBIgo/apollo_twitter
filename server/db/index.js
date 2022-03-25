import SQL from "sequelize"

export const getDB = async () => {
	const Op = SQL.Op
	const operatorsAliases = {
		$in: Op.in,
	}

	const db = new SQL('', '', '', {
		dialect: 'sqlite',
		storage: './db/sqlite/apollo_twitter.sqlite',
		operatorsAliases,
		logging: false,
	});

	const users = db.define('user', {
		id: {
			type: SQL.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		email: SQL.STRING,
		image_url: SQL.STRING,
		firstName: SQL.STRING,
		lastName: SQL.STRING,
		password: SQL.STRING,
	})

	const tweets = db.define('tweet', {
		id: {
			type: SQL.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id: SQL.INTEGER,
		content: SQL.STRING,
	})

	return { users, tweets }
}