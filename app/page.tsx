"use client"

import { useRouter } from "next/navigation";
import css from "./page.module.css";

import Button from "@/components/Button/Button";

export default function Home() {
  const router = useRouter()
  return (
    <section className={css.hero}>
      <div className={css.container}>
        <h1 className={css.title}>Campers of your dreams</h1>
      <p className={ css.descr}>You can find everything you want in our catalog</p>
      <Button
        text="View Now"
        color='green' width={173}
        onClick={()=>router.push('/catalog')}
      ></Button>
      </div>
      
      
   </section>
  );
}
