import { getData, postData } from "@/lib/api"
import { LatestMRID, Token } from "./endpoint"

export const addToken = async (values) => {
    const response = await postData(Token, values)
    return response?.data
}

export const getMRID = async () => {
    const res = await getData(LatestMRID);
    return res?.data;
};