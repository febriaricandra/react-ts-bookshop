import useOrderUser from "../../hooks/useOrderUser";
import TableLatestOrder from "../../components/tables/TableLatestOrder";

function Profile() {
    const { data, loading, error } = useOrderUser();

    console.log(data, loading, error);
    return (
        <div className="min-h-screen text-gray-200 p-8">
            {/* Header Section */}
            <div className="flex items-start gap-4 mb-8">
                <img
                    src="/placeholder.svg?height=64&width=64"
                    alt="Profile"
                    className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <span className="bg-blue-600 text-xs px-2 py-1 rounded-md">PRO Account</span>
                    </div>
                    <h1 className="text-2xl font-semibold text-white">Helene Engels</h1>
                </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                    <h2 className="text-sm mb-2">Email Address</h2>
                    <p className="text-white">helene@example.com</p>
                </div>
                <div>
                    <h2 className="text-sm mb-2">Phone Number</h2>
                    <p className="text-white">+1234 567 890 / +12 345 678</p>
                </div>
                <div>
                    <h2 className="text-sm mb-2">Home Address</h2>
                    <p className="text-white">2 Miles Drive, NJ 071, New York, United States of America</p>
                </div>
                <div>
                    <h2 className="text-sm mb-2">Favorite pick-up point</h2>
                    <p className="text-white">Herald Square, 2, New York, United States of America</p>
                </div>
                <div>
                    <h2 className="text-sm mb-2">Delivery Address</h2>
                    <p className="text-white">9th St. PATH Station, New York, United States of America</p>
                </div>
                <div>
                    <h2 className="text-sm mb-2">My Companies</h2>
                    <p className="text-white">FLOWBITE LLC, Fiscal code: 18673557</p>
                </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>
                <div className="bg-[#1c2537] p-4 rounded-lg inline-block">
                    <div className="flex items-center gap-3">
                        <div className="bg-gray-600 w-12 h-8 rounded flex items-center justify-center">
                            <span className="text-xs font-semibold text-white">VISA</span>
                        </div>
                        <div>
                            <p className="text-sm">Visa ending in 7658</p>
                            <p className="text-xs text-gray-400">Expiry 10/2024</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Latest Orders */}
            <TableLatestOrder data={data ?? []} />
        </div>
    );
}

export default Profile