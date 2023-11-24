import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { SummaryRole } from './SummaryRole'
import { theme } from '../theme'
import useSWR from 'swr'

const RolesAccordion = () => {
    const { data } = useSWR('/api/roles')
    const roleList = data

    return (
        <Box paddingBottom={5}>
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
                                        flexDirection: 'row-reverse',
                                    }),
                                },
                            }}
                        >
                            <SummaryRole
                                index={role.id}
                                title={role.name}
                                description={role.description}
                            />
                        </AccordionDetails>
                    </Accordion>
                ))}
        </Box>
    )
}

export default RolesAccordion
