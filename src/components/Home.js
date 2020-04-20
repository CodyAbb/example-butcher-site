import React from "react";

export default function Home() {
  return (
    <>
      <div className="hero-image">
        <h1 className="business-heading">
          Local <br />
          High <br />
          Street <br />
          Butcher
        </h1>
      </div>
      <div className="home-information">
        <p className="opening-info">
          <span id="intro-para">Hello...</span>
          <br /> <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec sem
          urna. Fusce mi neque, pellentesque eu erat et, consequat pharetra
          nulla. Maecenas felis nisl, sagittis non dui non, scelerisque
          condimentum libero. Suspendisse laoreet, neque volutpat maximus
          porttitor, eros magna laoreet quam, at condimentum purus risus sed
          sapien. Mauris vitae lectus metus. Duis dictum convallis nisl, eu
          mattis ante facilisis at. Suspendisse sit amet lacus sapien. Praesent
          eu pulvinar nulla, id iaculis elit.
          <br /> <br />
          Maecenas id lorem eget est venenatis sollicitudin. Fusce auctor erat
          id ex scelerisque, sed mollis sapien euismod. Mauris consequat dapibus
          tellus. Donec in congue sapien. Sed quis lobortis justo, ut pretium
          tellus. Duis in scelerisque lorem. Vestibulum vel tellus massa. Proin
          sagittis pellentesque quam et porta. Sed non lacus auctor, faucibus
          nulla quis, fermentum metus. Maecenas mollis, mi eu lobortis luctus,
          lorem ante rhoncus tortor, blandit aliquam dui felis ut enim.
          Suspendisse elementum et felis ut ultrices.
        </p>
        <table className="opening-times">
          <tr>
            <th colspan="2">Opening Times</th>
          </tr>
          <tr>
            <td>Monday</td>
            <td>9am - 5pm</td>
          </tr>
          <tr>
            <td>Tuesday</td>
            <td>9am - 5pm</td>
          </tr>
          <tr>
            <td>Wednesday</td>
            <td>9am - 5pm</td>
          </tr>
          <tr>
            <td>Thursday</td>
            <td>9am - 5pm</td>
          </tr>
          <tr>
            <td>Friday</td>
            <td>9am - 3pm</td>
          </tr>
        </table>
        <table className="contact-info">
          <tr>
            <th colspan="2">Contact Info</th>
          </tr>
          <tr>
            <td>Telephone: </td>
            <td>0131 *** ****</td>
          </tr>
          <tr>
            <td>Email: </td>
            <td>youremail@business.com</td>
          </tr>
        </table>
      </div>
    </>
  );
}
