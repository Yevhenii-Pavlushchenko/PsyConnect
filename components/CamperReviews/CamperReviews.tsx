import css from "./CamperReviews.module.css";

import CamperBookForm from "../CamperBookForm/CamperBookForm";
import CamperFeedbacks from "../CamperFeedbacks/CamperFeedbacks";

export default function CamperReviews() {
  return (
    <section className={css.container}>
      <h2 className={css.title}>Reviews</h2>
      <div className={css.wraper}>
        <CamperFeedbacks />
        <CamperBookForm />
      </div>
    </section>
  );
}
