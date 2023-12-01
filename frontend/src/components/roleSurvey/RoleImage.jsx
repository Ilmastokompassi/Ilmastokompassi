import { Box } from '@mui/material'
import ClimateExpert from '../../assets/ilmastoasiantuntija.png'
import SustainableSearcher from '../../assets/kestavanelamantavanetsija.png'
import EthicalConsumer from '../../assets/eettinenkuluttaja.png'
import OpinionInfluencer from '../../assets/mielipidevaikuttaja.png'
import { RolePropTypes } from '../../types'

const roles = {
    1: [
        ClimateExpert,
        'Ilmastoasiantuntija-hiiri joka osoittaa tilastoja keltaisella taustalla. Tilastotaululla on myös maapallo, jolla on lippis päässä.',
    ],
    2: [
        OpinionInfluencer,
        "Mielipidevaikuttaja-pupu sinisellä taustalla, jolla on kädessään kyltti missä ilmaistaan 'minä rakastan maapalloa'. Maapallolla on baskeri päässä.",
    ],
    3: [
        SustainableSearcher,
        'Kestävän elämäntavan etsijä-ilves oranssilla taustalla, jonka puhekuplassa on maapallo jolla on cowboy-hattu päässä.',
    ],
    4: [
        EthicalConsumer,
        "Eettinen kuluttaja-kettu vihreällä taustalla, joka osoittaa hänen t-paitaan jossa ilmaistaan 'minä rakastan maapalloa'. Maapallolla on pipo päässä.",
    ],
}

const RoleImage = ({ role }) => (
    <Box
        component="img"
        src={roles[role.id][0]}
        alt={roles[role.id][1]}
        width={250}
        height={250}
        borderRadius={2}
        boxShadow={5}
    />
)

RoleImage.propTypes = {
    role: RolePropTypes,
}

export default RoleImage
