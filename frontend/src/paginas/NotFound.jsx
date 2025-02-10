import logoDog from '../assets/doglost.jpg'
import {Link} from 'react-router-dom'


export const NotFound = () => {
    return (
        

        <div className="flex flex-col items-center justify-center">

            <img class="object-cover h-80 w-80 rounded-full border-4 border-solid border-slate-600" src={logoDog} alt="image description"/>

            <div className="flex flex-col items-center justify-center">
                
                <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mt-12">Page Not Found</p>
                
                <p className="md:text-lg lg:text-xl text-gray-600 mt-8">Sorry, the page you are looking for could not be found.</p>
                
                <Link to="/login" className="mt-6 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-red-500 to-orange-600 rounded-lg shadow-md hover:scale-105 transition-transform">Login</Link>

            </div>
        </div>
    )
}
