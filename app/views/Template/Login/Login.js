import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { endSession } from '../../../services/authentication'
import { environment } from '../../../services/'
const { ENV } = environment

/*
LOGIN COMPONENT
A branding-compliant component used to log in
*/
import styles from './Login.css'
@connect(
  state => ({ user: state.user }),
  dispatch => ({ signOut: bindActionCreators(endSession, dispatch) })
)
class Login extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    signOut: PropTypes.func
  }
  render ({ user, signOut } = this.props) {
    return (
      <div className={styles['login']}>
        {!user.authenticated
          ? <a href={ENV === 'production' ? '/auth/google' : '/auth/google'} >
            <button className={styles['button']} >
              <strong>{ENV === 'production' ? 'UW NetID' : 'UW MOCK'}</strong>
              <small>WEBLOGIN</small>
            </button>
          </a>
          : <button className={styles['button']}
            onClick={() => signOut()}
          >
            <strong>{user.netID}</strong>
            <small>Signed In</small>
          </button>
        }
      </div>
    )
  }
}

export default Login
