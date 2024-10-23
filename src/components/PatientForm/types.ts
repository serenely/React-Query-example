import { PatientStatus } from "../../utils/constants";

export type Address = {
    street1: string;
    street2: string;
    city: string;
    state: string;
    zip: string;
};

export type ConfigurableSection = {
    fieldName: string;
    fieldValue: string;
};

export interface PatientInput {
    firstName: string;
    lastName: string;
    dob: string;
    status: PatientStatus;
    addresses: Address[];
    customFields?: ConfigurableSection[];
}

export interface PatientOutput extends PatientInput {
    _id?: string;
    id?: string;
    middleName?: string;
}
