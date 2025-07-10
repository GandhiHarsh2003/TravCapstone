import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const {name, setName} = useState("");
    const navigate = useNavigate();

    const handleSearch = async (event) => {
        event.preventDefault();
        navigate('/SearchResults', {person : name});
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <FormLabel>Search</FormLabel>
                <TextField size="medium" id="outlined-basic" variant="outlined" placeholder="Start Searching..." value={name} onChange={setName}/>
            </form>
        </div>
    );
};

export default Home;