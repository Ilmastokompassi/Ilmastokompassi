import PropTypes from 'prop-types'
import { Stack, List, ListItem, ListItemText, ListItemIcon } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, Colors)


export const SummaryDoughnut = ({ data }) => (
    <Stack
        maxWidth={{
            xs: '80vw',
            sm: '90vw',
            md: '80vw',
        }}
        maxHeight={{
            xs: '140vw',
            sm: '45vw',
            md: '35vw',
        }}
        direction={{ xs: 'column-reverse', sm:'row', md: 'row' }}
        spacing={1}
        sx={{ minWidth: 0 }}
    >
        <Doughnut
            data={{
                labels: data.map((x) => x.label),
                datasets: [
                    {
                        label: '%',
                        data: data.map((x) => x.value),
                        borderWidth: 1,
                        backgroundColor: data.map((x) => x.color),
                    },
                ],
            }}
            options={{
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false,
                        labels: {
                            usePointStyle: true,
                            font: {
                                size: 16, // Adjust the font size as needed
                            },
                            color: 'black',
                        },
                        position: 'top'
                    },
                },
            }}
            aria-label="Rooliosuudet"
            role="img"
        />
        <List dense='true'>
            {data.map((x) => (
                <ListItem key={x}>
                    <ListItemIcon>
                        <CircleIcon sx={{color: x.color}} fontSize='large' />
                    </ListItemIcon>
                    <ListItemText primary={`${x.label}, ${Math.round(x.value)}%`} />
                </ListItem>
            ))}
        </List>
    </Stack>
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
