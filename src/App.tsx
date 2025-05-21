import React, { useEffect, useState } from "react";
import "./App.css";
import { Interest } from "./interfaces/interest";

function App() {
    const [interests, setInterests] = useState<Interest[]>([]);

    useEffect(() => {
        fetch("/api/interests")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch interests");
                }
                return response.json();
            })
            .then((data) => {
                setInterests(data);
            })
            .catch((error) => {
                console.error("Error fetching interests:", error);
            });
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Mocked API Response</h1>
                <ul>
                    {interests.length > 0 ? (
                        interests.map((interest) => (
                            <li key={interest.id}>{interest.name}</li>
                        ))
                    ) : (
                        <li>Loading...</li>
                    )}
                </ul>
            </header>
        </div>
    );
}

export default App;
