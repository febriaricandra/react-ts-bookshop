import LineChart from "../../components/charts/LineChart"

export default function Home() {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="">
            <span className="bg-yellow-800 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">Orders</span>
          </div>
          <div className="my-2">
            <p className="text-6xl font-bold">10</p>
            <p className="text-sm capitalize mt-2">orders in the last 90 days</p>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="">
            <span className="bg-yellow-800 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">Orders</span>
          </div>
          <div className="my-2">
            <p className="text-6xl font-bold">10</p>
            <p className="text-sm capitalize mt-2">orders in the last 90 days</p>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="">
            <span className="bg-yellow-800 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">Orders</span>
          </div>
          <div className="my-2">
            <p className="text-6xl font-bold">10</p>
            <p className="text-sm capitalize mt-2">orders in the last 90 days</p>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="">
            <span className="bg-yellow-800 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">Orders</span>
          </div>
          <div className="my-2">
            <p className="text-6xl font-bold">10</p>
            <p className="text-sm capitalize mt-2">orders in the last 90 days</p>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg col-span-1 md:col-span-4 lg:col-span-2 w-full">
          <LineChart />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg flex items-center space-x-4">
          <div className="text-blue-400">
            <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h11M9 21V3m3 3l4-4m0 0l4 4m-4-4v13m4 4l4-4m-4 4l-4-4"></path>
            </svg>
          </div>
          <div>
            <h3 className="font-bold">Earn money with us!</h3>
            <p className="text-sm text-gray-400">Sell your products to hundreds of millions of Flowbite customers. No per-item listing fees.</p>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Open a shop</button>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
          <div>
            <h3 className="font-bold">You have a $49 voucher</h3>
            <p className="text-sm text-gray-400">Save some extra bucks for an order of the gaming category products.</p>
            <p className="text-sm text-gray-400 mt-2">Expires on 31.12.2024 - 23:59</p>
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Apply in basket</button>
        </div>
      </div>
    </div>
  )
}
