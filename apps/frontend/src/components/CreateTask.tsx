import React, { useState} from 'react';
import {TextField} from "@mui/material";
import DateInput from "./StyledDateInput";
import styled from "styled-components";
import {Row} from "./styledComponents";

interface CreateTaskProps {
    employeeId: number | undefined;
    onSave: (dueDate: string, text:string) => void;
    onCancel: () => void;
}

export const CreateTask: React.FC<CreateTaskProps> = ({ onSave, onCancel }) => {
    const [taskText, setTaskText] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSaveClick = () => {
        onSave(dueDate,taskText);
        onCancel()
    };

    return (
        <div>
            <h2>Add New Task</h2>
            <RowContainer>
            <h4>
                Task Text:
                <TextField
                    style={{width: '30rem'}}
                    required
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    id="outlined-required"
                    label="Required"
                    placeholder="Task Description"
                />
            </h4>
            </RowContainer>
            <br />
            <RowContainer>
            <h4>
                Due Date:
                <DateInput value={dueDate} onChange={(e) => {
                    setDueDate(e)
                }} />
            </h4>
            </RowContainer>
            <br />
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};


const RowContainer = styled(Row)`
  justify-content: center;
`