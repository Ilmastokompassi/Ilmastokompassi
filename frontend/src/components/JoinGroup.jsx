import { Button, Stack, TextField } from '@mui/material'
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
            .then((response) => response.json())
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
        <>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-evenly"
                alignItems="center"
                spacing={2}
            >
                <TextField
                    data-testid="group-token-input"
                    label="Ryhmätunnus"
                    placeholder="Syötä ryhmätunnus"
                    error={!isValid}
                    helperText={!isValid && 'Ryhmään liittyminen epäonnistui.'}
                    value={groupToken}
                    onChange={handleTextFieldChange}
                    size="small"
                />
                <Button
                    data-testid="join-group"
                    onClick={handleSubmit}
                    color="secondary"
                    variant="contained"
                >
                    Liity ryhmään
                </Button>
            </Stack>
            <GroupDialog />
        </>
    )
}

export default JoinGroup
