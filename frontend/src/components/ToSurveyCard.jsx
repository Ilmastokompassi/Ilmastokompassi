import {
    Card,
    CardContent,
    CardMedia,
    CardActionArea,
    Typography,
    Stack,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import PropTypes from 'prop-types'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

export const ToSurveyCard = ({ name, description, to, icon }) => {
    const theme = useTheme()
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

    return (
        <Card
            elevation={5}
            sx={{
                width: '100%',
                height: 'auto',
                minHeight: '18.75rem',
            }}
        >
            <CardActionArea href={to} sx={{ padding: 0, margin: 0 }}>
                <Stack
                    direction={isDesktop ? 'row' : 'column'}
                    alignItems={'flex-start'}
                >
                    <CardMedia
                        sx={{
                            width: isDesktop ? '33%' : '100%',
                            display: 'grid',
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'flex-start',
                        }}
                    >
                        {icon}
                    </CardMedia>
                    <CardContent
                        sx={{ flexGrow: 1, width: isDesktop ? '67%' : '100%' }}
                    >
                        <Stack
                            height="100%"
                            width="100%"
                            direction="row"
                            justifyContent="space-around"
                            alignItems="center"
                        >
                            <Stack>
                                <Typography variant="h1" paddingBottom={3}>
                                    {name}
                                </Typography>
                                <Typography variant="h3" component="div">
                                    {description}
                                </Typography>
                            </Stack>
                            <ArrowForwardIcon />
                        </Stack>
                    </CardContent>
                </Stack>
            </CardActionArea>
        </Card>
    )
}

ToSurveyCard.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    to: PropTypes.string,
    icon: PropTypes.element.isRequired,
}
