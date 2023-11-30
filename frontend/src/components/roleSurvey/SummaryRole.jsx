import { Typography, Box, Stack } from '@mui/material'
import RoleImage from './RoleImage'
import { theme } from '../../theme'
import { RolePropTypes } from '../../types'

export const SummaryRole = ({ role }) => {
    return (
        <Stack
            spacing={2}
            alignItems="center"
            direction={{ xs: 'column', sm: 'column', md: 'row' }}
            sx={{
                [theme.breakpoints.up('md')]: {
                    flexDirection: role.id % 2 === 0 ? 'row' : 'row-reverse',
                },
            }}
        >
            <RoleImage role={role} />
            <Box>
                <Typography variant="h5">{role.name}</Typography>
                <Typography>{role.description}</Typography>
            </Box>
        </Stack>
    )
}

SummaryRole.propTypes = {
    role: RolePropTypes,
}
