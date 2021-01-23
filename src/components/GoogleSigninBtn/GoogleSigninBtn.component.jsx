import React from 'react';

import google_logo from '../../images/google_logo.png';
import styles from './GoogleSigninBtn.module.css';
import {signInWithGoogle} from '../../services/firebase'

const GoogleSigninBtn = props => {
    const onSigninClick = () => {
        signInWithGoogle().then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        }) 
    }
    return <div {...props} className={`${styles.button}`} onClick={onSigninClick}>
        <img className={`${styles.logo}`} src={google_logo} alt="google signin" />
        <p className={`${styles.text}`}>Sign in with Google</p>
    </div>
}

export default GoogleSigninBtn;