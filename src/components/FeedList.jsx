import React, { Component } from 'react'
import SortableTree from 'react-sortable-tree'
import 'react-sortable-tree/style.css'
import MinimalTheme from 'react-sortable-tree-theme-minimal';

import './FeedList.css'
import api from '../api'


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

    handleRefresh = () => {
        api.refreshFeeds()
    }

    render() {
        const { treeData } = this.state

        return (
            <div className='FeedList'>
            <form onSubmit={this.handleSubmit}>
                <input value={this.state.newUrl} onChange={this.handleChange} type='text' />
                <input type='submit' />
            </form>
            <button onClick={this.handleRefresh}>Refresh</button>
            <div className='tree-menu' >
                <SortableTree 
                treeData={treeData} 
                onChange={treeData => this.setState({ treeData })}
                generateNodeProps={rowInfo => ({
                    onClick: (e) => {
                        this.props.getFeed(rowInfo)
                        e.stopPropagation()
                    }
                })} 
                theme={MinimalTheme}
                />
            </div>
            </div>
        )
    }
}

export default FeedList