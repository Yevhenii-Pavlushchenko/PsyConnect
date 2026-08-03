import { CamperForm, CamperTransmission, CamperEngine, Camper } from "./camper";

export interface CamperFilters {
  location?: string;
  form?: CamperForm;
  transmission?: CamperTransmission;
  engine?: CamperEngine;
}

export interface fetchCampersResponse {
  campers: Camper[];
  total: number;
}
