const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (_blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const sumLikes = blogs.reduce(function (total, curr) {
		// eslint-disable-next-line no-undef
		return sum = total + curr.likes
	}, 0)
	return sumLikes
}

const favoriteBlog = (blogs) => {
	let idx
	let max = 0
	blogs.forEach((element, index) => {
		if (element.likes > max) {
			max = element.likes
			idx = index
		}
	})
	return blogs[idx]
}

const mostBlogs = (blogs) => {
	const count = _.head(_.reverse(_.toPairs(_.countBy(blogs, 'author'))))
	return {
		author: count[0],
		blogs: count[1]
	}
}

const mostLikes = (blogs) => {
	// group blogs by author
	const list = [...blogs]
	const groupByAuthors = list.reduce((acc, curr) => {
		const group = (acc[curr.author] || [])
		group.push(curr)
		acc[curr.author] = group
		return acc

	}, {})

	// get likes for each author
	const likes = Object.keys(groupByAuthors).map((author) => {
		const likes = groupByAuthors[author].reduce((acc, curr) => {
			return acc + curr.likes
		}, 0)
		return {
			author: author,
			likes: likes
		}
	})

	// return author with most likes
	let idx
	let max = 0
	likes.forEach((element, index) => {
		if (element.likes > max) {
			max = element.likes
			idx = index
		}
	}
	)
	return likes[idx]
}

module.exports = {
	dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}