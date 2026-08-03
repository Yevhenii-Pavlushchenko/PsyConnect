import css from "./CamperDetails.module.css";
import { Camper } from "@/types/camper";

export default function CamperDetails({ camper }: { camper: Camper }) {
  const formatValue = (value: string) => {
    return value.replace(/(\d+(?:\.\d+)?)([a-zA-Z/]+)/, "$1 $2");
  };

  return (
    <>
      <div className={css.infoWraper}>
        <div className={css.meta}>
          <h2 className={css.title}>{camper.name}</h2>
          <div className={css.ratingWraper}>
            <div className={css.rating}>
              <svg className={css.ratingIcon} width="16" height="16">
                <use href="/sprite.svg#icon-star"></use>
              </svg>
              <span className={css.ratingText}>
                {camper.rating}({camper.totalReviews} Reviews)
              </span>
            </div>
            <div className={css.location}>
              <svg width="16" height="16">
                <use href="/sprite.svg#icon-map"></use>
              </svg>
              <span>{camper.location}</span>
            </div>
          </div>

          <p className={css.price}>€{camper.price.toFixed(2)}</p>
          <p className={css.description}>{camper.description}</p>
        </div>
        <div className={css.detailsWrapper}>
          <h2 className={css.detailsTitle}>Vehicle details</h2>
          <ul className={css.amenitiesList}>
            <li className={css.amenitiesItem}>
              {camper.transmission.charAt(0).toUpperCase() +
                camper.transmission.slice(1)}
            </li>
            <li className={css.amenitiesItem}>
              {camper.engine.charAt(0).toUpperCase() + camper.engine.slice(1)}
            </li>
            {camper.amenities.map((item) => (
              <li key={item} className={css.amenitiesItem}>
                {item.length <= 2
                  ? item.toLocaleUpperCase()
                  : item.charAt(0).toUpperCase() + item.slice(1)}
              </li>
            ))}
          </ul>
          <ul className={css.parametersList}>
            <li className={css.parametersListItem}>
              <span className={css.parameterName}>Form</span>
              <span className={css.parameterValue}>
                {camper.form.charAt(0).toUpperCase() +
                  camper.form.slice(1).replace("_", " ")}
              </span>
            </li>
            <li className={css.parametersListItem}>
              <span className={css.parameterName}>Length</span>
              <span className={css.parameterValue}>
                {formatValue(camper.length)}
              </span>
            </li>
            <li className={css.parametersListItem}>
              <span className={css.parameterName}>Width</span>
              <span className={css.parameterValue}>
                {formatValue(camper.width)}
              </span>
            </li>
            <li className={css.parametersListItem}>
              <span className={css.parameterName}>Height</span>
              <span className={css.parameterValue}>
                {formatValue(camper.height)}
              </span>
            </li>
            <li className={css.parametersListItem}>
              <span className={css.parameterName}>Tank</span>
              <span className={css.parameterValue}>
                {formatValue(camper.tank)}
              </span>
            </li>
            <li className={css.parametersListItem}>
              <span className={css.parameterName}>Consumption</span>
              <span className={css.parameterValue}>{camper.consumption}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
