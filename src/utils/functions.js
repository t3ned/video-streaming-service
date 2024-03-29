module.exports.GenVideoID = () => {
	const length = 16,
		charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let result = '';

	for (let i = length; i > 0; --i) {
		result += charset[Math.floor(Math.random() * charset.length)];
	}
	return result;
};

// Make sure the user is logged in
module.exports.ensureAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) return next();
	res
		.status(302)
		.redirect('/login');
};

module.exports.checkDev = (req, res, next) => {
	if (req.isAuthenticated()) {
		/*
		if (company.devs.includes(req.user._id.toString())) {
			return next();
		} else {
			res.status(403)
				.render('403-page.ejs', {
					user: req.isAuthenticated() ? req.user : null,
					company,
				});
		}
		*/
		next();
	} else {
		return res
			.status(302)
			.redirect('/login');
	}
};

module.exports.partition = (array, predicate) => {
	const partitionOne = [];
	const partitionTwo = [];

	for (let i = 0; i < array.length; i++) {
		if (predicate(array[i], i)) {
			partitionOne.push(array[i]);
		} else {
			partitionTwo.push(array[i]);
		}
	}

	return [partitionOne, partitionTwo];
};

module.exports.commentMapper = (comment) => {
	const [likes, dislikes] = this.partition(comment.ratings, (c) => c.type === 'LIKE');
	const replies = comment._count.replies;

	Reflect.deleteProperty(comment, 'ratings');
	Reflect.deleteProperty(comment, '_count');

	return {
		...comment,
		replies,
		likes:
		likes.length,
		dislikes:
		dislikes.length,
	};
};