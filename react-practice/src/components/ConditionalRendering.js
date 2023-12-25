import AdminDashboard from "./AdminDashboard";

export default function ConditionalRendering() {
    let isLoggedIn = true;
    let isAdmin = true;

    return(
        <>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact Us</li>
                {
                    isLoggedIn?(<li>Login</li>):(<li>Logged Out</li>)
                }
                {
                    isAdmin && <AdminDashboard />
                }
            </ul>
        </>
    )
}