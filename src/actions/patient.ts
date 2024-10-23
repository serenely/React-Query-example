import axiosInstance from "./axiosInstance";
import { PatientStatus } from "../utils/constants";
import { PatientInput } from "../components/PatientForm/types";

interface FetchPatientParams {
    perPage: number;
    currentPage: number;
    keyword: string;
    status: PatientStatus;
}

export const fetchPatientData = async (data: FetchPatientParams) => {
    const { perPage = 12, currentPage = 1, keyword, status = "" } = data;

    try {
        const response = await axiosInstance.get("/", {
            params: { perPage, currentPage, keyword, status }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateOnePatient = async (id: string, data: PatientInput) => {
    try {
        const response = await axiosInstance.put(`/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addOnePatient = async (data: PatientInput) => {
    if (!data) throw new Error("Name and description are required");

    try {
        const response = await axiosInstance.post("/", { name, data });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deletePatient = async (id?: string) => {
    if (!id) throw new Error("ID is required");
    try {
        await axiosInstance.delete(`/${id}`);
    } catch (error) {
        throw error;
    }
};
