import React, { useState, useEffect } from 'react';

export default function Crew() {
    const [crew, setCrew] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAgency, setSelectedAgency] = useState('all');

    useEffect(() => {
        fetch('https://api.spacexdata.com/v4/crew')
            .then(response => response.json())
            .then(data => {
                setCrew(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching SpaceX crew data:", error);
                setLoading(false);
            });
    }, []);

    const filteredCrew = selectedAgency === 'all' 
        ? crew 
        : crew.filter(member => member.agency === selectedAgency);

    return (
        <div className="bg-space-gradient min-h-screen text-white p-6 flex flex-col items-start">
            <div className="self-center mb-8"> 
                <h1 className="text-4xl mb-6 font-bold pl-10">Crew</h1>

                <label htmlFor="agency" className="block mb-4 font-semibold pl-6">Select Agency</label>
                <select 
                    id="agency" 
                    value={selectedAgency} 
                    onChange={e => setSelectedAgency(e.target.value)}
                    className="bg-zinc-900 text-white p-2 rounded mb-6 text-center w-44"
                >
                    <option value="all">All</option>
                    <option value="NASA">NASA</option>
                    <option value="SpaceX">SpaceX</option>
  
                </select>
            </div>

            {loading ? (
                <div className="bg-blue-500 p-4 rounded-md max-w-md mx-auto mt-4">
                    <p>Loading...</p>
                </div>
            ) : (
                <div className="flex justify-center w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full md:max-w-4xl"> 
                        {filteredCrew.map(member => (
                            <div key={member.id } className="bg-zinc-900 p-4 rounded-md shadow-lg mt-6">
                                <h2 className="text-2xl font-semibold mb-2">{member.name}</h2>
                                <p className="mb-1">Agency: {member.agency}</p>
                                <p className="mb-1">Status: {member.status}</p>
                                <p className="mb-2">
                                    Image: 
                                    <img src={member.image} alt={member.name} className="mt-2 w-32 h-32 rounded-full" />
                                </p>
                                <p className="mb-1">
                                    Wikipedia: 
                                    <a href={member.wikipedia} target="_blank" rel="noreferrer" className="text-blue-400">Link</a>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
