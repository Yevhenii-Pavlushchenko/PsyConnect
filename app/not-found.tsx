import css from "./not-found.module.css";

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className={css.container}>
      <div className={css.content}>
        <div className={css.imageWrapper}>
          <Image
            src="/minibus-icon.svg"
            alt="Lost camper"
            width={120}
            height={120}
            className={css.bus}
          />
          <h1 className={css.errorCode}>404</h1>
        </div>

        <h2 className={css.title}>Oops! Route not found</h2>
        <p className={css.text}>
          It looks like this camper took a wrong turn. The page you are looking
          for doesnt exist.
        </p>

        <Link href="/catalog" className={css.backLink}>
          Back to Catalog
        </Link>
      </div>
    </main>
  );
}
