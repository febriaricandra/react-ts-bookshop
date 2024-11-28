import { useFlashMessage } from "../../context/FlashMessageContext";
import { useState } from "react";
import AuthServices from "../../services/AuthService";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const { showMessage }: any = useFlashMessage();
    const [errors, setErrors] = useState<any>({});
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const validateForm = () => {
        const newErrors: any = {};
        if (!form.name || form.name.length < 8) {
            newErrors.name = "Name is required and must be at least 8 characters";
        }

        if (!form.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!form.password || form.password.length < 8) {
            newErrors.password = "Password is required and must be at least 8 characters";
        }

        return newErrors;
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            showMessage("Please fill in the form correctly", "error");
        }

        try {
            setErrors({});
            AuthServices.register(form);
            navigate("/login");
            showMessage("Register successful", "success");
        } catch (error) {
            console.error("Failed to register", error);
            showMessage("Register failed", "error");
        }
    }
    return (
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" action="#">
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">Register</h5>
                <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                    <input onChange={handleChange} type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                    {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input onChange={handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                    {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                </div>
                <button
                    onClick={handleSubmit}
                    type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register account</button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Already Have an account? <Link to="/login" className="text-blue-700 hover:underline dark:text-blue-500">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register