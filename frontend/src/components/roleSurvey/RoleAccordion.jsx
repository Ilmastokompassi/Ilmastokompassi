import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { theme } from '../../theme'
import RoleImage from './RoleImage'
import { RolePropTypes } from '../../types'

// Shorter descriptions on this page per customers request.

const roleDescription = {
    1: 'Ilmastoasiantuntija on kiinnostunut ilmastonmuutoksen tieteellisestä puolesta. Hän janoaa viisautta ilmaston toiminnasta ja puoltaa päätöksentekoa, joka perustuu tieteelliseen tietoon.',
    2: 'Mielipidevaikuttaja on kiinnostunut osallistumaan ilmastonmuutokseen liittyvään päätöksentekoon. Kaikki keinot ovat käytössä! Ilmasto ja yhteiskunta toimivat yhdessä. On tärkeää toimia, jotta molemmat voivat säilyä.',
    3: 'Voi olla, että muiden valinnat eivät niinkään kestävän elämäntavan etsijää lämmitä, mutta oman kortensa hän kantaa kekoon. Jokaisen omalla toimijuudella on merkitystä. Tämä elämäntavan etsijä on valmis muuntamaan omaa arkeaan kestävyyden nimissä.',
    4: 'Eettinen kuluttaja etsii kompromisseja kuluttajuuden tiellä. Arjen mukavuudesta ei noin vain luovuta, mutta ei ilmastoakaan voi huomiotta jättää. Eettinen kuluttaja uskoo kompromissiin, jolla ekologiset valinnat pääsevät osaksi nykyisenlaista elämää.',
}

const RoleAccordion = ({ role }) => (
    <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${role.id}-content`}
        >
            <Typography variant="h6">{role.name}</Typography>
        </AccordionSummary>
        <AccordionDetails
            id={`panel-${role.id}-content`}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                [theme.breakpoints.up('sm')]: {
                    justifyContent: 'space-between',
                    alignItems: 'stretch',
                    flexDirection: 'row',
                    ...(role.id % 2 === 0 && {
                        flexDirection: 'row-reverse',
                    }),
                },
            }}
        >
            <Typography paddingX={2} paddingBottom={2}>
                {roleDescription[role.id]}
            </Typography>
            <RoleImage role={role} />
        </AccordionDetails>
    </Accordion>
)

RoleAccordion.propTypes = {
    role: RolePropTypes,
}

export default RoleAccordion
