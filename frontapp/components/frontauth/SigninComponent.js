/* eslint-disable no-undef */
import axios from 'axios';
import React, { useState } from 'react';
import { API } from '../../config';

const SigninComponent = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const { email, password } = values;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = values;
        const user = { email, password};
        await axios.post(`${API}/api/v1/auth/signin`, user);

    };

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');

    const signinForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                
                <div className="form-group">
                    <input
                        value={values.email}
                        onChange={handleChange('email')}
                        type="email"
                        className="form-control"
                        placeholder="Type your email"
                    />
                </div>

                <div className="form-group">
                    <input
                        value={values.password}
                        onChange={handleChange('password')}
                        type="password"
                        className="form-control"
                        placeholder="Type your password"
                    />
                </div>

                <div>
                    <button className="btn btn-primary">Signin</button>
                </div>
            </form>
        );
    };

    return <React.Fragment>
    {showLoading()}
    {signinForm()} 
     </React.Fragment>;
};

export default SigninComponent;