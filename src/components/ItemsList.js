import React from 'react'


class ItemsList extends React.Component {
	state = {
		items: [],
		feedTitle: ''
	}

	sortItems = (items) => {
		const sortedArr = items.sort((a,b) => {
			if (new Date(a.pubDate) < new Date(b.pubDate)) {
				return true
			}
		})
		this.setState({items: sortedArr})
	}
	
	componentDidMount() {
		if (this.props.feed.items) {
			this.sortItems(this.props.feed.items)
		}
		this.setState({feedTitle: this.props.feed.title})
	}

	componentDidUpdate() {
		if (this.props.feed.title !== this.state.feedTitle && this.props.feed.items) {
			this.setState({feedTitle: this.props.feed.title})
			this.sortItems(this.props.feed.items)
		}
	}

	render() {
	  return (
	    <div className='ItemsList'>
	      {this.state.items.map(item => (
	      	<div className= 'item' onClick={() => this.props.handleItemClick(item)} >
	      		<p>{item.title}</p>
	      	</div>
	      	))}
	    </div>
	  )
	}
}

export default ItemsList
