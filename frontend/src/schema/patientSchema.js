import { getErrorMessage } from "@/lib/utils";
import { z } from "zod";

export const patientSchema = z.object({
    firstName: z.string().min(1, getErrorMessage()),
    lastName: z.string().min(1, getErrorMessage()),
    gender: z.string().min(1, getErrorMessage()),
    patientType: z.string().min(1, getErrorMessage()),
    CNIC: z.string().min(1, getErrorMessage()).regex(/^\d{5}-\d{7}-\d{1}$/, "Please enter a valid CNIC in 12345-1234567-1 format"),
    age: z.string().min(1, getErrorMessage()),
    phone: z.string().min(1, getErrorMessage()).regex(/^03[0-9]{9}$/, "Please enter a valid Pakistani mobile number"),
    maritalStatus: z.string().min(1, getErrorMessage()),
    mrid: z.string().min(1, getErrorMessage()),
    temperature: z.string().min(1, getErrorMessage()),
    bloodPressure: z.string().min(1, getErrorMessage()).regex(/^\d{2,3}\/\d{2,3}$/, "Please enter blood pressure in 120/80 format"),
    spo2: z.string().optional(),
    pulseRate: z.string().optional(),
    allergy: z.string().optional(),
    otherDisease: z.string().optional(),
    dm: z.boolean().optional(),
    htn: z.boolean().optional(),
    ihd: z.boolean().optional(),
    asthma: z.boolean().optional(),
    // serialNo: z.string().optional(),
    operation: z.string().optional(),
    admitDate: z.string().optional(),
    operationDate: z.string().optional(),
    dischargeDate: z.string().optional(),
}).refine((data) => {
    if (data.patientType === "Indoor Patient") {
        return (data.operation && data.admitDate && data.operationDate && data.dischargeDate)
    }
    return true
},
    {
        message: "Operation details are required for Indoor Patients",
        // path: ["serialNo"],
    }
);


export const defaultValues = {
    firstName: '',
    lastName: '',
    gender: '',
    age: '',
    CNIC: '',
    phone: '',
    patientType: '',
    maritalStatus: '',
    mrid: '',
    temperature: '',
    bloodPressure: '',
    spo2: '',
    pulseRate: '',
    allergy: '',
    otherDisease: '',
    dm: false,
    htn: false,
    ihd: false,
    asthma: false,
    // serialNo: '',
    operation: '',
    admitDate: '',
    operationDate: '',
    dischargeDate: ''
}