import React, {useState} from 'react';
import {TextField} from "@mui/material";
import styled from "styled-components";
import {Row} from "./styledComponents";
import {Dropdown} from "./Dropdown";

interface CreateReportProps {
    createReport: (text: string, status: string) => void;
    // onSaveStatus: (status: Status) => void;
    onCancel: () => void;
}

export const CreateReport: React.FC<CreateReportProps> = ({createReport, onCancel}) => {
    const [reportText, setReportText] = useState('');
    const [status, setStatus] = useState("Pending");

    const handleSaveClick = () => {
        createReport(reportText, status);
    };

    return (
        <div>
            <h2>Add New Report</h2>
            <RowContainer>
                <h4>
                    Task Text:
                    <TextField
                        style={{width: '30rem'}}
                        required
                        value={reportText}
                        onChange={(e) => setReportText(e.target.value)}
                        id="outlined-required"
                        label="Required"
                        placeholder="Task Description"
                    />
                </h4>
            </RowContainer>
            <br/>
            <Dropdown value={status} setValue={setStatus} label={'Status'}/>
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};


const RowContainer = styled(Row)`
  justify-content: center;
`