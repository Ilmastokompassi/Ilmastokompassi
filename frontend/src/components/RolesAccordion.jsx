import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    Stack,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { ClimateRole } from './ClimateRole'
import { theme } from '../theme'
import RoleImage from '../components/RoleImage'
import useSWR from 'swr'

const RolesAccordion = () => {
    const { data } = useSWR('/api/roles')
    const roleList = data

    return (
        <div>
            {roleList &&
                roleList.map((role) => (
                    <Accordion key={role.id}>
                        <AccordionSummary // This is the header
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel-${role.id}-content`}
                            id={`panel-${role.id}-header`}
                        >
                            <Typography>{role.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails // This is the body
                            sx={{
                                display: { xs: 'flex', md: 'flex' },
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                [theme.breakpoints.up('sm')]: {
                                    justifyContent: 'space-between',
                                    alignItems: 'stretch',
                                    flexDirection: 'row',
                                    ...(role.id % 2 === 0 && {
                                        // This is for alternating
                                        flexDirection: 'row-reverse', // Do we need this?
                                    }),
                                },
                                paddingBottom: '40px',
                            }}
                        >
                            <ClimateRole
                                description={role.description}
                                name={role.name}
                            />
                            <Stack>
                                <RoleImage title={role.name} />
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                ))}
        </div>
    )
}

export default RolesAccordion
