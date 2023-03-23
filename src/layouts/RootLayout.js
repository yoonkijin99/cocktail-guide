import { NavLink, Outlet } from "react-router-dom";
import './RootLayout.css';

const RootLayout = () => {
    return ( 
        <div className="root-layout">
                <nav className="nav-bar">
                        <h1>Let's Grab a Drink</h1>

                        <h2>
                            <NavLink to=''>Home</NavLink> 
                            <NavLink to='search'>Search</NavLink>
                        </h2>                           
                </nav>

                <Outlet />
        </div>
     );
}
 
export default RootLayout;