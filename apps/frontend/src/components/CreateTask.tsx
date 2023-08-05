import React, { useState } from 'react';

interface CreateTaskProps {
    employeeId: number | undefined;
    onSave: (dueDate: string, text:string) => void;
    onCancel: () => void;
}

export const CreateTask: React.FC<CreateTaskProps> = ({ onSave, onCancel }) => {
    const [taskText, setTaskText] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSaveClick = () => {
        // const newTask: Task = {
        //     id: Date.now(),
        //     text: taskText,
        //     dueDate: new Date(dueDate),
        //     creationDate: new Date(),
        // };

        onSave(dueDate,taskText);
    };

    return (
        <div>
            <h2>Add New Task</h2>
            <label>
                Task Text:
                <input type="text" value={taskText} onChange={(e) => setTaskText(e.target.value)} />
            </label>
            <br />
            <label>
                Due Date:
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </label>
            <br />
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};
