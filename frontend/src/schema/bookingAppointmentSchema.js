import { getErrorMessage } from "@/lib/utils";
import { z } from "zod";

export const bookingAppointmentSchema = z.object({
    mrid: z.string().min(1, getErrorMessage()),
    department: z.string().min(1, getErrorMessage()),
    doctor: z.string().min(1, getErrorMessage()),
    date: z.string().min(1, getErrorMessage()),
    timeSlot: z.string().min(1, getErrorMessage()),
    status: z.string().optional()
});


export const defaultValues = {
    mrid: "",
    department: "",
    doctor: "",
    date: "",
    timeSlot: "",
    status: "pending"
}