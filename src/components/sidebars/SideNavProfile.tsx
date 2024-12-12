import { LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useFlashMessage } from '../../context/FlashMessageContext'
import { useNavigate } from 'react-router-dom'

type DataItem = {
    icon: React.FC<React.SVGProps<SVGSVGElement>>
    label: string
    link: string
}

interface SideNavProfileProps {
    isSidebarOpen: boolean
    data: DataItem[]
}

function SideNavProfile({ isSidebarOpen, data }: SideNavProfileProps) {
    const { logout } = useAuth()
    const { showMessage }: any = useFlashMessage()
    const navigate = useNavigate();

    const handleLogout = () => {
        showMessage("You have been logged out", "success")
        navigate("/")
        logout()
    }
    return (
        <nav id="sidebar" className={`md:block space-y-2 ${isSidebarOpen ? 'block' : 'hidden'}`}>
            {data.map((item, index) => (
                <Link to={item.link} key={index} className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                </Link>
            ))}
            <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-500 hover:bg-slate-800 transition-colors">
                <LogOut className="h-5 w-5" />
                <span>Log out</span>
            </button>
        </nav>
    )
}

export default SideNavProfile