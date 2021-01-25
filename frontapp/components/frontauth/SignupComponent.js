import axios from 'axios';
import React, { useState } from 'react';
import { API } from '../../config';

const SignupComponent = () => {
    const [values, setValues] = useState({
        username: 'silvio1',
        name: 'Silvioo',
        email: 'berlusconi@gmail.com',
        password: '123ooo007',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, name, email, password } = values;
        const user = {username, name, email, password};

        await axios.post(`${API}/auth`, user);  

    };

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value });
    };

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');

    const signupForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        value={values.username}
                        onChange={handleChange('username')}
                        type="text"
                        className="form-control"
                        placeholder="Type your username"
                    />
                </div>

                <div className="form-group">
                    <input
                        value={values.name}
                        onChange={handleChange('name')}
                        type="text"
                        className="form-control"
                        placeholder="Type your name"
                    />
                </div>

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
                    <button className="btn btn-primary">Signup</button>
                </div>
            </form>
        );
    };

    return <React.Fragment>
        {showLoading()}
        {signupForm()} 
         </React.Fragment>;
};

export default SignupComponent;