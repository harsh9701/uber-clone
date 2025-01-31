import './Tailwind.css';
import uberLogo from '../assets/uberLogo.png';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <>
            <div className='bg-cover bg-[url(https://images.unsplash.com/photo-1593950315186-76a92975b60c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dWJlcnxlbnwwfHwwfHx8MA%3D%3D)] h-screen pt-8 w-full flex justify-between flex-col'>
                <img className='w-16 ml-8' src={uberLogo} alt="Uber Logo" />
                <div className='bg-white py-4 pb-7 px-4'>
                    <h2 className='text-3xl font-bold'>Get Started With Uber</h2>
                    <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
                </div>
            </div>
        </>
    )
}