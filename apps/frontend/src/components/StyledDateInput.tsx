import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import React from "react";

// Styled component based on MUI TextField
const StyledDateInput = styled(TextField)`
  width: 10rem;
  
  .MuiInputBase-root {
    background-color: white;
    
    &:hover {
      
    }

    &:focus-within {
      
      box-shadow: 0 0 0 1px #1976d2;
    }
  }

  .MuiInput-input[type='date'] {
    padding: 0;
  }
`;

interface MUIDateInputProps {
    value: string; // The current selected date value
    onChange: (value: any) => void; // Function to update the selected date value
}

const DateInput: React.FC<MUIDateInputProps> = ({value, onChange}) => {
    return (
        <StyledDateInput
            value={value}
            onChange={(e)=>onChange(e.target.value)}
            label="Date"
            type="date"
            defaultValue="2023-08-04"
            InputLabelProps={{
                shrink: true,
            }}
        />
    );
};

export default DateInput;
