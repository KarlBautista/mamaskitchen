import { useEffect, useState } from "react";

function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user data from local storage
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <div>
            <h1>Account Settings</h1>
            {user ? (
                <div>
                    <p>First Name: {user.first_name}</p>
                    {/* Add more user info here if needed */}
                </div>
            ) : (
                <p>No user information available. Please log in.</p>
            )}
        </div>
    );
}

export default function Profile() {
;
