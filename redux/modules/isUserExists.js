import axios from 'axios'

// Action
const DUPE_USER_CHECK_RESULTS = 'DUPE_USER_CHECK_RESULTS'

// Action Creators
function dupeUserCheck(errors, invalid) {
  return { type: DUPE_USER_CHECK_RESULTS, errors, invalid }
}
export function isUserExists (identifier, field, validationErrors) {
  return dispatch => {
    axios.get(`/api/users/${identifier}`)
      .then(res => {
        let invalid
        let errors = {}
        if (res.data.user) {
          errors[field] = 'A user exists with this ' + field
          invalid = true
        } else {
          errors[field] = ''
          invalid = false
        }
        let newErrors = {}
        Object.assign(newErrors, validationsErrors, errors)
        dispatch(dupeUserCheck( newErrors, invalid ))
      })
  }
}

// Reducer
function reduceDupeUserCheck (state, action) {
  const newState = {}
  Object.assign(newState, state, { 
    errors: action.errors, 
    invalid: action.invalid 
  })
}

const initialState = {
  errors: {},
  invalid: false
}

// Root Reducer Slice
export default function dupeUserCheck (state = initialState, action) {
  switch (action.type) {
    case DUPE_USER_CHECK_RESULTS:
      return reduceDupeUserCheck(state, action)
    default:
      return state
  }
}