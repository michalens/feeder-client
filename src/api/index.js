import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const addFeed = payload => api.post(`/feed`, payload)
export const getAllFeeds = () => api.get(`/feed`)
export const updateFeedById = (id, payload) => api.put(`/feed/${id}`, payload)
export const deleteFeedById = id => api.delete(`/feed/${id}`)
export const getFeedById = id => api.get(`/feed/${id}`)

const apis = {
    addFeed,
    getAllFeeds,
    updateFeedById,
    deleteFeedById,
    getFeedById,
}

export default apis