import { Box, Container, Stack, Typography } from '@mui/material'
import { theme } from '../theme'
import Compass from '../assets/kompassi.png'

export const Footer = () => (
    <Box component="footer" mt="auto">
        <Box sx={{ backgroundColor: 'primary.main' }}>
            <Container>
                <Stack
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        flexDirection: 'column',
                        paddingY: 1,
                        [theme.breakpoints.up('sm')]: {
                            flexDirection: 'row',
                        },
                    }}
                >
                    <img src={Compass} alt="ilmastokompassi" width={40} />
                    <Typography variant="subtitle1" color="white">
                        INAR- Ilmakehätieteiden tutkimuskeskus
                    </Typography>
                    <Typography variant="subtitle1" color="white">
                        © Helsingin yliopisto
                    </Typography>
                    <a
                        href="https://www.helsinki.fi/fi/inar"
                        className="footer_link"
                        style={theme.typography.footer_link}
                    >
                        INAR
                    </a>
                    <a
                        href="https://blogs.helsinki.fi/climatecompetencies/about/"
                        className="footer_link"
                        style={theme.typography.footer_link}
                    >
                        ClimComp
                    </a>
                </Stack>
            </Container>
        </Box>
    </Box>
)
