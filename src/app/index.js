import React from 'react'
import FeedList from '../components/FeedList'
import ItemsList from '../components/ItemsList'
import OpmlUpload from '../components/OpmlUpload'

import api from '../api'


class App extends React.Component {
	state = {
		currentFeed:{}
	}

	getFeedById = async (rowInfo) => {
		const data = await api.getFeedById(rowInfo.node.id)
		this.setState({currentFeed: data.data.data})
	}
	render() {
	  return (
	    <div className="App">
	      <FeedList getFeed={(rowInfo) => this.getFeedById(rowInfo)}/>
	      <OpmlUpload />
	      <ItemsList feed={this.state.currentFeed} />
	    </div>
	  )
	}
}

export default App;
