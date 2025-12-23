import { getData } from "@/lib/api";
import { HistoryPatient } from "./endpoint";

export const getPatientsHistory = async (id) => {
  const res = await getData(`${HistoryPatient}/${id}`);
  return res.history;
};

