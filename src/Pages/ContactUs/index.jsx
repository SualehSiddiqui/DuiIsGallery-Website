import './style.css';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaXTwitter, FaWhatsapp } from 'react-icons/fa6';
import { IoMdMail } from 'react-icons/io';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { Footer, Navbar } from '../../Components';
import axios from 'axios';

const ContactUs = ({ setShowSpinner }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [message, setMessage] = useState('');

    const reset = () => {
        setName('');
        setEmail('');
        setGender('');
        setMessage('');
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        setShowSpinner(true);
        const feedback = {
            name,
            gender,
            email,
            message,
            approved: false
        };

        try {
            if (name && gender && email && message) {
                axios.post(`${import.meta.env.VITE_SERVER_API_URL}/testimonial/`, feedback, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(res => {
                        console.log(res.data);
                        reset();
                        Swal.fire({
                            icon: 'success',
                            title: 'Added..',
                            text: 'Testimonial Has Been Added'
                        })
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
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Please fill out all fields",
                });
                reset()
            }
        } catch (error) {
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
        } finally {
            setShowSpinner(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="feedback-main">
                <Container className="feedback-container">
                    {/* <h1 data-aos="fade-right" data-aos-duration={600}>Feedback Form</h1> */}
                    <div className="form">
                        <div className="contact-info">
                            <h3 className="title-1">Let's get in touch</h3>
                            <p className="text">
                                Have questions or need assistance? We're here to help! Contact us using the details below, and feel free to drop a review while you're at it.
                            </p>
                            <div className="info">
                                <div className="information">
                                    <IoMdMail className="icon" />
                                    <Link to={'mailto:info@ayetec.com'} style={{ textDecoration: 'none', color: 'black' }}>
                                        info@ayetec.com
                                    </Link>
                                </div>
                                <div className="information">
                                    <FaPhoneAlt className="icon" />
                                    <Link to={'tel:+13868469348'} style={{ textDecoration: 'none', color: 'black' }}>
                                        +1 (386) 846‑9348
                                    </Link>
                                </div>
                            </div>
                            <div className="social-media">
                                <p>Connect with us:</p>
                                <div className="social-icons">
                                    <Link to={'https://wa.me/13868469348'} target='_blank'>
                                        <FaWhatsapp />
                                    </Link>
                                    <Link to={"https://x.com/ArtistryModel?t=5LbTgHQD_9SU7DeSiQVrXA&s=09"} target='_blank'>
                                        <FaXTwitter />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="contact-form">
                            <span className="circle one" />
                            <span className="circle two" />
                            <form autoComplete="off" onSubmit={handleSubmit}>
                                <h3 className="title-2">Give us Your Feedback</h3>
                                <div className="input-container">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="input"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder='Enter your Name'
                                    />
                                </div>
                                <div className="input-container">
                                    <select
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="input"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        placeholder='Enter your Name'
                                    >
                                        <option value="">Select your Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div className="input-container">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="input"
                                        value={email}
                                        placeholder='Enter your Email'
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="input-container textarea">
                                    <textarea
                                        id="message"
                                        name="message"
                                        className="input"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder='Enter your Message'
                                    />
                                </div>
                                <input type="submit" value="Send" className="submit-button" />
                            </form>
                        </div>
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default ContactUs;