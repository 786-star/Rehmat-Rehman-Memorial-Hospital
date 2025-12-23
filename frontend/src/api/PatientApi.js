import { getData, postData } from "@/lib/api";
import { AddPatient, GetPatient } from "./endpoint";

export const addPatient = async (value) => {
  const response = await postData(AddPatient, value);
  return response?.data;
};

export const getPatient = async () => {
  const res = await getData(GetPatient);
  return res?.data;
};

export const searchPatient = async ({ mrid, cnic }) => {
  try {
    const params = {};

    if (mrid) params.mrid = mrid.trim();
    if (cnic) params.cnic = cnic.trim();

    const response = await getData(GetPatient, params);
    console.log(response.data)
    return response?.data || null;
  } catch (error) {
    if (error?.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

export const getPatientById = async (id) => {
  const res = await getData(`${GetPatient}/${id}`);
  return res?.data;
};