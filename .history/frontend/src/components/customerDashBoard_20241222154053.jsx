function CustomerDashBoard({ user }) {
    return (
        <div>
            {user ? (
                <h1>Welcome to your dashboard, {user.first_name}!</h1>
            ) : (
                <h1>Please log in to view your dashboard.</h1>
            )}
        </div>
    );
}

export default CustomerDashBoard;
