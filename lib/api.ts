import axios from "axios";
import { Camper, Review, BookingData } from "../types/camper";
import { CamperFilters, fetchCampersResponse } from "../types/filters";

const instance = axios.create({
  baseURL: "https://campers-api.goit.study",
});

export const fetchCampers = async ({
  pageParam = 1,
  filters = {},
}: {
  pageParam?: number;
  filters?: CamperFilters;
}): Promise<fetchCampersResponse> => {
  try {
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([_, value]) => value !== undefined && value !== "",
      ),
    );

    const { data } = await instance.get<fetchCampersResponse>("/campers", {
      params: {
        ...activeFilters,
        page: pageParam,
        perPage: 4,
      },
    });

    return data;
  } catch (error) {
    console.error("Error fetching campers:", error);
    throw error;
  }
};

export const fetchCamperById = async (id: string): Promise<Camper> => {
  try {
    const { data } = await instance.get<Camper>(`/campers/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching camper details:", error);
    throw error;
  }
};

export const fetchCamperReviews = async (id: string): Promise<Review[]> => {
  try {
    const { data } = await instance.get<Review[]>(`/campers/${id}/reviews`);
    return data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

export const sendBookingData = async (data: BookingData): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Дані успішно «відправлені» на сервер:", data);
      resolve();
    }, 1000);
  });
};
