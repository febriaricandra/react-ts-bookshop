import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"


function Profile() {
    const { user } = useAuth();

    console.log(user);
    return (
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
                <img src="profile-pic-url" alt="Profile" className="w-16 h-16 rounded-full mr-4" />
                <div>
                    <h2 className="text-xl font-bold">Jese Leos (Personal)</h2>
                    <p className="text-gray-400">jesse@flowbite.com</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold">Account data</h3>
                    <p><Link to="/admin">Admin Panel</Link></p>
                    <p>Email Address: yourname@example.com</p>
                    <p>Delivery Address: Miles Drive, Newark, NJ 07103, California, United States of America</p>
                    <p>Phone Number: +1234 567 890 / +12 345 678</p>
                    <p>Country: United States of America</p>
                    <button className="mt-2 text-blue-400 hover:underline">Edit your data</button>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold">Flowbite PRO</h3>
                    <p className="text-xl font-bold">$9.99/month</p>
                    <ul className="list-disc list-inside">
                        <li>Free shipping all over the country</li>
                        <li>Testing the product for 5 days</li>
                        <li>Exclusive offers</li>
                    </ul>
                    <button className="mt-2 text-blue-400 hover:underline">Upgrade to PRO</button>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Active orders</h3>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p>Order ID: #FWB125467980</p>
                    <p>Date: 27.01.2024</p>
                    <p>Price: $4,799</p>
                    <p>Status: <span className="text-yellow-400">In transit</span></p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p>Order ID: #FWB125467971</p>
                    <p>Date: 11.12.2023</p>
                    <p>Price: $964</p>
                    <p>Status: <span className="text-blue-400">Pre-order</span></p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p>Order ID: #FWB125467665</p>
                    <p>Date: 05.04.2023</p>
                    <p>Price: $230</p>
                    <p>Status: <span className="text-green-400">Confirmed</span></p>
                </div>
                <button className="text-blue-400 hover:underline">See all orders</button>
            </div>
        </div>
    )
}

export default Profile