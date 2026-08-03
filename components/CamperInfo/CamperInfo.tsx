import css from "./CamperInfo.module.css";

import CamperGallery from "../CamperGallery/CamperGallery";
import CamperDetails from "../CamperDetails/CamperDetails";
import { Camper } from "@/types/camper";

export default function CamperInfo({ camper }: { camper: Camper }) {
  return (
    <section className={css.section}>
      <div className={css.mainContent}>
        {camper.gallery && (
          <CamperGallery gallery={camper.gallery} name={camper.name} />
        )}
        <CamperDetails camper={camper} />
      </div>
    </section>
  );
}
