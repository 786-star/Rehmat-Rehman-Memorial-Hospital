import { getData, postData } from "@/lib/api";
import { AddAppointment, GetAppointmentList } from "./endpoint";


export const addAppointment = async (values) => {
  const response = await postData(AddAppointment, values);
  return response.data;
};

export const getAppointment = async () => {
  try {
    const response = await getData(GetAppointmentList);
    return response || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};