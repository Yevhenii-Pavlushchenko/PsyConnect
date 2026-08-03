"use client";
import css from "./CamperDetails.module.css";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchCamperById } from "@/lib/api";

import CamperInfo from "@/components/CamperInfo/CamperInfo";
import CamperReviews from "@/components/CamperReviews/CamperReviews";

export default function CamperDetailsPage() {
  const { camperId } = useParams();

  const {
    data: camper,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["camper", camperId],
    queryFn: () => fetchCamperById(camperId as string),
  });

  if (isLoading) return <div className={css.loader}>Loading...</div>;
  if (isError || !camper)
    return <div className={css.error}>Camper not found!</div>;

  return (
    <main className={css.container}>
      {<CamperInfo camper={camper} />}
      {<CamperReviews />}
    </main>
  );
}
