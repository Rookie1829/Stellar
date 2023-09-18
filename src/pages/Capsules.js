import React, { useState, useEffect } from 'react';

export default function Capsules() {
    const [capsules, setCapsules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState('all');

    useEffect(() => {
        fetch('https://api.spacexdata.com/v4/capsules')
            .then(response => response.json())
            .then(data => {
                setCapsules(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching SpaceX capsules data:", error);
                setLoading(false);
            });
    }, []);

    const filteredCapsules = selectedType === 'all' 
        ? capsules 
        : capsules.filter(capsule => capsule.type === selectedType);

        return (
            <div className="bg-space-gradient min-h-screen text-white p-6 flex flex-col items-start">
                <div className="self-center mb-8">
                    <h1 className="text-4xl mb-6 font-bold">Capsules</h1>
            
                    <label htmlFor="type" className="block mb-4 font-semibold">Select Capsule Type</label>
                    <select 
                        id="type" 
                        value={selectedType} 
                        onChange={e => setSelectedType(e.target.value)}
                        className="bg-zinc-900 text-white p-2 rounded mb-6 text-center p-2 w-44"
                    >
                        <option value="all">All Types</option>
                        <option value="Dragon 1.0">Dragon 1.0</option>
                        <option value="Dragon 1.1">Dragon 1.1</option>
                        <option value="Dragon 2.0">Dragon 2.0</option>
                    </select>
                </div>
            
                {loading ? (
                    <div className="bg-blue-500 p-4 rounded-md max-w-md mx-auto mt-4">
                        <p>Loading...</p>
                    </div>
                ) : (
                    <div className="flex justify-center w-full"> 
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full md:max-w-4xl"> 
                            {filteredCapsules.map(capsule => (
                                <div key={capsule.id} className="bg-zinc-900 p-4 rounded-md shadow-lg mt-6">
                                    <h2 className="text-2xl font-semibold mb-2">{capsule.type}</h2>
                                    <p className="mb-1">
                                        Status: 
                                        <span className={`ml-2 ${capsule.status === "retired" ? "text-red-500" : capsule.status === "active" ? "text-green-500" : ""}`}>
                                            {capsule.status}
                                        </span>
                                    </p>
                                    <p className="mb-1">Serial: {capsule.serial}</p>
                                    <p className="mb-1">Reuse Count: {capsule.reuse_count}</p>
                                    <p className="mb-1">Water Landings: {capsule.water_landings}</p>
                                    <p className="mb-1">Land Landings: {capsule.land_landings}</p>
                                    <p className="mb-1">Last Update: {capsule.last_update || 'Not available'}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
}
