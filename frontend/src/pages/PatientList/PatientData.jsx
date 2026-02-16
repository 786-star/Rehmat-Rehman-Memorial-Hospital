import { useQuery } from '@tanstack/react-query';
import { getPatient } from '../../api/PatientApi';
import DataTable from '../../components/Data/DataTable';
import Heading from '@/components/Heading/Heading';
import { useNavigate } from 'react-router-dom';


const PatientData = () => {
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: ['getPatient'],
    queryFn: getPatient,
    refetchOnWindowFocus: false
  });

  const columns = [
    {
      key: "mrid",
      label: "MRID",
      render: (row) => (
        <p
          onClick={() => navigate(`/patients/${row._id}`)}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          {row.mrid}
        </p>
      ),
    },
    {
      key: "name",
      label: "Name",
      render: (row) => (
        <span>
          {row.firstName} {row.lastName}
        </span>
      ),
    },
    {
      key: "gender",
      label: "Gender",
    },
    {
      key: "CNIC",
      label: "CNIC",
    },
    {
      key: "phone",
      label: "Phone",
    },
  ];

  return (
    <div className="p-6 grid grid-cols-1 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow">
        <Heading title='📋 Patient List'/>
        <DataTable
          columns={columns}
          data={data}
          isLoading={isLoading}
          emptyMessage="No Patients found."
          searchable={true}
          className="h-[67vh] overflow-y-auto scroll-smooth"
        />
      </div>
    </div>
  );
};

export default PatientData;