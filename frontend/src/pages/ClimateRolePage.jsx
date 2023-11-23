import { Typography, Container, Stack, Box } from '@mui/material'
import { ClimateRole } from '../components/ClimateRole'
import { theme } from '../theme'
import useSWR from 'swr'
import { useTitle } from '../hooks/useTitle'
import RoleImage from '../components/RoleImage'

export const ClimateRolePage = () => {
    useTitle('Ilmastoroolit')

    const { data } = useSWR('/api/roles')
    const roleList = data

    return (
        <Container>
            <Stack spacing={3} paddingBottom={'50px'}>
                <Typography variant="h1" align="center" paddingTop={'40px'}>
                    Ilmastoroolit
                </Typography>
                {roleList &&
                    roleList.map((role) => (
                        <Box
                            key={role.id}
                            sx={{
                                display: { xs: 'flex', md: 'flex' },
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                [theme.breakpoints.up('md')]: {
                                    justifyContent: 'space-between',
                                    alignItems: 'stretch',
                                    flexDirection: 'row',
                                    ...(role.id % 2 === 0 && {
                                        flexDirection: 'row-reverse',
                                    }),
                                },
                                paddingBottom: '40px',
                            }}
                        >
                            <Stack paddingBottom={'20px'} padding={'10px'}>
                                <RoleImage title={role.name} />
                            </Stack>
                            <Box padding={'10px'}>
                                <ClimateRole
                                    description={role.description}
                                    name={role.name}
                                />
                            </Box>
                        </Box>
                    ))}
            </Stack>
        </Container>
    )
}
