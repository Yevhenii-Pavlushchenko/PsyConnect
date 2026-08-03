"use client";

import css from "./CamperFeedbacks.module.css";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchCamperReviews } from "@/lib/api";

export default function CamperFeedbacks() {
  const { camperId } = useParams<{ camperId: string }>();

  const {
    data: reviews,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["camperReviews", camperId],
    queryFn: () => fetchCamperReviews(camperId),
    enabled: !!camperId,
  });

  console.log("Current ID from URL:", camperId);
  console.log("Data from API:", reviews);

  if (isLoading) return <p>Loading reviews...</p>;
  if (isError) return <p>Error loading reviews</p>;
  if (!reviews || reviews.length === 0) return <p>No reviews yet.</p>;

  return (
    <ul className={css.feedbacklist}>
      {reviews.map((feedback) => (
        <li key={feedback.id} className={css.feedbackItem}>
          <div className={css.userWraper}>
            <div className={css.avatar}>
              {feedback.reviewer_name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className={css.name}>{feedback.reviewer_name}</p>
              <div className={css.stars}>
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    width="16"
                    height="16"
                    className={
                      i < feedback.reviewer_rating
                        ? css.starActive
                        : css.starEmpty
                    }
                  >
                    <use href="/sprite.svg#icon-star"></use>
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <p className={css.comment}>{feedback.comment}</p>
        </li>
      ))}
    </ul>
  );
}
