import React from 'react'
import NewPollTitle from '../CreateAPoll/NewPollTitle'
import PendingPollOptions from '../CreateAPoll/PendingPollOptions'
import SaveOrReset from '../CreateAPoll/SaveOrReset'
import { connect } from 'react-redux'
import {
  setPollOptions,
  setPollTitle,
  setTitleEditable,
  resetPoll,
  setEditedPoll,
  getPollData
} from '../../redux/modules/editPoll'
const { object, func, bool, string, array } = React.PropTypes

const EditPoll = React.createClass({
  propTypes: {
    poll: object,
    newPollTitle: string,
    newPollOptions: array,
    titleEditable: bool,
    dispatchUpdateOption: func,
    dispatchResetNewPoll: func,
    dispatchSubmitPoll: func,
    dispatchSetNewPollTitle: func,
    dispatchSetTitleEditable: func,
    dispatchGetPollData: func,
    user: object,
    routeParams: object.isRequired
  },
  componentWillMount () {
    this.props.dispatchGetPollData(this.props.routeParams.id)
  },
  componentWillUnmount () {
    this.props.dispatchResetNewPoll()
  },
  render () {
    const newPoll = false
    const fields = (
      <div>
        <h1 className='view-title text-center'>Edit</h1>
        <NewPollTitle
          newPollTitle={this.props.newPollTitle}
          titleEditable={this.props.titleEditable}
          dispatchSetNewPollTitle={this.props.dispatchSetNewPollTitle}
          dispatchSetTitleEditable={this.props.dispatchSetTitleEditable}
          editPoll
        />
        <PendingPollOptions
          poll={this.props.poll}
          dispatchUpdateOption={this.props.dispatchUpdateOption}
        />
        <SaveOrReset
          newPollTitle={this.props.newPollTitle}
          newPollOptions={this.props.newPollOptions}
          dispatchResetNewPoll={this.props.dispatchResetNewPoll}
          dispatchSubmitPoll={this.props.dispatchSubmitPoll}
          user={this.props.user}
          poll={this.props.poll}
          newPoll={newPoll}
          pollID={this.props.routeParams.id}
        />
      </div>
    )
    // if the title isn't an empty string, display fields. This prevents a text flash
    // after rerender. Hacky fix for now.
    const receivedTitle = this.props.newPollTitle !== ''
    return (
      <div>
        {receivedTitle ? fields : null}
      </div>
    )
  }
})

const mapStateToProps = (state) => {
  return {
    poll: state.editPoll,
    newPollTitle: state.editPoll.newPollTitle,
    newPollOptions: state.editPoll.newPollOptions,
    titleEditable: state.editPoll.titleEditable,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchUpdateOption (newOptions) {
      dispatch(setPollOptions(newOptions))
    },
    dispatchSetNewPollTitle (pollTitle) {
      dispatch(setPollTitle(pollTitle))
    },
    dispatchSetTitleEditable (bool) {
      dispatch(setTitleEditable(bool))
    },
    dispatchResetNewPoll (newPoll) {
      dispatch(resetPoll())
    },
    dispatchSubmitPoll (id, pollData) {
      dispatch(setEditedPoll(id, pollData))
    },
    dispatchGetPollData (id) {
      dispatch(getPollData(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPoll)
