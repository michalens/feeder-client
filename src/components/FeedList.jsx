import React, { Component } from 'react'
import TreeMenu from 'react-simple-tree-menu';

import './FeedList.css'
import api from '../api'
import rssParser from '../utils/rss-parser'


class FeedList extends Component {
    state = {
            formData: {},
            rootFeeds: [],
            folders: [],
            isLoading: false,
            treeData: {},
        }

    createTree = (feeds, folders) => {
        const treeData = []
        if (feeds) {
            feeds.forEach(feed => {
                treeData.push({
                    key: feed.slug,
                    label: feed.title,
                    id: feed._id
                })
            })
        }
        if (folders) {
            folders.forEach(folder => {
                const obj = {
                    key: folder.slug,
                    label: folder.title,
                    id: folder._id,
                    nodes: []
                }
                if (folder.feeds.length > 0) {
                    const newArr = this.createTree(folder.feeds)
                    newArr.forEach(item => obj.nodes.push(item))
                }
                if (folder.folders.length > 0) {
                    const newArr = this.createTree(null, folder.folders)
                    newArr.forEach(item => obj.nodes.push(item))
                }
                treeData.push(obj)
            })
        }

        return treeData
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllFeeds().then(feeds => {
            this.setState({
                rootFeeds: feeds.data.data.feeds,
                folders: feeds.data.data.folders,
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
        const { rootFeeds, folders, isLoading } = this.state

        const treeData = this.createTree(rootFeeds, folders)

        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <input value={this.state.newUrl} onChange={this.handleChange} type='text' />
                <input type='submit' />
            </form>
            <div className='tree-menu'>
                <TreeMenu data={treeData} />
            </div>
            </div>
        )
    }
}

export default FeedList