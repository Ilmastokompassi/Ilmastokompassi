import ClimateExpert from '../assets/ilmastoasiantuntija.png'
import SustainableSearcher from '../assets/kestavanelamantavanetsija.png'
import EthicalConsumer from '../assets/eettinenkuluttaja.png'
import OpinionInfluencer from '../assets/mielipidevaikuttaja.png'
import { Box } from '@mui/material'
import { RolePropTypes } from '../types'

const roles = {
    1: ClimateExpert,
    2: OpinionInfluencer,
    3: SustainableSearcher,
    4: EthicalConsumer,
}

const RoleImage = ({ role }) => (
    <Box
        component="img"
        src={roles[role.id]}
        alt={role.title}
        width={250}
        height={250}
        borderRadius={2}
    />
)

RoleImage.propTypes = {
    role: RolePropTypes,
}

export default RoleImage
