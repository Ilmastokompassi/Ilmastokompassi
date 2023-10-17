import PropTypes from 'prop-types'
import { PieChart, pieArcClasses } from '@mui/x-charts/PieChart'

export default function SummaryPie(props) {
    const { data } = props

    console.log('SummaryPie data:', data)
    const series = [
        {
            data: data.map((item) => ({
                value: item.value,
                label: item.label,
            })),
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30 },
        },
    ]
    return (
        <PieChart
            series={series}
            sx={{
                [`& .${pieArcClasses.faded}`]: {
                    fill: 'gray',
                },
            }}
            height={200}
        />
    )
}

// Validate the data prop
SummaryPie.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.number.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
}
