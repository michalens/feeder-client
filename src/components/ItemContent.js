import React from 'react'


class ItemContent extends React.Component {

	render() {
	  return (
	    <div className='ItemContent'>
	      <p>{this.props.item.title}</p>
  	      <a href={this.props.item.link}>{this.props.item.link}</a>
	      <p>{this.props.item.pubDate}</p>
	    </div>
	  )
	}
}

export default ItemContent
