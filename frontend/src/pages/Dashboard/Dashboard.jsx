import { useNavigate } from "react-router-dom";
import Cards from './components/Cards';

const dashboardCards = [
    {
        title: "Patient Registration",
        icon: "user",
        color: "blue",
        route: "/patientregister"
    },
    {
        title: "Patient List",
        icon: "patientD",
        color: "teal",
        route: "/patientdata"
    },
    {
        title: "Booking Appointments",
        icon: "calendar",
        color: "purple",
        route: "/bookingappointment"
    },
    {
        title: "Appointment List",
        icon: "user",
        color: "orange",
        route: "/appointmentlist"
    },
];

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="px-4 sm:px-6 lg:px-16 mt-6 sm:mt-8 lg:mt-10">
            <div className="p-4 sm:p-6">
                <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {dashboardCards.map((item, index) => (
                        <Cards
                            key={index}
                            title={item.title}
                            icon={item.icon}
                            color={item.color}
                            onClick={() => navigate(item.route)}
                        />
                    ))}
                </div>
            </div>
        </div>

    );
};

export default Dashboard;