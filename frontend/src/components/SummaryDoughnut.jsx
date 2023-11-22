import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, Colors)

export const SummaryDoughnut = ({ data }) => (
    <Box
        position="relative"
        width={{
            xs: '60vw',
            sm: '50vw',
            md: '40vw',
        }}
        height={{
            xs: '60vw',
            sm: '50vw',
            md: '40vw',
        }}
    >
        <Doughnut
            data={{
                labels: data.map((x) => x.label),
                datasets: [
                    {
                        label: '%',
                        data: data.map((x) => x.value),
                        borderWidth: 1,
                    },
                ],
            }}
            options={{
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true,
                            font: {
                                size: 16, // Adjust the font size as needed
                            },
                            color: 'black',
                        },
                    },
                },
            }}
        />
    </Box>
)

SummaryDoughnut.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.number.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
}

export default SummaryDoughnut
