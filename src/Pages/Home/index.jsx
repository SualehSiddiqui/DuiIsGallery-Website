import Hero from "../../Section/Hero";
import Section2 from "../../Section/Section2";
import Section3 from "../../Section/Section3";
import { Navbar, Footer, MoveToTop } from "../../Components";
import axios from "axios";
import { useEffect, useState } from "react";
import Testimonials from "../../Section/Testmonials";

const Home = ({ setShowSpinner }) => {
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [data, setData] = useState([]);

    const getCategoryName = (status) => {
        const url = `${import.meta.env.VITE_SERVER_API_URL}/category/${status}`;
        axios.get(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                setCategoryOptions(res.data.data);
            })
            .catch(error => {
                // Error handler
                if (error.response) {
                    console.log('Error response:', error.response.data);
                } else if (error.request) {
                    console.log('Error request:', error.request);
                } else {
                    console.log('Error message:', error.message);
                }
            });
    };

    const handleSearch = async (categoryName) => {
        let obj = {
            category: categoryName.toLowerCase(),
            filter: {}
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_API_URL}/item/search`, obj, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data.data;
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

    const fetchAllData = async () => {
        // Use Promise.all to handle all Promises
        try {
            setShowSpinner(true);
            // Create an array of Promises based on categoryOptions
            const promises = categoryOptions.map(category => handleSearch(category.name)); // Assuming category object has a 'name' property

            const results = await Promise.all(promises);
            setData(results); // Store results in the main data array
        } catch (error) {
            // Error handler
            if (error.response) {
                console.log('Error response:', error.response.data);
            } else if (error.request) {
                console.log('Error request:', error.request);
            } else {
                console.log('Error message:', error.message);
            }
        } finally {
            setShowSpinner(false);
        }
    };

    useEffect(() => {
        getCategoryName(true);
    }, []);

    useEffect(() => {
        if (categoryOptions.length > 0) {
            fetchAllData();
        }
    }, [categoryOptions]);

    return (
        <>
            <Navbar />
            <Hero />
            <Section2 />
            {
                data.map((v, i) => {
                    return (
                        v && v.length > 0 ?
                            <Section3
                                key={i}
                                hd={v[0].category}
                                data={v}
                                btnLink={`/collection/${v[0].category.replaceAll(' ', '_')}`}
                            /> : ''
                    )
                })
            }
            <Testimonials />
            <MoveToTop />
            <Footer />
        </>
    );
};

export default Home;