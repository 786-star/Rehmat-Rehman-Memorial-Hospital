import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { FaCashRegister, FaCreditCard, FaHospitalAlt, FaUser, FaUserInjured } from "react-icons/fa";
import { FiCalendar, FiDollarSign, FiAlertCircle, FiFileText } from "react-icons/fi";
import { MdGeneratingTokens } from "react-icons/md";

const icons = {
    user: <FaUser size={28} />,
    patientD: <FaUserInjured size={28} />,
    calendar: <FiCalendar size={28} />,
    opd: <FaCashRegister size={28} />,
    ipd: <FaCreditCard size={28} />,
    radiology: <FaHospitalAlt size={28} />,
    dollar: <FiDollarSign size={28} />,
    alert: <FiAlertCircle size={28} />,
    reports: <FiFileText size={28} />,
    token : <MdGeneratingTokens size={28}/>
};

const colors = {
    blue: "bg-primary",
    purple: "bg-purple-500",
    teal: "bg-teal-500",
    orange: "bg-orange-400",
};

const Cards = ({ title, icon, color, onClick }) => {
    return (
        <Card onClick={onClick} className={`text-white p-6 shadow ${colors[color]} h-40 flex flex-col items-center justify-center cursor-pointer transition duration-300 
        ease-in-out transform hover:scale-105 hover:shadow-lg`}>
            <CardHeader className="p-0 flex items-center justify-center">
                <div className="text-4xl">{icons[icon]}</div>
            </CardHeader>
            <CardContent className="p-0 mt-3 flex items-center justify-center">
                <div className="text-center md:text-xl lg:text-2xl font-medium">
                    {title}
                </div>
            </CardContent>
        </Card>
    );
};

export default Cards