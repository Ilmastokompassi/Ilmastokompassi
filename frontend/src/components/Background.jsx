import Forest from '../assets/background_forest.jpg'
import { styled } from '@mui/system'

export const Background = styled('div')({
    position: 'fixed',
    width: '100%',
    height: '100%',
    backgroundImage: `url(${Forest})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: -1,
    backgroundAttachment: 'fixed',
})


