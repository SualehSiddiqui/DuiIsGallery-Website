import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';

const minDistance = 1000;

export default function MinimumDistanceSlider({ priceRange, setPriceRange }) {
    const [value1, setValue1] = useState([1000, 100000]);
    useEffect(() => {
        if (priceRange) {
            setValue1([...priceRange])
        }
    }, [priceRange])

    const handleChange1 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
            setPriceRange([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
        } else {
            setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
            setPriceRange([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
        }
    };

    return (
        <Box sx={{ width: 300 }}>
            <Slider
                getAriaLabel={() => 'Minimum distance'}
                value={value1}
                onChange={handleChange1}
                valueLabelDisplay="auto"
                // getAriaValueText={valuetext}
                disableSwap
                min={1000}
                max={100000}
            />
            <div style={{ width: "100%", marginTop: "20px" }}>
                <TextField
                    // disabled
                    id="outlined-disabled"
                    label="Min Price"
                    defaultValue="Hello World"
                    sx={{ width: "50%" }}
                    value={value1[0]}
                />
                <TextField
                    sx={{ width: "50%" }}
                    // disabled
                    id="outlined-disabled"
                    label="Max Price"
                    value={value1[1]}
                />
            </div>
        </Box>
    );
};