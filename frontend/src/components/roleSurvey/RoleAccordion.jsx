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

const RoleAccordion = ({ role }) => (
    <Accordion elevation={5}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${role.id}-content`}
        >
            <Typography paddingY={1} variant="h2" sx={{ fontSize: ['1.5rem', '2rem'] }}>
                {role.name}
            </Typography>
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
                {role.description}
            </Typography>
            <RoleImage role={role} />
        </AccordionDetails>
    </Accordion>
)

RoleAccordion.propTypes = {
    role: RolePropTypes,
}

export default RoleAccordion
