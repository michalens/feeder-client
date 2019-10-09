import React from 'react'
import FeedList from '../components/FeedList'
import ItemsList from '../components/ItemsList'
import ItemContent from '../components/ItemContent'
// import OpmlUpload from '../components/OpmlUpload'

import api from '../api'

import './App.css'


class App extends React.Component {
	state = {
		selectedFeed:{},
		selectedItem: {}
	}

	getFeedById = async (rowInfo) => {
		const data = await api.getFeedById(rowInfo.node.id)
		this.setState({selectedFeed: data.data.data})
	}

	handleItemClick = (item) => {
		this.setState({selectedItem: item})
	}

	render() {
	  return (
	    <div className="App">
	      <FeedList getFeed={(rowInfo) => this.getFeedById(rowInfo)}/>
	      <ItemsList feed={this.state.selectedFeed} handleItemClick={(item) => this.handleItemClick(item)}/>
	      <ItemContent item={this.state.selectedItem} />
	    </div>
	  )
	}
}

export default App;
