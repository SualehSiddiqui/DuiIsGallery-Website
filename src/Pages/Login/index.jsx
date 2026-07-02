import './style.css';
import { useContext, useEffect, useState } from 'react';
import { Navbar, Footer, Button } from "../../Components";
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { IoEye, IoEyeOff } from "react-icons/io5";
import UserContext from "../../Context/User/userContext.js";
import { Modal } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';

const Login = ({ setShowSpinner }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext);
    const userObj = localStorage.getItem('user');
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    useEffect(() => {
        if (user && userObj) {
            navigate('/profile')
        }
    }, [user])

    const reset = () => {
        setEmail("");
        setPassword("");
    };

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        axios.post(`${import.meta.env.VITE_SERVER_API_URL}auth/forgetPassword`, { email: email }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                setOpen(false);
                setConfirmLoading(false);
                console.log(res.data.message);
                Swal.fire({
                    icon: "success",
                    title: "Sent...",
                    text: res.data?.message
                });
                reset();
            })
            .catch(error => {
                // Error handler
                if (error.response) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.response.data.message || 'Failed to create ledger.',
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
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSpinner(true);
        const user = {
            email,
            password,
        };
        const url = `${import.meta.env.VITE_SERVER_API_URL}/auth/login`
        axios.post(url, user, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                setUser(res.data.data);
                localStorage.setItem('user', JSON.stringify(res.data.data));
                localStorage.setItem('token', JSON.stringify(res.data.token));
                navigate('/profile');
                reset();
            })
            .catch(error => {
                // Error handler
                if (error.response) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.response.data.message || 'Failed to create ledger.',
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
            .finally(() => setShowSpinner(false));
    };

    return (
        <>
            <Navbar />
            <Container className='login-container' >
                <form className='login-div' onSubmit={handleSubmit}>
                    <h1 className='mb-3'>Welcome Back!</h1>
                    <span>
                        Email
                        <span>*</span>
                    </span>
                    <div>
                        <input
                            type="text"
                            placeholder='Enter Your Email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
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
                    <Button type={'submit'} title={'Login'} />
                    <p style={{ textAlign: 'end' }}><Link onClick={showModal}>Forgot password</Link></p>
                    <p>Dont't have an Account? <Link to={'/signin'}>Register Here</Link></p>
                </form>
            </Container>
            <Footer />
            <Modal
                title="Forgot Password"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                width={'500px'}
                okText={'Send Email'}
            >
                <form className="forgot-main-div">
                    <input
                        type="email"
                        placeholder='Enter Your Email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </form>
            </Modal>
        </>

    );
};

export default Login;