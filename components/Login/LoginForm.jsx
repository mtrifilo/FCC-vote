import React from 'react'
import { connect } from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup'
import validateInput from '../../routes/shared/loginValidation'
const { func, object, bool, shape } = React.PropTypes
import { login } from '../../redux/modules/auth'

const LoginForm = React.createClass({
  propTypes: {
    dispatchLogin: func.isRequired,
    user: shape({
      isAuthenticated: bool,
      user: object,
      userLoading: bool
    })
  },
  getInitialState () {
    return {
      identifier: '',
      password: '',
      errors: {
        identifier: null,
        passwords: null
      },
      isLoading: false
    }
  },

  isValid () {
    const { errors, isValid } = validateInput(this.state)
    if (!isValid) {
      this.setState({ errors })
    }
    return isValid
  },

  onSubmit (event) {
    event.preventDefault()
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true })
      this.props.dispatchLogin(this.state)
      // TODO: redirect to the home page on successful login
      // may need react-redux-router to trigger redirect in
      // thunk action creator after successful login
    }
  },

  onChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  },

  componentWillReceiveProps (nextProps) {
    console.log('NEXT PROPS:', nextProps)
  },

  render () {
    const { errors, identifier, password, isLoading } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>

        { errors.form && <div className='alert alert-danger'>{errors.form}</div> }

        <TextFieldGroup
          field='identifier'
          label='Username / Email'
          value={identifier}
          error={errors.identifier}
          onChange={this.onChange}
        />

        <TextFieldGroup
          field='password'
          label='Password'
          value={password}
          error={errors.password}
          onChange={this.onChange}
          type='password'
        />

        <div className='form-group'>
          <button className='button btn btn-primary btn-lg' disabled={isLoading}>Login</button>
        </div>

      </form>
    )
  }
})

LoginForm.contextTypes = {
  router: object.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchLogin (credentials) {
      dispatch(login(credentials))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
