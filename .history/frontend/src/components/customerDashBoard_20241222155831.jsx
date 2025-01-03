import { useEffect, useState } from "react";

function CustomerDashboard() {
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
            {user ? <h1>Welcome, {user.first_name}!</h1> : <h1>Welcome to Foodly!</h1>}
        </div>
    );
}

export default CustomerDashboard;
