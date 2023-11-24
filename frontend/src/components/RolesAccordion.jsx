import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
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
        <Box paddingBottom={5}>
            {roleList &&
                roleList.map((role) => (
                    <Accordion key={role.id}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel-${role.id}-content`}
                            id={`panel-${role.id}-header`}
                        >
                            <Typography variant="h6">{role.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails
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
                                        flexDirection: 'row-reverse',
                                    }),
                                },
                            }}
                        >
                            <ClimateRole description={role.description} />
                            <Stack>
                                <RoleImage title={role.name} />
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                ))}
        </Box>
    )
}

export default RolesAccordion
