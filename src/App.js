import React, { useState, useEffect } from "react";
import data from "./data";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import "./App.css";
function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span>reviews
        </h2>
      </div>
      <div className="section-center">
        {people.map((person, personIndex) => {
          const { id, image, name, title, quote } = person;

          let position = "nextSlide";

          if (personIndex === index) {
            position = "activeSlide";
          }

          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = "lastSlide";
          }

          {
            console.log("$$INDEX", index);
            console.log("PERSONINDEX", personIndex);
          }

          return (
            <article className={position}>
              <img src={image} className="person-img" />
              <h3>{name}</h3>
              <p>{title}</p>
              <p>{quote}</p>
              <FaQuoteRight className="icon" />
            </article>
          );
        })}

        <button className="next" onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
        <button className="prev" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
      </div>
    </section>
  );
}

export default App;
