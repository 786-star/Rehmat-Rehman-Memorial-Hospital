import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Heading from "@/components/Heading/Heading";
import DataTable from "@/components/Data/DataTable";
import { getPatientsHistory } from "@/api/HistoryApi";
import Button from "@/components/Button/Button";

const PatientHistory = () => {
    const { id } = useParams();
    const navigate = useNavigate()

    const { data: historyData, isLoading } = useQuery({
        queryKey: ["patientHistory", id],
        queryFn: () => getPatientsHistory(id),
    });

    const columns = [
        { key: "visitDate", label: "Visit Date", render: (row) => new Date(row.visitDate).toLocaleString() },
        { key: "temperature", label: "Temperature (°C)" },
        { key: "bloodPressure", label: "Blood Pressure" },
        { key: "pulseRate", label: "Pulse Rate" },
        { key: "spo2", label: "SpO₂" },
        { key: "allergy", label: "Allergy" },
        { key: "otherDisease", label: "Other Disease" },
    ];

    return (
        <div className="p-6 grid grid-cols-1 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow">
                <div className="flex justify-between">

                    <Heading title={`🧾 Patient Visit History`} className="py-2" />
                    <Button variant='outline' label={'Back'} className="w-24! mb-2!" onClick={() => navigate(-1)}/>

                </div>
                <DataTable
                    columns={columns}
                    data={historyData}
                    isLoading={isLoading}
                    emptyMessage="No visit records found."
                />
            </div>
        </div>
    );
};

export default PatientHistory;
