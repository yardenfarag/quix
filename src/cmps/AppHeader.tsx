import React from 'react'
import { Link } from 'react-router-dom'

export const AppHeader = () => {
    return (
        <header className='app-header'>
            <div className=' flex between items-center'>
                <div className='flex center'>
                <div className="logo">
                    <h1>quix</h1>
                </div>
                <nav>
                    <ul className=' header-nav clean-list flex'>
                        <li><Link to='/website'>My Sites</Link></li>
                        <li><Link to='/website/1'>Wap Preview</Link></li>
                        <li><Link to='/website/1/edit'>Wap Edit</Link></li>
                    </ul>
                </nav>
                </div>
                <div className="login-signup clean-list flex">
                    <li><Link to='/login' className='login'>Log In</Link></li>
                    <li><Link to='/wap' className='get-started'>Get Started</Link></li>
                </div>
            </div>
        </header>
    )
}
