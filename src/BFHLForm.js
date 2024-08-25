import React, { useState } from 'react';
import axios from 'axios';

const BFHLForm = () => {
    const [inputData, setInputData] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error

        // Validate JSON format
        let jsonData;
        try {
            jsonData = JSON.parse(inputData);
        } catch (err) {
            setError('Invalid JSON format');
            return;
        }

        // Call the backend API
        try {
            const res = await axios.post('http://your-backend-url/bfhl', jsonData);
            setResponse(res.data);
        } catch (err) {
            setError('Error calling the backend API');
        }
    };

    const handleOptionChange = (option) => {
        setSelectedOptions((prevOptions) => {
            if (prevOptions.includes(option)) {
                return prevOptions.filter((opt) => opt !== option);
            } else {
                return [...prevOptions, option];
            }
        });
    };

    return (
        <div>
            <h1>Your Roll Number</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    placeholder='Enter JSON data here...'
                    rows='4'
                    cols='50'
                />
                <button type='submit'>Submit</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {response && (
                <div>
                    <h2>Response</h2>
                    <div>
                        <label>
                            <input
                                type='checkbox'
                                checked={selectedOptions.includes('alphabets')}
                                onChange={() => handleOptionChange('alphabets')}
                            />
                            Alphabets
                        </label>
                        <label>
                            <input
                                type='checkbox'
                                checked={selectedOptions.includes('numbers')}
                                onChange={() => handleOptionChange('numbers')}
                            />
                            Numbers
                        </label>
                        <label>
                            <input
                                type='checkbox'
                                checked={selectedOptions.includes('highest_lowercase_alphabet')}
                                onChange={() => handleOptionChange('highest_lowercase_alphabet')}
                            />
                            Highest lowercase alphabet
                        </label>
                    </div>
                    {selectedOptions.includes('alphabets') && (
                        <div>
                            <h3>Alphabets</h3>
                            <p>{response.alphabets.join(', ')}</p>
                        </div>
                    )}
                    {selectedOptions.includes('numbers') && (
                        <div>
                            <h3>Numbers</h3>
                            <p>{response.numbers.join(', ')}</p>
                        </div>
                    )}
                    {selectedOptions.includes('highest_lowercase_alphabet') && (
                        <div>
                            <h3>Highest Lowercase Alphabet</h3>
                            <p>{response.highest_lowercase_alphabet.join(', ')}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default BFHLForm;