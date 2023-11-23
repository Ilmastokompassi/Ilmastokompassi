import { Card, CardContent, Box, Button, Skeleton } from '@mui/material'
import { Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'

export const ToSurveyCard = ({ name, description, image, destination }) => {
    const componentRef = useRef(null)
    const [width, setWidth] = useState(0)

    useEffect(() => {
        const handleResize = () => {
            if (componentRef.current) {
                setWidth(componentRef.current.clientWidth)
            }
        }

        window.addEventListener('resize', handleResize)
        handleResize()

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <Button href={destination} ref={componentRef} sx={{ flex: '1' }}>
            <Card
                variant="outlined"
                sx={{
                    boxShadow: 1,
                    width: '100%',
                    minHeight: '150px',
                    display: 'flex',
                }}
            >
                {width > 400 &&
                    (image ? (
                        <Box>
                            <img src={image} width={150} height={150} />
                        </Box>
                    ) : (
                        <Box>
                            <Skeleton
                                variant="rectangular"
                                width={150}
                                height={150}
                            />
                        </Box>
                    ))}

                <Box
                    display={'flex'}
                    sx={{ flexDirection: 'column', overflowWrap: 'break-word' }}
                >
                    <CardContent
                        sx={{
                            flex: '1 0 auto',
                            flexDirection: 'column',
                        }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: {
                                    xs: '1.25em',
                                    sm: '1.5em',
                                    md: '1.75em',
                                },
                            }}
                        >
                            {name}
                        </Typography>
                        <Typography
                            variant="h4"
                            sx={{
                                fontSize: {
                                    xs: '1em',
                                    sm: '1.25em',
                                    md: '1.5em',
                                },
                            }}
                        >
                            {description}
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        </Button>
    )
}

ToSurveyCard.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    destination: PropTypes.string,
    image: PropTypes.string,
}
