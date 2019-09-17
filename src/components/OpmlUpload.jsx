import React, { Component } from 'react'
import api from '../api'
import rssParser from '../utils/rss-parser'

class OpmlUpload extends Component {

    handleSubmit = async (event) => {
        event.preventDefault()
        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);

        await api.opmlUpload(data)
    }

    render() {

        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                    <input ref={(ref) => { this.uploadInput = ref; }} type='file' />
                <input type='submit' />
            </form>
            </div>
        )
    }
}

export default OpmlUpload
