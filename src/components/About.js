import React from "react";
import "../about.css";
import portrait1 from "../imgs/butcher_portrait_1.jpg";
import portrait2 from "../imgs/butcher_portrait_2.jpg";
import portrait3 from "../imgs/butcher_portrait_3.jpg";

export default function About() {
  return (
    <>
      <h1 className="team-header">Meet the Team!</h1>
      <div className="card-container">
        <div class="card">
          <img src={portrait1} alt="John" />
          <h1>John Doe</h1>
          <p class="title">Proud Father & Local Butcher</p>
          <p>20 Years Experience</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            suscipit ultrices tristique. Cras placerat posuere vehicula. Aliquam
            eget dignissim quam, sed tempus massa.
          </p>
        </div>
        <div class="card">
          <img src={portrait2} alt="Jane" />
          <h1>Jane Doe</h1>
          <p class="title">Proud Daugther & Local Butcher</p>
          <p>1 Year Experience</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            suscipit ultrices tristique. Cras placerat posuere vehicula. Aliquam
            eget dignissim quam, sed tempus massa.
          </p>
        </div>
        <div class="card">
          <img src={portrait3} alt="John" />
          <h1>Jim Smith</h1>
          <p class="title">Proud Friend & Local Butcher</p>
          <p>5 Years Experience</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            suscipit ultrices tristique. Cras placerat posuere vehicula. Aliquam
            eget dignissim quam, sed tempus massa.
          </p>
        </div>
      </div>
    </>
  );
}
