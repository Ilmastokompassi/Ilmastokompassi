import { Typography, Stack } from '@mui/material'
import RoleImage from './RoleImage'
import { theme } from '../../theme'
import { RolePropTypes } from '../../types'

export const SummaryRole = ({ role }) => {
    return (
        <Stack
            spacing={2}
            padding={{xs: 0, sm: 1, md: 2}}
            alignItems="center"
            direction={{ xs: 'column', sm: 'column', md: 'row' }}
            sx={{
                [theme.breakpoints.up('md')]: {
                    flexDirection: role.id % 2 === 0 ? 'row' : 'row-reverse',
                },
            }}
        >
            <RoleImage role={role} />
            <Stack spacing={2} padding={{xs: 1, sm: 1, md: 2}}>
                <Typography variant="h2">{role.name}</Typography>
                <Typography variant="h3">{role.description}</Typography>
            </Stack>
        </Stack>
    )
}

SummaryRole.propTypes = {
    role: RolePropTypes,
}
