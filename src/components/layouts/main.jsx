import {Outlet, Link} from 'react-router-dom';


function MainLayout() {
    return (
        <div>
            <div>MY NAV BAR</div>
            <ul>
            <li><Link to={'/'}>Home</Link> </li>
                <li><Link to={'about'}>About</Link> </li>
                <li><Link to={'listings'}>listing</Link> </li>
            </ul>
            <Outlet />
        </div>
    )
}

export default MainLayout; 