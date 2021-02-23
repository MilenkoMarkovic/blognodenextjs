
/* eslint-disable react/react-in-jsx-scope */
import Layout from '../components/Layout';
import SigninComponent from '../components/frontauth/SigninComponent';

const Signin = () => {
    return (
        <Layout>
            <h2 className="text-center pt-3 pb-4">Signin</h2>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <SigninComponent />
                </div>
            </div>
        </Layout>
    );
};

export default Signin;