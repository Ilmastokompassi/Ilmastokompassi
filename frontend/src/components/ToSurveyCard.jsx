import {
    Card,
    CardContent,
    Box,
    CardMedia,
    CardActionArea,
    Typography,
    Stack,
    CardActions,
    Button,
} from '@mui/material'
import PropTypes from 'prop-types'

export const ToSurveyCard = ({ name, description, cardMedia, to }) => (
    <Card
        sx={{
            width: '100%',
            height: '100%',
        }}
    >
        <CardActionArea href={to}>
            <Stack direction="row" justifyContent="flex-end">
                <CardMedia>
                    <Box
                        width={150}
                        height={150}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        {cardMedia}
                    </Box>
                </CardMedia>
                <CardContent
                    sx={{
                        display: 'flex',
                        flexGrow: 1,
                        flexDirection: 'column',
                    }}
                >
                    <Typography variant="h5">{name}</Typography>
                    <Typography variant="body2">{description}</Typography>
                </CardContent>
            </Stack>
        </CardActionArea>
    </Card>
)

ToSurveyCard.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    to: PropTypes.string,
    cardMedia: PropTypes.element.isRequired,
}
