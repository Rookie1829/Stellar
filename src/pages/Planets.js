import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Planets() {
    const [planets, setPlanets] = useState([]);
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://planets-info-by-newbapi.p.rapidapi.com/api/v1/planets/',
            headers: {
                'X-RapidAPI-Key': '0619cd97b9msh7fdaf2d8daa9277p1e747fjsne8b4ab808c3c',
                'X-RapidAPI-Host': 'planets-info-by-newbapi.p.rapidapi.com'
            }
        };

        axios.request(options)
            .then(response => {
                setPlanets(response.data);
                setSelectedPlanet(response.data[0]); 
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handlePlanetChange = (e) => {
        const planetId = parseInt(e.target.value);
        setSelectedPlanet(planets.find(p => p.id === planetId));
    };

    return (
        <div className="bg-space-gradient min-h-screen text-white p-6 flex flex-col items-start">
            <div className="self-center mb-6"> 
                <h1 className="text-4xl font-bold">Planets</h1>
            </div>

            {loading ? (
                <div className="bg-blue-500 p-4 rounded-md max-w-md mx-auto mt-4">
                    <p>Loading...</p>
                </div>
            ) : error ? (
                <div className="bg-red-500 p-4 rounded-md max-w-md mx-auto mt-4">
                    <p>Error: {error}</p>
                </div>
            ) : (
                <>
                    <div className="w-full max-w-lg mb-6 self-center">
                        <label htmlFor="planet-select" className="block mb-2 font-semibold">Choose a Planet:</label>
                        <select 
                            id="planet-select" 
                            className="w-full p-2 bg-zinc-900 text-white rounded"
                            value={selectedPlanet?.id}
                            onChange={handlePlanetChange}
                        >
                            {planets.map(planet => (
                                <option key={planet.id} value={planet.id}>
                                    {planet.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedPlanet && (
                        <div className="bg-zinc-900 p-4 rounded-md shadow-lg mt-6 max-w-xl mx-auto">
                            <img src={selectedPlanet.imgSrc.img} alt={selectedPlanet.imgSrc.imgDescription} className="w-full rounded-t-md h-55 object-cover mb-4" />
                            <h2 className="text-2xl font-semibold mb-2">{selectedPlanet.name}</h2>
                            <p className="text-sm mb-2">{selectedPlanet.description}</p>
                            <p>Order: {selectedPlanet.planetOrder}</p>
                            <p>Volume: {selectedPlanet.basicDetails.volume}</p>
                            <p>Mass: {selectedPlanet.basicDetails.mass}</p>
                            <p>Source: <a href={selectedPlanet.source} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500 underline">Link</a></p>
                            <p>Wikipedia: <a href={selectedPlanet.wikiLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500 underline">Link</a></p>
                            <p className="italic">{selectedPlanet.imgSrc.imgDescription}</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
