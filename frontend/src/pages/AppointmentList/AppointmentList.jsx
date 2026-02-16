import React from 'react';
import Heading from '@/components/Heading/Heading';
import DataTable from '@/components/Data/DataTable';
import { useQuery } from '@tanstack/react-query';
import { getAppointment } from '@/api/AppointmentApi';

const AppointmentList = () => {

  const { data, isFetching } = useQuery({
    queryKey: ['getPatient'],
    queryFn: getAppointment,
    refetchOnWindowFocus: false
  });

  const columns = [
    {
      key: "mrid",
      label: "MRID",
      render: (row) => {
        const p = row.patient;
        if (!p) return "-";
        return `${p.mrid}`;
      },
    },
    {
      key: "patient",
      label: "Patient",
      render: (row) => {
        const p = row.patient;
        if (!p) return "-";
        return `${p.firstName} ${p.lastName}`;
      },
    },
    {
      key: "department",
      label: "Department",
    },
    {
      key: "doctor",
      label: "Doctor",
    },
    {
      key: "date",
      label: "Date",
      render: (row) => new Date(row.date).toLocaleDateString(),
    },
    {
      key: "timeSlot",
      label: "Time",
    },
    {
      key: "status",
      label: "Status",
    },
  ];

  return (
    <div className="p-6 grid grid-cols-1 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow">
        <Heading title=" 📋 Appointment List" className='pb-4' />
        <DataTable
          columns={columns}
          data={data}
          isLoading={isFetching}
          searchable
          className="h-[65vh] overflow-y-auto scroll-smooth"
        />
      </div>
    </div>
  );
};

export default AppointmentList;