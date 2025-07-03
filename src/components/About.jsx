import './About.css';

function About() {
  return (
    <section className="about">
      <div className="about-container">
        <h2>SOBRE NOSOTROS</h2>
        
        <div className="about-section">
          <h3>Nuestra Filosofía</h3>
          <p>
            En <strong>RZDX Implementos Deportivos</strong>, nos apasiona el deporte y la excelencia.
            Nos dedicamos a ofrecer productos de alta calidad que acompañan a los atletas en cada paso de su camino.
          </p>
          <p>
            Con un equipo comprometido y años de experiencia, brindamos atención personalizada y soluciones
            efectivas para todas tus necesidades deportivas.
          </p>
        </div>

        <div className="about-section">
          <h3>Propuesta de Valor</h3>
          <p>
            Ofrecemos implementos deportivos de alta calidad y durabilidad, especializados en boxeo y MMA, 
            seleccionados cuidadosamente para atletas de todos los niveles. Nuestros productos están respaldados 
            por la garantía de calidad RZDX.
          </p>
          <ul className="value-list">
            <li>✓ Materiales de primera calidad</li>
            <li>✓ Asesoría personalizada</li>
            <li>✓ Entrega rápida y segura</li>
          </ul>
        </div>
        
        <div className="about-section">
          <h3>Visítanos</h3>
          <p>Estamos ubicados en Delta Training Camp, un espacio dedicado a los deportes de combate.</p>
          
          <div className="contact-info">
            <p><strong>Dirección:</strong>Cl. 7 Nte. #11E-45, Barrio Los Acacios, Cúcuta, Norte de Santander</p>
            <p><strong>Teléfono:</strong> +57 310 123 4567</p>
            <p><strong>Email:</strong> info@rzdxdeportes.com</p>
          </div>
          
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.897085027935!2d-72.4942034252328!3d7.905819392117303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6645026aeb77fd%3A0x692a6702bdd08858!2sDelta%20Training%20Camp!5e0!3m2!1ses-419!2sco!4v1751543861418!5m2!1ses-419!2sco" 
              width="100%" 
              height="450" 
              style={{border:0}} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de RZDX"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;