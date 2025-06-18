import './Contact.css'; // Asegúrate de crear este archivo CSS para los estilos

function Contact  ()  {
  return (
    <section className="contact" id='contact'>
      <div className="contact-container">
        <h2>Contacto</h2>
        <p>
          ¿Tienes alguna pregunta o quieres saber más sobre nuestros productos?
          No dudes en ponerte en contacto con nosotros. Estamos aquí para ayudarte.
        </p>
        <form className="contact-form">
          <input type="text" placeholder="Nombre" required />
          <input type="email" placeholder="Correo electrónico" required />
          <textarea placeholder="Escribe tu mensaje aquí..." rows="5" required></textarea>
          <button type="submit">Enviar Mensaje</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
