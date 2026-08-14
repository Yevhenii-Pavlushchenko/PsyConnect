import css from "./not-found.module.css";

import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button/Button";

export default function NotFound() {
  return (
    <main className={css.container}>
      <div className={css.content}>
        <h2 className={css.title}>Oops! Route</h2>
        <div className={css.imageWrapper}>
          <Image
            src="/not-found.png"
            alt="Lost camper"
            width={320}
            height={320}
            className={css.bus}
          />
          <h1 className={css.errorCode}>404</h1>
        </div>

        <p className={css.text}>
          Don’t worry, it happens to the best of us. Let’s guide you back to a
          safe and comfortable space.
        </p>

        <Button
          text="Back to Home"
          color="green"
          width={160}
          href="/"
        />
      </div>
    </main>
  );
}
