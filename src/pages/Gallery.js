import React, { useState } from 'react';
import axios from 'axios';

function Gallery() {
    const [query, setQuery] = useState('');
    const [limit, setLimit] = useState(10);
    const [results, setResults] = useState([]);

    const search = async () => {
        try {
            const response = await axios.get(`https://images-api.nasa.gov/search`, {
                params: {
                    q: query,
                    media_type: 'image',
                }
            });

            let items = response.data.collection.items;

            items = items.filter(item => 
                item.data[0].title.toLowerCase().includes(query.toLowerCase()) || 
                item.data[0].description.toLowerCase().includes(query.toLowerCase())
            );

            setResults(items.slice(0, limit));
        } catch (error) {
            console.error("Error fetching data:", error.response?.data || error.message);
        }
    }

    return (
        <div className="bg-space-gradient min-h-screen text-white p-6 flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-6 text-center">NASA Image Search</h1>

            <div className="flex flex-wrap justify-center mb-6 space-y-4 md:space-y-0 space-x-4">
                <input 
                    className="w-64 p-2 bg-zinc-900 text-white border rounded md:mr-2"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Type here to search NASA images..."
                />

                <select 
                    className="w-40 p-2 bg-zinc-900 text-white border rounded mb-2 md:mb-0 md:mr-2" 
                    value={limit}
                    onChange={e => setLimit(e.target.value)}
                >
                    <option value="10">10 Results</option>
                    <option value="20">20 Results</option>
                    <option value="30">30 Results</option>
                </select>

                <button className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded w-40 transition-colors duration-300" onClick={search}>
                    Search
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-screen-xl">
                {results.map((item, index) => (
                    <div key={index} className="mb-4 bg-zinc-900 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                        <h2 className="text-xl font-semibold mb-2 break-words">{item.data[0].title}</h2>
                        <img className="w-full rounded-t-xl h-55 object-cover mb-4" src={item.links[0].href} alt={item.data[0].description} />
                        <p className="text-sm mb-2 break-words">{item.data[0].description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Gallery;
