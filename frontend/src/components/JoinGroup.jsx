import {
    Box,
    FormControl,
    FormHelperText,
    IconButton,
    InputBase,
    Paper,
    Stack,
    Typography,
} from '@mui/material'
import GroupDialog from '../components/GroupDialog'
import { useState } from 'react'

const JoinGroup = () => {
    const [groupToken, setGroupToken] = useState('')
    const [isValid, setIsValid] = useState(true)
    const [joinedToGroup, setJoinedToGroup] = useState(false)

    const handleTextFieldChange = (event) => {
        setGroupToken(event.target.value.toUpperCase())
        setIsValid(true)
        setJoinedToGroup(false)
    }

    const handleSubmit = () => {
        if (groupToken === '') {
            setIsValid(false)
            return
        }
        fetch(`/api/group/${groupToken}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Verkkoyhteysvirhe')
                }
                return response.json()
            })
            .then((data) => {
                if (data.group_token) {
                    localStorage.setItem('groupToken', groupToken)
                    window.dispatchEvent(new Event('setGroupToken'))
                    setGroupToken('')
                    setJoinedToGroup(true)
                } else {
                    setIsValid(false)
                }
            })
    }

    return (
        <Box paddingTop={2}>
            <Stack>
                <Stack
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                    direction={'row'}
                    spacing={4}
                >
                    <FormControl error={!isValid} variant="outlined">
                        <Paper
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <InputBase
                                id="input-group-token"
                                label="Ryhmätunnus"
                                variant="outlined"
                                placeholder="Syötä ryhmätunnus"
                                value={groupToken}
                                onChange={handleTextFieldChange}
                            />
                            <IconButton
                                id="btn-join-group"
                                type="button"
                                onClick={handleSubmit}
                            >
                                <Typography>Liity</Typography>
                            </IconButton>
                        </Paper>
                        {!isValid && (
                            <FormHelperText>
                                Ryhmään liittyminen epäonnistui!
                            </FormHelperText>
                        )}
                        {joinedToGroup && (
                            <FormHelperText>
                                Ryhmään liittyminen onnistui!
                            </FormHelperText>
                        )}
                        {isValid && !joinedToGroup && (
                            <FormHelperText>
                                <br></br>
                            </FormHelperText>
                        )}
                    </FormControl>
                    <GroupDialog />
                </Stack>
            </Stack>
        </Box>
    )
}

export default JoinGroup
