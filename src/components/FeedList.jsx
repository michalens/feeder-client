import React, { Component } from 'react'
import SortableTree from 'react-sortable-tree'
import 'react-sortable-tree/style.css'

import './FeedList.css'
import api from '../api'
import rssParser from '../utils/rss-parser'


class FeedList extends Component {
    state = {
            formData: {},
            rootFeeds: [],
            folders: [],
            isLoading: false,
            treeData: [{ title: 'Chicken', children: [{ title: 'Egg' }] }],
        }

    createTree = (feeds, folders) => {
        const treeData = []
        if (folders) {
            folders.forEach(folder => {
                const obj = {
                    title: folder.title,
                    id: folder._id,
                    children: []
                }
                if (folder.feeds.length > 0) {
                    const newArr = this.createTree(folder.feeds)
                    newArr.forEach(item => obj.children.push(item))
                }
                if (folder.folders.length > 0) {
                    const newArr = this.createTree(null, folder.folders)
                    newArr.forEach(item => obj.children.push(item))
                }
                treeData.push(obj)
            })
        }

        if (feeds) {
            feeds.forEach(feed => {
                treeData.push({
                    title: feed.title,
                    id: feed._id
                })
            })
        }
        return treeData
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllFeeds().then(data => {
            const {feeds, folders} = data.data.data
            const treeData = this.createTree(feeds, folders)
            this.setState({
                treeData,
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
        const { treeData, isLoading } = this.state

        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <input value={this.state.newUrl} onChange={this.handleChange} type='text' />
                <input type='submit' />
            </form>
            <div className='tree-menu' style={{ height: 1000 }}>
                <SortableTree treeData={treeData} onChange={treeData => this.setState({ treeData })}/>
            </div>
            </div>
        )
    }
}

export default FeedList