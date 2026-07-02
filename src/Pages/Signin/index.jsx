// import './style.css';
import { useContext, useEffect, useState } from 'react';
import { Navbar, Footer, Button } from "../../Components";
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { IoEye, IoEyeOff } from "react-icons/io5";
import UserContext from '../../Context/User/userContext';
import axios from 'axios';
import Swal from 'sweetalert2';

const Signin = ({ setShowSpinner }) => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext);
    const userObj = localStorage.getItem('user');

    useEffect(() => {
        if (user && userObj) {
            navigate('/profile')
        }
    }, [user])

    const reset = () => {
        setEmail("");
        setFirstName("");
        setLastName("");
        setPassword("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSpinner(true);
        const user = {
            email,
            password,
            firstName,
            lastName,
            phone
        };
        const url = `${import.meta.env.VITE_SERVER_API_URL}/auth/signin`
        axios.post(url, user, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                setUser(res.data.data);
                localStorage.setItem('user', JSON.stringify(res.data.data));
                localStorage.setItem('token', JSON.stringify(res.data.token));
                console.log('user', res.data.data);
                navigate('/profile');
                reset();
            })
            .catch(error => {
                // Error handler
                if (error.response) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.response.data.error || 'Failed to create ledger.',
                    });
                    console.log('Error response:', error.response.data);
                } else if (error.request) {
                    Swal.fire({
                        icon: 'error',
                        title: 'No Response',
                        text: 'No response from server.',
                    });
                    console.log('Error request:', error.request);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.message,
                    });
                    console.log('Error message:', error.message);
                }
            })
            .finally(() => {
                setShowSpinner(false);
            })
    };

    return (
        <>
            <Navbar />
            <Container className='login-container' >
                <form className='login-div' onSubmit={handleSubmit}>
                    <h1>Sign in</h1>
                    <span>
                        First Name
                        <span>*</span>
                    </span>
                    <div>

                        <input
                            type="text"
                            placeholder='Enter Your First Name'
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />
                    </div>
                    <span>
                        Last Name
                        <span>*</span>
                    </span>
                    <div>
                        <input
                            type="text"
                            placeholder='Enter Your Last Name'
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />
                    </div>
                    <span>
                        Email
                        <span>*</span>
                    </span>
                    <div>
                        <input
                            type="email"
                            placeholder='Enter Your Email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <span>
                        Phone
                        <span>*</span>
                    </span>
                    <div>
                        <input
                            type="number"
                            placeholder='Enter Your Phone'
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </div>
                    <span>
                        Password
                        <span>*</span>
                    </span>
                    <div className='password-div'>
                        {
                            showPassword ?
                                <>
                                    <input
                                        type="text"
                                        placeholder='Enter Your Password'
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                    <span
                                        className='password-show'
                                        onClick={e => setShowPassword(false)}
                                    >
                                        <IoEyeOff />
                                    </span>
                                </>
                                :
                                <>
                                    <input
                                        type="password"
                                        placeholder='Enter Your Password'
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />

                                    <span
                                        className='password-show'
                                        onClick={e => setShowPassword(true)}
                                    >
                                        <IoEye />
                                    </span>
                                </>
                        }

                    </div>
                    <Button type={'submit'} title={'Sign in'} />
                    <p>Already have an Account?...<Link to={'/login'}>Login</Link></p>
                </form>
            </Container>
            <Footer />
        </>
    );
};

export default Signin;