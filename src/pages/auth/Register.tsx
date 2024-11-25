import { useState } from "react"
import FlashMessage from "../../components/flashs/FlashMessage"

function Register() {
    const [flash, setFlash] = useState<any>([]);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const id = Date.now();
        setFlash(((messages: any) => [...messages, { id, message: 'Account created successfully', type: 'success' }]));

        setTimeout(() => {
            setFlash((messages: any) => messages.filter((m: any) => m.id !== id));
        }, 5000);
    }
    return (
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" action="#">
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">Register</h5>
                <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                    <input type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                </div>
                <button
                    onClick={handleSubmit}
                    type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register account</button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Already Have an account? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Login</a>
                </div>
            </form>
            <div className="fixed bottom-4 right-4 flex flex-col space-y-4 z-50">
                {flash.map((message: any) => (
                    <FlashMessage key={message.id} message={message.message} type={message.type} onClose={() => {
                        setFlash((messages: any) => messages.filter((m: any) => m.id !== message.id));
                    }} />
                ))}
            </div>
        </div>
    )
}

export default Register