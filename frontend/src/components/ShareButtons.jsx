import { IconButton, Stack, SvgIcon, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import toParams from '../utils/toParams'
import FacebookIcon from '@mui/icons-material/Facebook'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { Box } from '@mui/system'

export const ShareButtons = ({ url, title }) => {
    const socials = [
        {
            name: 'facebook',
            url:
                'https://www.facebook.com/sharer/sharer.php' +
                toParams({ u: url }),
            iconElement: (
                <FacebookIcon sx={{ color: '#4267B2' }} fontSize="large" />
            ),
        },
        {
            name: 'twitter',
            url:
                'https://twitter.com/intent/tweet' +
                toParams({ url, text: title }),
            iconElement: (
                <SvgIcon fontSize="large">
                    <svg>
                        <rect rx={2} ry={2} width={24} height={24} />
                        <path
                            fill="white"
                            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                        />
                    </svg>
                </SvgIcon>
            ),
        },
        {
            name: 'whatsapp',
            url:
                'https://api.whatsapp.com/send' +
                toParams({ text: title ? title + ' ' + url : url }),
            iconElement: (
                <WhatsAppIcon sx={{ color: '#25D366' }} fontSize="large" />
            ),
        },
    ]

    return (
        <Box>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                sx={{ width: '100%' }}
            >
                <Typography>Jaa tuloksesi:</Typography>
                {socials.map((social) => (
                    <IconButton key={social.name} href={social.url}>
                        {social.iconElement}
                    </IconButton>
                ))}
            </Stack>
        </Box>
    )
}

ShareButtons.propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
}
