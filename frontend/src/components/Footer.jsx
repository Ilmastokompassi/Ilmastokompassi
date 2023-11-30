import { Box, Container, Stack, Typography } from '@mui/material'

export const Footer = () => (
    <Box component="footer" position="static" bottom={0} left={0} width="100%">
        <Box sx={{ backgroundColor: 'primary.main' }}>
            <Container>
                <Stack paddingY={1}>
                    <Typography variant="h6" component="div" color="white">
                        Ilmastokompassi
                    </Typography>
                </Stack>
            </Container>
        </Box>
    </Box>
)
