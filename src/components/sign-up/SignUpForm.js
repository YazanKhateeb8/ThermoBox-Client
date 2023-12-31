
import { useState } from 'react';
import './sign-up.css'
import TextField from '@mui/material/TextField';
// import EmailIcon from '../../assets/icons/email.svg'

const SignUpForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "" , phoneNumber : ""});

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onSubmit(formData)
    }

    return (
        <div id="form-container">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <TextField required name="firstName" value={formData.firstName} label="First Name" variant="outlined" onChange={handleChange} />
                    <TextField name="lastName" value={formData.lastName} label="Last Name" variant="outlined" onChange={handleChange} />
                </div>

                <TextField required type="email" name="email" value={formData.email} label="Email" variant="outlined" onChange={handleChange} />
                <TextField required minlength={8} type="password" name="password" value={formData.password}  label="Password" variant="outlined" onChange={handleChange} />
                <TextField required name="phoneNumber" value={formData.phoneNumber} label="phone Number" variant="outlined" onChange={handleChange} />

                <button type="submit" className="email-btn">
                    {/* <img className="logo" src={EmailIcon} /> */}
                    <p>Sign Up</p>
                </button>
            </form>
        </div>
    )
}

export default SignUpForm