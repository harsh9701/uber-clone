import './Tailwind.css';
import uberLogo from '../assets/uber-captain.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function CaptainLogin() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (event) => {
        setFormData((currData) => {
            return { ...currData, [event.target.name]: event.target.value };
        });
    }

    const submitHandler = (event) => {
        event.preventDefault();
        setFormData({
            email: "",
            password: ""
        })
    }

    return (
        <>
            <div className='p-7 h-screen flex flex-col justify-between'>
                <div>
                    <img className='w-16 mb-4 mt-[-5px]' src={uberLogo} alt="Uber Logo" />
                    <form onSubmit={submitHandler}>
                        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                        <input
                            type="email"
                            value={formData.email}
                            name='email'
                            onChange={handleInputChange}
                            className='bg-[#eeeeee] rounded px-4 py-2 mb-7 noborder w-full text-lg placeholder:text-base'
                            placeholder="email@example.com"
                            required />

                        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                        <input
                            type="password"
                            value={formData.password}
                            name='password'
                            onChange={handleInputChange}
                            className='bg-[#eeeeee] rounded px-4 py-2 mb-7 noborder w-full text-lg placeholder:text-base'
                            placeholder="Password"
                            required />
                        <button
                            className='bg-[#111] text-white font-semibold rounded px-4 py-2 mb-2 noborder w-full text-lg placeholder:text-base'
                        >
                            Login
                        </button>
                    </form>
                    <p className='text-center'>Join a fleet? <Link className='text-blue-600' to='/captain-signup'>Register as a Captain</Link></p>
                </div>
                <div>
                    <Link
                    to='/login'
                        className='bg-[#d5622d] flex items-center justify-center text-white font-semibold rounded px-4 py-2 mb-3 noborder w-full text-lg placeholder:text-base'
                    >
                        Sign in as User
                    </Link>
                </div>
            </div>
        </>
    )
}