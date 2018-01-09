module.exports = {
	base_url: "http://tw-http-hunt-api-1062625224.us-east-2.elb.amazonaws.com",
	auth: {
		user_id: "<user-id>" //replace with user id
	},
	apis: {
    challenge: "/challenge",
		input: "/challenge/input",
		output: "/challenge/output"
	}
}