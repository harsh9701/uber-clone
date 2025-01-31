import './Tailwind.css';
import uberLogo from '../assets/uber-captain.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function CaptainSignup() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
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
            firstName: "",
            lastName: "",
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
                        <h3 className='text-lg font-medium mb-2'>What's your name</h3>
                        <div className='flex gap-2 mb-5'>
                            <input
                                type="text"
                                value={formData.firstName}
                                name='firstName'
                                placeholder='First Name'
                                onChange={handleInputChange}
                                className='bg-[#eeeeee] rounded w-1/2 px-4 py-2 noborder text-lg placeholder:text-base'
                                required />
                            <input
                                type="text"
                                value={formData.lastName}
                                name='lastName'
                                placeholder='Last Name'
                                onChange={handleInputChange}
                                className='bg-[#eeeeee] rounded w-1/2 px-4 py-2 noborder text-lg placeholder:text-base'
                                required />
                        </div>

                        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                        <input
                            type="email"
                            value={formData.email}
                            name='email'
                            onChange={handleInputChange}
                            className='bg-[#eeeeee] rounded px-4 py-2 mb-7 noborder w-full text-lg placeholder:text-base'
                            placeholder="uber@gmail.com"
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
                            Signup
                        </button>
                    </form>
                    <p className='text-center'>Already have an account? <Link className='text-blue-600' to='/captain-login'>Login Here</Link></p>
                </div>
                <div>
                    <p className='text-[11px] leading-tight p-1'>
                        By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages, including by automated means, from Uber and its affiliates to the number provided.
                    </p>
                </div>
            </div>
        </>
    )
}