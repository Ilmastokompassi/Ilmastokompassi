import {
    Card,
    CardContent,
    CardMedia,
    CardActionArea,
    Typography,
    Stack,
} from '@mui/material'
import PropTypes from 'prop-types'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

export const ToSurveyCard = ({
    name,
    description,
    to,
    icon,
    iconBackgroundColor,
}) => (
    <Card
        elevation={1}
        sx={{
            width: '100%',
            height: '100%',
        }}
    >
        <CardActionArea href={to}>
            <Stack direction="row">
                <CardMedia
                    sx={{
                        height: 128,
                        minWidth: 128,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: iconBackgroundColor,
                        color: iconBackgroundColor && 'rgba(0, 0, 0, 0.66)',
                    }}
                >
                    {icon}
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                    <Stack
                        height="100%"
                        direction="row"
                        justifyContent="space-between"
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

ToSurveyCard.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    to: PropTypes.string,
    icon: PropTypes.element.isRequired,
    iconBackgroundColor: PropTypes.string,
}
