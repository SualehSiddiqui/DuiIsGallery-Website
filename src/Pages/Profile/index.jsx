import './style.css';
import { useContext, useEffect, useState } from 'react';
import { Navbar, Footer } from "../../Components";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../Context/User/userContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Image, Modal } from 'antd';

const CustomTabs = styled(Tabs)(({ theme }) => ({
    '& .MuiTabs-indicator': {
        backgroundColor: '#887837', // Underline color
    },
    '& .MuiTab-root': {
        color: 'grey', // Default text color
    },
    '& .MuiTab-root.Mui-selected': {
        color: '#887837', // Active text color
    },
}));

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
};

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

const Profile = ({ setShowSpinner }) => {
    const { user, setUser } = useContext(UserContext);
    const userDetails = localStorage.getItem('user');
    const userObj = user && (typeof user === 'string' ? JSON.parse(user) : '');
    //token
    const token = localStorage.getItem('token');
    const tokenValue = token ? token.slice(1, token.length - 1) : "";
    const navigate = useNavigate();

    useEffect(() => {
        if (!userDetails) {
            navigate('/login')
        }
    }, [user]);

    const [value, setValue] = useState(0);
    const [email, setEmail] = useState(userObj.email);
    const [phone, setPhone] = useState(userObj.phone);
    const [firstName, setFirstName] = useState(userObj.firstName);
    const [lastName, setLastName] = useState(userObj.lastName);
    const [orders, setOrders] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState({});

    const handleClose = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const reset = () => {
        setEmail("");
        setFirstName("");
        setLastName("");
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSubmit = () => {
        setShowSpinner(true);
        const updatedUser = {
            email,
            firstName,
            lastName,
            phone
        }
        const url = `${import.meta.env.VITE_SERVER_API_URL}auth/updateUser/${userObj._id}/false`
        axios.post(url, updatedUser, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenValue}`
            }
        })
            .then(res => {
                setUser(res.data.data);
                localStorage.setItem('user', JSON.stringify(res.data.data));
                reset();
                Swal.fire({
                    icon: "success",
                    title: "Updated...",
                    text: res?.data?.message,
                });
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
            .finally(() => {
                setShowSpinner(false);
            })

    };


    const logout = () => {
        localStorage.removeItem('user');
        setUser({});
    };

    const getOrder = () => {
        axios.get(`${import.meta.env.VITE_SERVER_API_URL}/order/specificUser/${userObj._id}`)
            .then(res => {
                setOrders(res.data.order)
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

    useEffect(() => {
        getOrder()
    }, []);

    return (
        <>
            <Navbar />
            <Container className='profile-container' >
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ border: 1, borderTop: 'none', borderRadius: '8px', height: '60px', borderColor: 'divider' }}>
                        <CustomTabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                            textColor="golden"
                            indicatorColor="golden"
                        >
                            <Tab label="Dashboard" {...a11yProps(0)} />
                            <Tab label="Details" {...a11yProps(1)} />
                            <Tab label="Orders" {...a11yProps(2)} />
                        </CustomTabs>
                    </Box>
                    <CustomTabPanel sx={{ padding: '0px' }} value={value} index={0}>
                        <h3>
                            Hello, Sualeh {user.firstName} {user.lastName}
                        </h3>
                        <h5 className='mt-3 mb-3'>
                            Account Details
                        </h5>
                        <div className='account-details'>
                            <div>
                                <div>
                                    <strong>Name:</strong>
                                </div>
                                <div>
                                    {userObj.firstName} {userObj.lastName}
                                </div>
                            </div>
                            <div>
                                <div>
                                    <strong>Email:</strong>
                                </div>
                                <div>
                                    {userObj.email}
                                </div>
                            </div>
                            <div>
                                <div>
                                    <strong>Phone:</strong>
                                </div>
                                <div>
                                    {userObj.phone}
                                </div>
                            </div>
                        </div>
                        <Button
                            className='me-auto mt-3 p-3'
                            variant="outline-danger"
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <div className='account-details'>
                            <div>
                                <div>
                                    <strong>First Name:</strong>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder='Enter Your First Name'
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <strong>Last Name:</strong>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder='Enter Your Last Name'
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <strong>Email:</strong>
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        placeholder='Enter Your Email'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <strong>Phone:</strong>
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        placeholder='Enter Your Phone'
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <Button onClick={handleSubmit} className='me-auto mt-3 p-3' variant="outline-success">Update</Button>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <TableContainer component={Paper} sx={{ width: '100%' }}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Order Number</TableCell>
                                        <TableCell>Order Status</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Order Placed On</TableCell>
                                        <TableCell>Item Details</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders.map((v, i) => {
                                        const date = new Date(v.createdAt).toLocaleDateString();
                                        return (
                                            <TableRow
                                                key={i}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {v._id}
                                                </TableCell>
                                                <TableCell>{v.status}</TableCell>
                                                <TableCell>Rs {v.totalAmount.toLocaleString('en-PK')}</TableCell>
                                                <TableCell>{date}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="outline-secondary"
                                                        onClick={() => {
                                                            setSelectedOrder(v)
                                                            setOpen(true)
                                                        }}
                                                    >View Details</Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CustomTabPanel>
                </Box>
            </Container>

            <Modal
                title={'Order Details'}
                open={open}
                onCancel={handleClose}
                width={'900px'}
                footer={false}
            >
                <div className="modal-main-div">
                    <h1>
                        Order Details
                    </h1>
                    <div className="modal-order-details-div">
                        <div>
                            <h4>Order Id:</h4>
                            <p>
                                {selectedOrder._id}
                            </p>
                            <h4>Order Date:</h4>
                            <p>
                                {selectedOrder.createdAt && (new Date(selectedOrder.createdAt).toLocaleDateString())}
                            </p>
                        </div>
                        <div>
                            <h4>Total Amount:</h4>
                            <p>
                                Rs {selectedOrder.totalAmount && selectedOrder.totalAmount.toLocaleString('en-PK')}
                            </p>
                            <h4>Order Status:</h4>
                            <p>
                                {selectedOrder.status}
                            </p>
                        </div>
                    </div>
                    <div className="modal-order-products-div">
                        <table style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th style={{ width: '6%' }}>
                                        S.No.
                                    </th>
                                    <th style={{ width: '18%' }}>
                                        Product SKU
                                    </th>
                                    <th style={{ width: '36%' }}>
                                        Product Name
                                    </th>
                                    <th style={{ width: '7%' }}>
                                        Size
                                    </th>
                                    <th style={{ width: '12%' }}>
                                        Amount
                                    </th>
                                    <th style={{ width: '8%' }}>
                                        Quantity
                                    </th>

                                    <th style={{ width: '13%' }}>
                                        Total Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    selectedOrder.items && selectedOrder.items.map((v, i) => {
                                        return (
                                            <tr key={i + 1}>
                                                <td>
                                                    {i + 1}
                                                </td>
                                                <td>
                                                    {v.item._id}
                                                </td>
                                                <td className="product-img-div">
                                                    <div>
                                                        <Image
                                                            src={v.item.imgUrl[0]}
                                                            alt="img"
                                                            width={'40px'}
                                                            height={'55px'}
                                                        />
                                                    </div>
                                                    <span>{v.item.name}</span>
                                                </td>
                                                <td>
                                                    {v.size}
                                                </td>
                                                <td>
                                                    Rs {v.item.price.toLocaleString('en-PK')}
                                                </td>
                                                <td>
                                                    {v.quantity}
                                                </td>
                                                <td>
                                                    Rs {v.totalPrice.toLocaleString('en-PK')}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal>
            <Footer />
        </>
    );
};

export default Profile;