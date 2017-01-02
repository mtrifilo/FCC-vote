import axios from 'axios'

export function submitNewPoll (newPoll) {
  return axios.post('/api/polls', newPoll)
}
export function getUserPolls (user) {
  return axios.get(`/api/polls/${user}`)
}
export function submitVote (id, vote) {
  return dispatch => {
    axios.put(`/api/polls/${id}`, vote)
  }
}
export function userSignupRequest (userData) {
  return axios.post('/api/users', userData)
}
export function isUserExists (identifier) {
  return axios.get(`/api/users/${identifier}`)
}