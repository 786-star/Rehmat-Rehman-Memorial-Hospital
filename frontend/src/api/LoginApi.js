import { postData } from "@/lib/api"
import { Login } from "./endpoint"

export const login = async (values) => {
    const response = await postData(Login, values)
    return response
}