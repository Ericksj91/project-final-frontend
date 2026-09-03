import "./Logo.css";

function Logo() {
  return (
    <>
      <p className="logo">
        <span role="image" aria-label="Logotipo de búsqueda de películas">
          {" "}
          🎞️
        </span>{" "}
        Movies Explorer
      </p>
    </>
  );
}

export default Logo;
