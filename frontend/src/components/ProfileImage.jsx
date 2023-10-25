import { Typography } from '@mui/material'
import EarthFlowers from '../assets/flowers_earth.jpg'
import EarthPeace from '../assets/peace_earth.jpg'
import EarthPlant from '../assets/plant_earth.jpg'
import EarthRecycle from '../assets/recycle_earth.jpg'
import PropTypes from 'prop-types'

const ProfileImage = ({ title }) => {
    const profiles = {
        'Ilmastoasiantuntija': EarthPeace,
        'Mielipidevaikuttaja': EarthPlant,
        'Kestävän elämäntavan etsijä': EarthRecycle,
        'Eettinen kuluttaja': EarthFlowers,
    }
    const profile = profiles[title]
    return (
        <>
            <img src={profile} alt={title} width={250} height={250} />
            <Typography variant="caption">Image by Freepik</Typography>
        </>
    )
}

ProfileImage.propTypes = {
    title: PropTypes.string.isRequired
}

export default ProfileImage