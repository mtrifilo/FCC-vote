import React from 'react'
import { connect } from 'react-redux'
import { submitVote } from '../../redux/modules/submitVote'
const { string, array, number, object, func } = React.PropTypes

const PollCard = React.createClass({
  propTypes: {
    title: string,
    options: array,
    totalVotes: number,
    id: string,
    user: object,
    dispatchSubmitVote: func
  },
  getInitialState () {
    return {
      selectedOption: null,
      updatedTotalVotes: null
    }
  },
  onOptionChange (event) {
    this.setState({ selectedOption: event.target.value })
  },
  onVoteSubmit (event) {
    event.preventDefault()
    const pollID = this.props.id
    let selectedOption = this.state.selectedOption
    const voter = this.props.user.username || null
    if (selectedOption !== null) {
      const vote = { selectedOption, voter }
      this.props.dispatchSubmitVote(pollID, vote)
    } else {
      console.log('no poll option selected!')
    }
  },
  render () {
    const options = this.props.options.map((option, index) => {
      const id = `gridRadios${index}`
      const value = `${index}`
      return (
        <div key={option.option} className='form-check'>
          <label className='form-check-label poll-card-label'>
            <input
              className='form-check-input radio-option'
              type='radio'
              onChange={this.onOptionChange}
              name='gridRadios'
              id={id}
              value={value}
            />
            {option.option}
          </label>
        </div>
      )
    })
    return (
      <div className='col-sm-4'>
        <form onSubmit={this.onVoteSubmit}>
          <h2>{this.props.title}</h2>
          <fieldset className='form-group row'>
            <div className='col-sm-10'>
              {options}
            </div>
          </fieldset>
          <p>Total votes cast: {this.state.updatedTotalVotes || this.props.totalVotes}</p>
          <div className='form-group row'>
            <div className='offset-sm-2 col-sm-10'>
              <button type='submit' className='btn btn-primary'>Vote</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
})

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSubmitVote (id, vote) {
      dispatch(submitVote(id, vote))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollCard)
