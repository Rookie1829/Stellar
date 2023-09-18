import React, { useState, useEffect } from 'react';

export default function Payloads() {
    const [payloads, setPayloads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState('all');

    useEffect(() => {
        fetch('https://api.spacexdata.com/v4/payloads')
            .then(response => response.json())
            .then(data => {
                setPayloads(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching SpaceX payloads data:", error);
                setLoading(false);
            });
    }, []);

    const filteredPayloads = filterType === 'all' 
        ? payloads 
        : payloads.filter(payload => payload.type === filterType);


    const payloadTypes = Array.from(new Set(payloads.map(payload => payload.type))).filter(Boolean);

    return (
        <div className="bg-space-gradient min-h-screen text-white p-6 flex flex-col items-center"> 
            <h1 className="text-4xl mb-6 font-bold">Payloads</h1>

            <label htmlFor="payloadFilter" className="block mb-4 font-semibold pr-2">Filter by Type</label>
            <select 
                id="payloadFilter" 
                value={filterType} 
                onChange={e => setFilterType(e.target.value)}
                className="bg-zinc-900 text-white p-2 rounded mb-6"
            >
                <option value="all">All Types</option>
                {payloadTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>

            {loading ? (
                <div className="bg-blue-500 p-4 rounded-md max-w-md mt-4">
                    <p>Loading...</p>
                </div>
            ) : (
                <div className="flex justify-center w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full md:max-w-4xl"> 
                        {filteredPayloads.map(payload => (
                            <div key={payload.id} className="bg-zinc-900 p-4 rounded-md shadow-lg mt-6">
                                <h2 className="text-2xl font-semibold mb-2">{payload.name}</h2>
                                <p>Type: {payload.type || 'Unknown'}</p>
                                <p>Reused: {payload.reused ? 'Yes' : 'No'}</p>
                                <p>Customers: {payload.customers.join(', ')}</p>
                                <p>Nationalities: {payload.nationalities.join(', ')}</p>                      
                                <p>Orbit: {payload.orbit}</p>
                                <p>Reference System: {payload.reference_system}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
