import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { theme } from '../theme'
import RoleImage from './RoleImage'
import { RolePropTypes } from '../types'

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
            <Typography paddingX={2}>{role.description}</Typography>
            <RoleImage role={role} />
        </AccordionDetails>
    </Accordion>
)

RoleAccordion.propTypes = {
    role: RolePropTypes,
}

export default RoleAccordion
