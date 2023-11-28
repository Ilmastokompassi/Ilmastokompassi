import ClimateExpert from '../assets/ilmastoasiantuntija.png'
import SustainableSearcher from '../assets/kestavanelamantavanetsija.png'
import EthicalConsumer from '../assets/eettinenkuluttaja.png'
import OpinionInfluencer from '../assets/mielipidevaikuttaja.png'
import PropTypes from 'prop-types'

const RoleImage = ({ title }) => {
    const roles = {
        Ilmastoasiantuntija: ClimateExpert,
        Mielipidevaikuttaja: OpinionInfluencer,
        'Kestävän elämäntavan etsijä': SustainableSearcher,
        'Eettinen kuluttaja': EthicalConsumer,
    }
    const role = roles[title]
    return (
        <>
            <img src={role} alt={title} width={250} height={250} />
        </>
    )
}

RoleImage.propTypes = {
    title: PropTypes.string.isRequired,
}

export default RoleImage
