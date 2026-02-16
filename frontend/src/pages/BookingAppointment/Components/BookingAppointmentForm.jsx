import { searchPatient } from '@/api/PatientApi';
import Button from '@/components/Button/Button';
import CNICInput from '@/components/Form/CNICInput';
import Dropdown from '@/components/Form/Dropdown';
import TextInput from '@/components/Form/Input';
import { Departments, Doctor, TimeSlots } from '@/mocks/dropdownMock';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

const BookingAppointmentForm = ({ setPatientInfo, patientInfo }) => {
  const form = useFormContext();
  const [loading, setLoading] = useState(false);

  const handleSearchPatient = async () => {
    const mrid = form.getValues("mrid").trim();
    const cnic = form.getValues("cnic")?.trim();

    if (!mrid && !cnic) {
      return toast.error("Please enter MRID or CNIC");
    }

    try {
      setLoading(true);
      const result = await searchPatient({ mrid, cnic });

      if (!result) {
        toast.error("Patient not found");
        setPatientInfo(null);
        setLoading(false);
        return;
      }

      form.setValue("mrid", result.mrid || "");
      form.setValue("cnic", result.CNIC || "");

      setPatientInfo(result);
      toast.success("Patient found");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching patient");
      setPatientInfo(null);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-end">
        <TextInput label="MRID" placeholder="Enter MRID to search" control={form.control} name="mrid" />
        <CNICInput label="CNIC" name="cnic" control={form.control} placeholder="Enter CNIC to search" />
        <Button label={loading ? "Searching..." : "Search Patient"} onClick={handleSearchPatient} disabled={loading} />
      </div>
      {patientInfo && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4  rounded-xl">
          <TextInput
            label="Patient Name"
            value={`${patientInfo.firstName} ${patientInfo.lastName}`}
            disabled
          />
          <TextInput
            label="Phone"
            value={patientInfo.phone}
            disabled
          />
          
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Dropdown
          label="Department"
          name="department"
          options={Departments}
          control={form.control}
        />
        <Dropdown
          label="Doctor"
          name="doctor"
          options={Doctor}
          control={form.control}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <TextInput
          type="date"
          name="date"
          label="Date"
          control={form.control}
        />
        <Dropdown
          label="Time Slot"
          name="timeSlot"
          options={TimeSlots}
          control={form.control}
        />
      </div>
    </>
  )
}

export default BookingAppointmentForm