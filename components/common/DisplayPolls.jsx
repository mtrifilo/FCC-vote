import React from 'react'
import { connect } from 'react-redux'
import ResultsCard from './ResultsCard'
import PollCard from './PollCard'
import EmptyPolls from './EmptyPolls'
import { dupeVoterCheck } from '../../routes/lib/pollsLib'
const { func, array, object } = React.PropTypes

const DisplayPolls = React.createClass({
  propTypes: {
    polls: array,
    user: object,
    dispatchSubmitVote: func,
    getPolls: func
  },
  populateCards () {
    return this.props.polls.map(poll => {
      const currentUser = this.props.user ? this.props.user.username : null
      const dupeVoter = dupeVoterCheck(poll, currentUser)
      const { title, options, totalVotes, _id } = poll
      if (dupeVoter) {
        return (
          <ResultsCard
            user={this.props.user}
            key={_id}
            title={title}
            options={options}
            totalVotes={totalVotes}
            id={_id}
          />
        )
      }
      return (
        <PollCard
          dispatchSubmitVote={this.props.dispatchSubmitVote}
          user={this.props.user}
          key={_id}
          title={title}
          options={options}
          totalVotes={totalVotes}
          id={_id}
        />
      )
    })
  },
  componentWillMount () {
    if (this.props.polls === null) {
      this.props.getPolls()
    }
  },
  render () {
    if (this.props.polls === null || this.props.polls === false) {
      return <EmptyPolls polls={this.props.polls} />
    }
    const populatedCards = this.populateCards()
    return (
      <div className='row'>
        {populatedCards}
      </div>
    )
  }
})

export default DisplayPolls