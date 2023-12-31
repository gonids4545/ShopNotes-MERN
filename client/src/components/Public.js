import { Link } from "react-router-dom";

import React from "react";

const Public = () => {
  const content = (
    <section className='public'>
      <header>
        <h1>
          Welcome to <span className='nowrap'>Glow Supermarche</span>
        </h1>
      </header>
      <main className='public__main'>
        <p>
          Located in Beautiful Downtown FooBar City, Glow Supermarche is your
          one-stop shop for all things your Home needs at the most resonable
          prices!
        </p>
        <address className='public__addr'>
          Glow Supermarche
          <br />
          1001-1003 FooBar Lane
          <br />
          FooBar City, Qubec WXC123
          <br />
          <a href='tel:+11231231234'>(123) 123-1234</a>
        </address>
        <br />
        <p>Propriétaire: Madame Dupont</p>
      </main>
      <footer>
        <Link to='/login'>Employee Login</Link>
      </footer>
    </section>
  );
  return content;
};

export default Public;
