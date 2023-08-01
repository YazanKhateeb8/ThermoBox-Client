import './sign-up.css'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import LogInForm from './LogInForm'
import SignUpForm from './SignUpForm'
import { emailSignUp, emailLogin } from '../../servicesApi/AuthApi'
import SignUpIcon from '../../assets/icons/sign-up.svg'
// import GoogleIcon from '../../assets/icons/google.png'
import Checkbox from '@mui/material/Checkbox';


const SignUp = ({ onSubmitClick, onAuthorization }) => {

    const [isSignedUp, setIsSignedUp] = useState(false)
    const [showLoadingPage, setShowLoadingPage] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    const onEmailLogin = async (formData) => {
        onSubmitClick()
        try {
            const token = await emailLogin(formData)
            onAuthorization(token)
        }
        catch (err) {
            toast(err.message)
        }
    }

    const onEmailSignUp = async (formData) => {
        onSubmitClick()
        console.log(formData)
        try {
            const token = await emailSignUp(formData, isAdmin)
            onAuthorization(token, isAdmin)
        }
        catch (err) {
            toast(err.message)
        }
    }

    

    return (
        <div id="sign-up-container">
            <ToastContainer />
            {/* <LoadingPage show={showLoadingPage} text={"Logging You In ..."} /> */}

            <div className="title-container">
                <img className="logo" src={SignUpIcon} />
                <h2 className="text">
                    {isSignedUp ? 'Sign In' : 'Sign Up'}
                </h2>
            </div>


            {isSignedUp ? <LogInForm onSubmit={onEmailLogin} /> : <SignUpForm onSubmit={onEmailSignUp} />}

            <div className="auth-toggle">
                {isSignedUp ?
                    <button onClick={() => setIsSignedUp(false)}>Sign Up</button>
                    :
                    <>
                        <p>Already Signed Up? {' '}</p>
                        <button onClick={() => setIsSignedUp(true)}>Log In</button>
                    </>
                }

            </div>
            

            

        </div>
    )
}

export default SignUp


