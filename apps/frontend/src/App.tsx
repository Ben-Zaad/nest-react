import {useEffect, useState} from 'react'
import './App.css'
import EmployeeListPage from "./pages/EmployeeListPage";

function App() {
    const [, setGreeting] = useState('')

    useEffect(() => {
        fetch('/api').then(
            (res) => res.text()
        ).then(setGreeting)
    }, [])

    return (
        <>
            <EmployeeListPage />
        </>
    )
}

export default App
