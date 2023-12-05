import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    Box,
    Stack,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import GroupForm from '../GroupForm'

const GroupAccordion = () => {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-1-content"
                id="panel-1-content"
            >
                <Typography align="center" fontWeight={500}>
                    Vastaa ryhmässä
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Stack
                    alignItems="center"
                    spacing={4}
                    padding={{ xs: 0, md: 4 }}
                >
                    <Box>
                        <Typography>
                            Ilmastoroolikyselyn voi tehdä ryhmässä. Jokainen
                            vastaaja saa oman roolin ja näkee anonyymin
                            yhteenvedon ryhmässä esiintyneistä rooleista. Ryhmän
                            tulokset tulevat näkyviin, kun vähintään viisi
                            ryhmän jäsentä on vastannut kyselyyn. Ryhmän
                            yhteisiä tuloksia pääset tarkastelemaan myös
                            sivuston oikean yläkulman painikkeesta.
                        </Typography>

                        <Typography paddingTop={2}>
                            Mikäli teillä ei ole vielä valmiiksi luotua ryhmää,
                            voit tehdä sen painamalla &quot;Luo ryhmä&quot;
                            painiketta.
                        </Typography>
                    </Box>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent="space-evenly"
                        alignItems="center"
                        spacing={2}
                    >
                        <GroupForm />
                    </Stack>
                </Stack>
            </AccordionDetails>
        </Accordion>
    )
}

export default GroupAccordion
