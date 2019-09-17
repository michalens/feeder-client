import Parser from 'rss-parser'
const parser = new Parser()

async function rssParser (url) {

  let feed = await parser.parseURL(url);
  
  const { feedUrl, title, description, link } = feed
  return {
  	feedUrl,
  	title,
  	description,
  	link
  }

}

export default rssParser