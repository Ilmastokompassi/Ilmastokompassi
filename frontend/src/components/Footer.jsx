import { Box, Container, Stack, Typography } from '@mui/material'

export const Footer = () => (
    <Box component="footer" mt="auto">
        <Box sx={{ backgroundColor: 'primary.main' }}>
            <Container>
                <Stack paddingY={1}>
                    <Typography
                        textAlign={'center'}
                        variant="h6"
                        component="div"
                        color="white"
                    >
                        Ilmastokompassi
                    </Typography>
                </Stack>
            </Container>
        </Box>
    </Box>
)
