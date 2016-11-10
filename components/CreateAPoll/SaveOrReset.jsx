const React = require('react')
const { connector } = require('../../redux/Store')
const { string, func } = React.PropTypes

const SaveOrReset = React.createClass({
  propTypes: {
    newPollTitle: string,
    resetNewPoll: func
  },
  handleResetButtonClick () {
    this.props.resetNewPoll(true)
  },
  render () {
    return (
      <div className='text-center'>
        <button className='btn btn-primary save-reset-buttons'>Save</button>
        <button
          className='btn save-reset-buttons reset-poll-button'
          onClick={this.handleResetButtonClick}
        >
          Reset
        </button>
      </div>
    )
  }
})

module.exports = connector(SaveOrReset)
