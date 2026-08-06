
import css from "./HeroSection.module.css";
import Button from "@/components/ui/Button/Button";

export default function HeroSection() {
  return (
    <section className={css.hero}>
      <div className={`container ${css.grid}`}>
        {/* Левая текстовая колонка */}
        <div className={css.contentColumn}>
          <div className={css.taglineWrapper}>
            <div className={css.taglineIcon}>
              <svg width="14" height="14">
                <use href="/sprite.svg#icon-sheild"></use>
              </svg>
            </div>
            <span className={css.taglineText}>Your mental health matters</span>
          </div>

          <h1 className={css.title}>Find Your Perfect Psychologist Online</h1>
          <p className={css.description}>
            Connect with licensed therapists and coaches who understand your
            needs. Start your journey to better mental health today.
          </p>
        
          <Button
            className={css.btnGetStarted}
            text=" Get Started"
            icon="icon-arrow-right"
            color="green"
            width={173}
            href="/psychologists"
          ></Button>
        </div>

        {/* Правая колонка с картинкой и абсолютными бейджами */}
        <div className={css.visualColumn}>
          <div className={css.imageWrapper}>
            {/* Адаптивная картинка с поддержкой Retina 2x */}
            <img
              className={css.heroImage}
              src="/hero.png"
              srcSet="/hero.png 1x, /hero@2x.png 2x"
              alt="Psychologist session online"
              width={640}
              height={498}
            />

            {/* Бейдж 1: Специалисты с иконкой из SVG-спрайта */}
            <div className={`${css.floatingBadge} ${css.badgeLeft}`}>
              <div className={css.iconShield}>
                <svg width="20" height="24">
                  <use href="/sprite.svg#icon-sheild"></use>
                </svg>
              </div>
              <span>Licensed Specialists</span>
            </div>

            {/* Бейдж 2: Рейтинг */}
            <div className={`${css.floatingBadge} ${css.badgeRight}`}>
              <div className={css.iconStar}>
                <svg width="20" height="19">
                  <use href="/sprite.svg#icon-star-full"></use>
                </svg>
              </div>
              <span className={css.badgeText}>4.8 Average Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
