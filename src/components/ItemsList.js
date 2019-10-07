import React from 'react'


class ItemsList extends React.Component {

	render() {
	  return (
	    <div className="ItemsList">
	      {this.props.feed.items ? this.props.feed.items.map(item => (
	      	<div>
	      		<p>{item.title}</p>
	      		<a href={item.link}>{item.link}</a>
	      	</div>
	      	)) : null}
	    </div>
	  )
	}
}

export default ItemsList
