import { Box, Container, Stack, Typography } from '@mui/material'

export const Footer = () => (
    <Box component="footer" position="fixed" bottom={0} left={0} width="100%">
        <Box sx={{ backgroundColor: 'primary.main' }}>
            <Container>
                <Stack paddingY={2}>
                    <Typography variant="h5" component="div" color="white">
                        Ilmastokompassi
                    </Typography>
                </Stack>
            </Container>
        </Box>
    </Box>
)
