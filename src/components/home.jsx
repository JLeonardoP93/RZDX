import { useNavigate } from 'react-router-dom';
import CardSwap, { Card } from './CardSwap';
import './Home.css';

export const Home = () => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate('/products');
  };

  return (
    <div className="rzdx-home-container">
      <div className="rzdx-home-content">
        <div className="rzdx-home-left">
          <div className="rzdx-hero-text">
            <h1 className="rzdx-main-title">
              <span className="rzdx-brand">RZDX</span>
              <span className="rzdx-subtitle">Implementos Deportivos</span>
            </h1>
            
            <p className="rzdx-description">
              Descubre la mejor calidad en equipamiento deportivo para 
              <strong> Boxeo</strong> y <strong>MMA</strong>. 
              Productos profesionales que llevarán tu entrenamiento al siguiente nivel.
            </p>
            
            <div className="rzdx-features">
              <div className="rzdx-feature">
                <span className="rzdx-feature-icon">🥊</span>
                <span>Equipo Profesional</span>
              </div>
              <div className="rzdx-feature">
                <span className="rzdx-feature-icon">⚡</span>
                <span>Calidad Garantizada</span>
              </div>
              <div className="rzdx-feature">
                <span className="rzdx-feature-icon">🚚</span>
                <span>Envío Rápido</span>
              </div>
            </div>
            
            <div className="rzdx-cta-section">
              <button 
                className="rzdx-cta-button"
                onClick={handleProductClick}
              >
                Ver Todos los Productos
                <span className="rzdx-arrow">→</span>
              </button>
              
              <p className="rzdx-cta-text">
                <span className="rzdx-highlight">¡Explora</span> nuestro catálogo completo y encuentra 
                el equipamiento perfecto para tu entrenamiento.
              </p>
            </div>
          </div>
        </div>
        
        <div className="rzdx-home-right">
          <CardSwap
            cardDistance={50}
            verticalDistance={60}
            delay={4000}
            pauseOnHover={true}
            onCardClick={handleProductClick}
          >
            <Card>
              <div className="rzdx-card-content">
                <div 
                  className="rzdx-card-image"
                  style={{
                    backgroundImage: 'url(https://res.cloudinary.com/dvoakblan/image/upload/v1750188186/GuantesBoxLegion_pobuuf.png)'
                  }}
                >
                  <div className="rzdx-card-price">$133.00</div>
                </div>
                <div className="rzdx-card-info">
                  <h3 className="rzdx-card-title">Guantes de Boxeo</h3>
                  <p className="rzdx-card-category">Boxeo</p>
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="rzdx-card-content">
                <div 
                  className="rzdx-card-image"
                  style={{
                    backgroundImage: 'url(https://res.cloudinary.com/dvoakblan/image/upload/v1750188186/GuantesMmaLegion_rjzn3w.png)'
                  }}
                >
                  <div className="rzdx-card-price">$130.00</div>
                </div>
                <div className="rzdx-card-info">
                  <h3 className="rzdx-card-title">Guantes MMA</h3>
                  <p className="rzdx-card-category">MMA</p>
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="rzdx-card-content">
                <div 
                  className="rzdx-card-image"
                  style={{
                    backgroundImage: 'url(https://res.cloudinary.com/dvoakblan/image/upload/v1750187355/SacoBox1Metro_vu3azd.png)'
                  }}
                >
                  <div className="rzdx-card-price">$100.00</div>
                </div>
                <div className="rzdx-card-info">
                  <h3 className="rzdx-card-title">Saco de Boxeo</h3>
                  <p className="rzdx-card-category">Boxeo</p>
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="rzdx-card-content">
                <div 
                  className="rzdx-card-image"
                  style={{
                    backgroundImage: 'url(https://res.cloudinary.com/dmwohsz6e/image/upload/v1751874883/71Ge-wIqvUL_m1icto.jpg)'
                  }}
                >
                  <div className="rzdx-card-price">$250.00</div>
                </div>
                <div className="rzdx-card-info">
                  <h3 className="rzdx-card-title">Espinilleras Venum</h3>
                  <p className="rzdx-card-category">MMA</p>
                </div>
              </div>
            </Card>
          </CardSwap>
        </div>
      </div>
    </div>
  )
}
