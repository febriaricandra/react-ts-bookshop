import { useState } from "react"
import { useAuth } from "../../context/AuthContext";
import { useFlashMessage } from "../../context/FlashMessageContext";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { showMessage }: any = useFlashMessage();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = await login(email, password);
            if (user?.isAdmin) {
                showMessage("Login successful", "success");
                navigate("/admin");
            } else if (user) {
                showMessage("Login successful", "success");
                navigate("/profile");
            } else {
                navigate("/login");
                throw new Error("Login failed");
            }
        } catch (error) {
            showMessage("Login failed", "error");
        }
    }
    return (
        <div className="w-full max-w-sm p-4 border rounded-lg shadow sm:p-6 md:p-8 bg-gray-800 border-gray-700">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <h5 className="text-xl font-medium text-white">Login</h5>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Your password</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={(e) => setPassword(e.target.value)} />
                </div>
                {/* <div className="flex items-start">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                        </div>
                        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                    </div>
                    <a href="#" className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                </div> */}
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                <div className="text-sm font-medium text-gray-300">
                    Not registered? <a href="#" className=" hover:underline text-blue-500">Register account</a>
                </div>
            </form>
        </div>

    )
}

export default Login