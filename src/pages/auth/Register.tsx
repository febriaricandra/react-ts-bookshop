import { useFlashMessage } from "../../context/FlashMessageContext";
import AuthServices from "../../services/AuthService";
import { useForm } from "../../hooks/useForm";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const { showMessage }: any = useFlashMessage();
    const navigate = useNavigate();

    const validateForm = (values: any) => {
        const newErrors: any = {};
        if (!values.name || values.name.length < 8) {
            newErrors.name = "Name is required and must be at least 8 characters";
        }

        if (!values.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!values.password || values.password.length < 8) {
            newErrors.password = "Password is required and must be at least 8 characters";
        }

        return newErrors;
    }

    const onSubmit = async (values: any) => {
        try {
            await AuthServices.register(values);
            navigate("/login");
            showMessage("Register successful", "success");
        } catch (error) {
            showMessage("Register failed", "error");
        }
    }

    const { values, errors, handleChange, handleSubmit } = useForm({
        initialValues: { name: "", email: "", password: "" },
        validate: validateForm,
        onSubmit,
    });
    return (
        <div className="w-full max-w-sm p-4 border rounded-lg shadow sm:p-6 md:p-8 bg-gray-800 border-gray-700">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <h5 className="text-xl font-medium text-white">Register</h5>
                <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">Your name</label>
                    <input value={values.name} onChange={handleChange} type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                    {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                    <input value={values.email} onChange={handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                    {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Your password</label>
                    <input value={values.password} onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                </div>
                <button
                    type="submit" className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Register account</button>
                <div className="text-sm font-medium text-gray-300">
                    Already Have an account? <Link to="/login" className="hover:underline text-blue-500">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register