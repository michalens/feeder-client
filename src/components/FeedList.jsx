import React, { Component } from 'react'
import api from '../api'
import rssParser from '../utils/rss-parser'

class MoviesList extends Component {
    state = {
            formData: {},
            feeds: [],
            isLoading: false,
        }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllFeeds().then(feeds => {
            this.setState({
                feeds: feeds.data.data,
                isLoading: false,
            })
        })
    }

    handleChange = event => {
        this.setState({ formData: {feedUrl: event.target.value } });
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        await api.addFeed(this.state.formData)
    }

    render() {
        const { feeds, isLoading } = this.state

        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <input value={this.state.newUrl} onChange={this.handleChange} type='text' />
                <input type='submit' />
            </form>
            {feeds.map((feed, i) => <div key={i}>{feed.title}</div>)}
            </div>
        )
    }
}

export default MoviesList
