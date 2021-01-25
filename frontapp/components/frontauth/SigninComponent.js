import React, { useState } from 'react';
import axios from 'axios';

const SigninComponent = () => {
    const [values, setValues] = useState({
        email: 'berlusconi@gmail.com',
        password; '000prctoo'
    });

    const { email, password } = values;

    const handleSubmit = e => {
        e.preventDefault();

        const { email, password } = values;
        const user = { email, password};
        await axios.post(`${API}/signin`, user);

    };

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');

    const SigninForm = () => {
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
    {signupForm()} 
     </React.Fragment>;
};

export default SigninComponent;