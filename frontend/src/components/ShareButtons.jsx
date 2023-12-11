import { IconButton, Popover, Stack, Tooltip, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import toParams from '../utils/toParams'
import FacebookIcon from '@mui/icons-material/Facebook'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import TelegramIcon from '@mui/icons-material/Telegram'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkIcon from '@mui/icons-material/Link'
import { Box } from '@mui/system'
import { useState } from 'react'

export const ShareButtons = ({ url, text }) => {
    const socials = [
        {
            name: 'Facebook',
            url:
                'https://www.facebook.com/sharer/sharer.php' +
                toParams({ u: url, quote: text }),
            iconElement: (
                <FacebookIcon sx={{ color: '#4267B2' }} fontSize="large" />
            ),
        },
        {
            name: 'Twitter',
            url:
                'https://twitter.com/intent/tweet' +
                toParams({ url, text: text }),
            iconElement: (
                <TwitterIcon sx={{ color: '#1DA1F2' }} fontSize="large" />
            ),
        },
        {
            name: 'WhatsApp',
            url:
                'https://api.whatsapp.com/send' +
                toParams({ text: text ? text + ' ' + url : url }),
            iconElement: (
                <WhatsAppIcon sx={{ color: '#25D366' }} fontSize="large" />
            ),
        },
        {
            name: 'Telegram',
            url:
                'https://telegram.me/share/' +
                toParams({ url: url, text: text }),
            iconElement: (
                <TelegramIcon sx={{ color: '#0088cc' }} fontSize="large" />
            ),
        },
    ]

    const [anchorEl, setAnchorEl] = useState(null)

    return (
        <Box>
            <Stack
                direction={{ sm: 'column', md: 'row' }}
                justifyContent="center"
                alignItems="center"
                spacing={1}
                sx={{ width: '100%' }}
            >
                <Typography>Jaa tuloksesi:</Typography>
                <Stack spacing={2} direction="row">
                    {socials.map((social) => (
                        <Tooltip key={social.name} title={social.name}>
                            <IconButton
                                target="about:blank"
                                href={social.url}
                                data-testid={social.name}
                            >
                                {social.iconElement}
                            </IconButton>
                        </Tooltip>
                    ))}
                    <Tooltip title="Kopioi linkki">
                        <IconButton
                            data-testid="copy-link"
                            onClick={(event) => {
                                navigator.clipboard.writeText(url)
                                setAnchorEl(event.currentTarget)

                                setTimeout(() => setAnchorEl(null), 2000)
                            }}
                        >
                            <LinkIcon fontSize="large" />
                        </IconButton>
                        <Popover
                            open={Boolean(anchorEl)}
                            anchorEl={anchorEl}
                            onClose={() => setAnchorEl(null)}
                            anchorOrigin={{
                                vertical: 'center',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'center',
                            }}
                        >
                            <Typography p={1}>Linkki kopioitu!</Typography>
                        </Popover>
                    </Tooltip>
                </Stack>
            </Stack>
        </Box>
    )
}

ShareButtons.propTypes = {
    url: PropTypes.string,
    text: PropTypes.string,
}
