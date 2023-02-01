import React, { useContext } from 'react';
// import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';
// import useToken from '../Hooks/useToken';

const GoogleSignIn = ({ from, formLoading, setFormLoading }) => {

    const { signInWithGoogle, setUserInfo, setUserLoading } = useContext(AuthContext);
    // const [loginEmail, setLoginEmail] = useState('');
    // const [token] = useToken(loginEmail);
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (token) {
    //         setRedirect(false);
    //         toast.success('Logged in successfully.');
    //         navigate(from || '/', { replace: true });
    //     }
    // }, [token, navigate, from, setRedirect])

    // Sign in with google
    const handleGoogleSignIn = () => {
        setFormLoading(true);
        signInWithGoogle()
            .then(result => {
                // setRedirect(true);
                const user = result.user;
                setUserInfo(user);
                navigate(from || '/', { replace: true });
                // const role = 'buyer';
                // const currentUser = { ...user, role };
                // setUserInfo(currentUser);
                // saveUserInfo(user.displayName, user.email);
            })
            .catch(error => console.log(error.message))
            .finally(() => {
                setUserLoading(false);
                setFormLoading(false);
            })
    }

    // Save user data to database
    // const saveUserInfo = (name, email) => {
    //     const user = {
    //         name,
    //         email,
    //         role: 'buyer'
    //     }

    //     fetch('https://cadence-watches-server.vercel.app/users', {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(user)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data) {
    //                 // setLoginEmail(email);
    //                 setFormLoading(false);
    //             }
    //         })
    //         .catch(error => toast.error(error.message))
    // }

    return <button onClick={handleGoogleSignIn} className='btn bg-primary hover:bg-blue-600 border-0 mt-2 w-full' disabled={formLoading} >Continue with Google</button>
};

export default GoogleSignIn;