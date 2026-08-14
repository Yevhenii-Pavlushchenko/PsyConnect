import css from "./Loader.module.css";
import Image from "next/image";

export default function Loading() {
  return (
    <div className={css.backdrop}>
      <div className={css.loaderContainer}>
        <div className={css.wheelWrapper}>
          <Image
            src="/spener.svg"
            alt="Loading Speener"
            width={100}
            height={100}
            priority
          />
        </div>

        <div className={css.busWrapper}>
          <Image
            src="/logo.svg"
            alt="Logo Bus"
            width={45}
            height={45}
            priority
          />
        </div>
      </div>
    </div>
  );
}
