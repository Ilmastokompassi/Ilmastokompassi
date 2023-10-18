import PropTypes from 'prop-types'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, Colors)

export const SummaryPie = ({ data }) => (
    <Pie
        data={{
            labels: data.map((x) => x.label),
            datasets: [
                {
                    label: '%',
                    data: data.map((x) => x.value),
                    borderWidth: 10,
                },
            ],
        }}
        options={{
            plugins: {
                legend: {
                    labels: {
                        boxHeight: 40,
                        usePointStyle: true,
                        font: {
                            size: 20, // Adjust the font size as needed
                        },
                    },
                },
            },
        }}
    />
)

// Validate the data prop
SummaryPie.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.number.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
}

export default SummaryPie
