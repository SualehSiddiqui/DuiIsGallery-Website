import { Link, useParams } from "react-router-dom";
import "./style.css";
import { BsGridFill, BsGrid3X3GapFill } from "react-icons/bs";
import { TfiLayoutColumn4Alt } from "react-icons/tfi";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaSquare } from "react-icons/fa";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { ImCross } from "react-icons/im";
import { Slider, Button, Navbar, Footer } from "../../Components";
import axios from "axios";

const Collection = ({ setShowSpinner }) => {
    const { name } = useParams();
    const [gridStyle, setGridStyle] = useState('3x3');
    const [sortDropDown, setSortDropDown] = useState(false);
    const [priceDropDown, setPriceDropDown] = useState(false);
    const [data, setData] = useState([]);

    const [sort, setSort] = useState('featured');
    const [priceRange, setPriceRange] = useState([1000, 100000]);

    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleSearch = async (categoryName) => {
        setShowSpinner(true);
        let obj;
        if (categoryName.toLowerCase() == 'new arrival' || categoryName.toLowerCase() == 'special offer') {
            obj = {
                filter: {
                    sort,
                    price: {
                        minPrice: priceRange[0] ? priceRange[0] : 1000,
                        maxPrice: priceRange[1] ? priceRange[1] : 100000
                    },
                }
            };
        } else {
            obj = {
                category: categoryName.toLowerCase(),
                filter: {
                    sort,
                    price: {
                        minPrice: priceRange[0] ? priceRange[0] : 1000,
                        maxPrice: priceRange[1] ? priceRange[1] : 100000
                    },
                }
            };

        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_API_URL}/item/search`, obj, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setData(response.data.data);
            setShowSpinner(false);
        } catch (error) {
            // Error handler
            if (error.response) {
                console.log('Error response:', error.response.data);
            } else if (error.request) {
                console.log('Error request:', error.request);
            } else {
                console.log('Error message:', error.message);
            }
        }
    };

    const DrawerList = (
        <Box sx={{ width: "350px" }} role="presentation">
            <List >
                <ListItem
                    style={{
                        display: "flex",
                        justifyContent: "space between",
                    }}
                >
                    <ListItemButton>
                        <h1>Filters</h1>
                    </ListItemButton>
                    <ListItemButton
                        style={{
                            width: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                        onClick={toggleDrawer(false)}
                    >
                        <ImCross />
                    </ListItemButton>
                </ListItem>
                <Divider sx={{ backgroundColor: "black", height: "2px" }} />
                {/* <ListItem
                    className="availablity-item"
                    onClick={() => { availDropDown ? setAvailDropDown(false) : setAvailDropDown(true) }}
                    style={{
                        display: "flex",
                        justifyContent: "space between",
                    }}
                >
                    <ListItemButton
                        sx={{ height: "50px" }}
                    >
                        Availability
                        {!availDropDown && <IoIosArrowDown
                            className="sort-icon"

                        />}
                        {availDropDown && <IoIosArrowUp
                            className="sort-icon"
                        />}
                    </ListItemButton>
                </ListItem>
                {availDropDown && <ListItem
                    className="availablity-item"
                // onClick={() => { sortDropDown ? setSortDropDown(false) : setSortDropDown(true) }}
                >
                    <ListItemButton
                        sx={{ height: "50px" }}
                    >
                        <Switch {...label} /> Available in stock
                    </ListItemButton>
                </ListItem>}

                <Divider sx={{ backgroundColor: "black", height: "2px" }} /> */}

                <ListItem
                    className="availablity-item"
                    onClick={() => { priceDropDown ? setPriceDropDown(false) : setPriceDropDown(true) }}
                >
                    <ListItemButton
                        sx={{ height: "50px" }}
                    >
                        Price
                        {!priceDropDown && <IoIosArrowDown
                            className="sort-icon"

                        />}
                        {priceDropDown && <IoIosArrowUp
                            className="sort-icon"
                        />}
                    </ListItemButton>
                </ListItem>
                {priceDropDown && <ListItem
                    className="availablity-item"
                >
                    <ListItemButton
                        sx={{ padding: "10px 10px" }}
                    >
                        <Slider priceRange={priceRange} setPriceRange={setPriceRange} />
                    </ListItemButton>
                </ListItem>}
                <Divider sx={{ backgroundColor: "black", height: "2px" }} />
                <ListItem>
                    <Button title={'View Result'} onClick={e => handleSearch(pageName)} style={{ width: "100%" }} />
                </ListItem>
            </List>
        </Box>
    );

    let cardClassName;

    if (gridStyle === '1x1') {
        cardClassName = 'card-div-1';
    } else if (gridStyle === '2x2') {
        cardClassName = 'card-div-2';
    } else if (gridStyle === '3x3') {
        cardClassName = 'card-div-3';
    } else if (gridStyle === '6x6') {
        cardClassName = 'card-div-6';
    };

    let pageName = name.replaceAll("_", " ");

    useEffect(() => {
        handleSearch(pageName)
    }, [pageName, sort]);

    const [hoveredCards, setHoveredCards] = useState({});

    const handleMouseEnter = (id) => {
        setHoveredCards((prev) => ({ ...prev, [id]: true }));
    };

    const handleMouseLeave = (id) => {
        setHoveredCards((prev) => ({ ...prev, [id]: false }));
    };


    return (
        <>
            <Navbar />
            <Drawer anchor={"right"} placement="right" open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
            <Container>
                <h1 className="page-hd">{pageName}</h1>
            </Container>
            <div className="collectionpage-sec2">
                <div className="grids-div">
                    <BsGridFill
                        className={`grid-icons  ${gridStyle === '2x2' ? 'active-icons' : ''}`}
                        onClick={() => setGridStyle('2x2')}
                    />
                    <BsGrid3X3GapFill
                        className={`grid-icons  ${gridStyle === '3x3' ? 'active-icons' : ''}`}
                        onClick={() => setGridStyle('3x3')}
                    />
                    <TfiLayoutColumn4Alt
                        className={`grid-icons layout-icon ${gridStyle === '6x6' ? 'active-icons' : ''}`}
                        onClick={() => setGridStyle('6x6')}
                    />
                </div>
                <div className="quantity-div">
                    {
                        data.length > 0 ?
                            `${data.length} Products`
                            :
                            `No Products`
                    }
                </div>
                <div
                    className="sort-div"
                    onClick={() => { sortDropDown ? setSortDropDown(false) : setSortDropDown(true) }}
                >
                    sort By
                    {!sortDropDown && <IoIosArrowDown
                        className="sort-icon"

                    />}
                    {sortDropDown && <IoIosArrowUp
                        className="sort-icon"
                    />}
                    {sortDropDown && <div className="drop-down-div">
                        <ul>
                            <li className={sort === 'featured' && "active-sort"} onClick={e => setSort('featured')}>
                                Featured
                            </li>
                            <li className={sort === 'date-old-to-new' && "active-sort"} onClick={e => setSort('date-old-to-new')}>
                                Date Old-New
                            </li>
                            <li className={sort === 'date-new-to-old' && "active-sort"} onClick={e => setSort('date-new-to-old')}>
                                Date New-Old
                            </li>
                            <li className={sort === 'alphabetically-a-to-z' && "active-sort"} onClick={e => setSort('alphabetically-a-to-z')}>
                                Alphabetically A-Z
                            </li>
                            <li className={sort === 'alphabetically-z-to-a' && "active-sort"} onClick={e => setSort('alphabetically-z-to-a')}>
                                Alphabetically Z-A
                            </li>
                            <li className={sort === 'alphabetically-low-to-high' && "active-sort"} onClick={e => setSort('alphabetically-low-to-high')}>
                                Price low to high
                            </li>
                            <li className={sort === 'alphabetically-high-to-low' && "active-sort"} onClick={e => setSort('alphabetically-high-to-low')}>
                                Price  high to low
                            </li>
                        </ul>
                    </div>}
                </div>
                <div className="filter-div" onClick={toggleDrawer(true)} >
                    Filter
                </div>
            </div >
            <div className="collectionpage-sec3">
                <div
                    className="res-sort-div sort-div"
                    onClick={() => { sortDropDown ? setSortDropDown(false) : setSortDropDown(true) }}
                >
                    sort By
                    {!sortDropDown && <IoIosArrowDown
                        className="sort-icon"

                    />}
                    {sortDropDown && <IoIosArrowUp
                        className="sort-icon"
                    />}
                    {sortDropDown && <div className="res-drop-down-div drop-down-div">
                        <ul>
                            <li>
                                Featured
                            </li>
                            <li>
                                Date Old-New
                            </li>
                            <li>
                                Date New-Old
                            </li>
                            <li>
                                Alphabetically A-Z
                            </li>
                            <li>
                                Alphabetically Z-A
                            </li>
                            <li>
                                Price low to high
                            </li>
                            <li>
                                Price  high to low
                            </li>
                        </ul>
                    </div>}
                </div>
                <div className="res-filter-div filter-div" onClick={toggleDrawer(true)} >
                    Filter
                </div>
                <div className="res-grids-div grids-div">
                    <FaSquare
                        className={`grid-icons  ${gridStyle === '1x1' ? 'active-icons' : ''}`}
                        onClick={() => setGridStyle('1x1')}
                    />
                    <BsGridFill
                        className={`grid-icons  ${gridStyle === '2x2' ? 'active-icons' : ''}`}
                        onClick={() => setGridStyle('2x2')}
                    />
                </div>
            </div>
            <div className="cards-main-div">
                <Container className="cards-container">
                    {data.length !== 0 ? data.map((v, i) => (
                        <Link to={`/products/${v._id}`} className={`card-div ${cardClassName}`} key={v._id}>
                            {
                                !v.status &&
                                <div className="out-of-stock-hd">
                                    <h1>Out of Stock</h1>
                                </div>
                            }
                            <div
                                className={`card-img-div ${i !== 0 ? 'ms-2' : ''} ${hoveredCards[v._id] ? 'hovered' : ''}`}
                                onMouseEnter={() => handleMouseEnter(v._id)}
                                onMouseLeave={() => handleMouseLeave(v._id)}
                            >
                                <img
                                    src={v.imgUrl.length > 1 ? (hoveredCards[v._id] ? v.imgUrl[1].url : v.imgUrl[0].url) : v.imgUrl[0].url}
                                    alt="img"
                                />
                            </div>
                            <div className="details-div">
                                <span className="product-name">{v.name}</span>
                                <div className="prices-div">
                                    <span className="product-price">Rs {v.price && v.price.toLocaleString('en-PK')}</span>
                                    {
                                        v.discountPercentage > 0 ?
                                            <span>
                                                <span className="product-price-before-disc">Rs {v.priceBeforeDiscount && v.priceBeforeDiscount.toLocaleString('en-PK')}</span>
                                                <span className="product-disc-per"> -{v.discountPercentage}%</span>
                                            </span> :
                                            <></>
                                    }
                                </div>
                            </div>
                        </Link>
                    )) :
                        <h3>No Items Found</h3>
                    }
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default Collection;
