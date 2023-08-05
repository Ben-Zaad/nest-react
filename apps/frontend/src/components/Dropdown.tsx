import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';

interface DropdownProps {
    value: string;
    setValue: (text: string) => void;
    label: string;
}

export const Dropdown: React.FC<DropdownProps> =
    ({value, setValue, label}) => {
        const handleChange = (event: SelectChangeEvent) => {
            console.log('EVENT',event)
            setValue(event.target.value as string);
        };

        console.log('VALUE',value)

        return (
            <Box sx={{minWidth: 120}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={''}
                        label={label}
                        onChange={handleChange}
                    >
                        <MenuItem value={"Pending"}>Pending</MenuItem>
                        <MenuItem value={"Accepted"}>Accepted</MenuItem>
                        <MenuItem value={"Rejected"}>Rejected</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        );
    }