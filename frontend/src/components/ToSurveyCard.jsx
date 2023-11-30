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
            elevation={1}
            sx={{
                width: '100%',
                height: 'auto',
                minHeight: '18.75rem',
            }}
        >
            <CardActionArea href={to}>
                <Stack direction={isDesktop ? 'row' : 'column'}>
                    <CardMedia
                        sx={{
                            height: '18.75rem',
                            width: isDesktop ? '18.75rem' : '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {icon}
                    </CardMedia>
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Stack
                            height="100%"
                            direction="row"
                            justifyContent="space-around"
                            alignItems="center"
                        >
                            <Stack>
                                <Typography variant="h5">{name}</Typography>
                                {description}
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
