import './PoliticsDetail.css'
import { useState } from 'react';

/* export const PoliticsDetail = () => {
    return (
        <div>
            <h3>Politicas del servicio</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quisquam tenetur nobis! Maiores ad dolorem non quibusdam impedit dicta harum, accusantium fuga illum odio reiciendis similique aut fugiat temporibus veniam?</p>
        </div>
    )
} */

// eslint-disable-next-line react/prop-types
const Policy = ({ title, content }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <div className={`policy ${expanded ? 'expanded' : ''}`}>
            <div className="policy-header" onClick={toggleExpanded}>
                <h4>{title}</h4>
                <span className={`arrow ${expanded ? 'expanded' : ''}`}>&#9658;</span>
            </div>
            {expanded && <p className="policy-content">{content}</p>}
        </div>
    );
};

export const PoliticsDetail = () => {
    const policies = [
        {
            title: 'Seguridad y regulaciones',
            content: 'Todos los participantes deben cumplir con las regulaciones de seguridad y requisitos legales establecidos para el uso de vehículos motorizados. Esto podría incluir el uso obligatorio de cascos, cinturones de seguridad u otros equipos de protección.',
        },
        {
            title: 'Condiciones climáticas',
            content: 'La aventura puede estar sujeta a cambios debido a condiciones climáticas adversas o situaciones imprevistas. Los organizadores se reservan el derecho de modificar el itinerario en caso de que sea necesario por cuestiones de seguridad.',
        },
        {
            title: 'Limitaciones de responsabilidad',
            content: 'Los participantes pueden ser requeridos a firmar un acuerdo de exoneración de responsabilidad que libera a los organizadores y proveedores de servicios de cualquier responsabilidad en caso de accidentes o lesiones durante la aventura.',
        },
    ];

    return (
        <div className="politics-container">
            <div className="policy-title tapeDetailProducts">
                <h3>Políticas de servicio</h3>
            </div>
            <div className="policy-list">
                {policies.map((policy, index) => (
                    <div className="policy-column" key={index}>
                        <Policy title={policy.title} content={policy.content} />
                    </div>
                ))}
            </div>
        </div>
    );
};
