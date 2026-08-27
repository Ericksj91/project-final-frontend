import "./About.css";
import about__image from "../../images/about_image.jpeg";

function About() {
  return (
    <>
      <div className="about">
        <img
          alt="Imagen del autor sobre mí"
          className="about__image"
          src={about__image}
        />
        <div className="about__info">
          <h2 className="about__title">Sobre mí</h2>
          <p className="about__description">
            Mi nombre es Erick, soy Ingeniero geólogo y desarrollador web, la
            página esta diseñada para que puedas buscar información sobre tus
            películas favoritas y guardarla en tu cuenta personal, espero que te
            guste y la disfrutes.
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
