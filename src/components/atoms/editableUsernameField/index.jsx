import { Editable, EditableInput, EditablePreview, Flex, IconButton, ButtonGroup, useEditableControls } from "@chakra-ui/react"
import {
    CheckIcon, CloseIcon, EditIcon
} from '@chakra-ui/icons'
import { addUser } from "../../../api/yarn-swap-api"
import React, { useState } from 'react';


export function EditableUsernameField(props) {
    const { currentUser } = props;
    const { userName, setUsername } = useState("")
    let user = {};
    async function addUsername(values) {
        user.remainingTokens = 0;
        user.ID = currentUser.uid;
        // TODO how to get username from editable component
        user.userName = values.userName;
        console.log("username", user.userName)
        await addUser(user)
        // on submit of editable add username to user object
    }

    function EditableControls({ isEditing, onSubmit, onCancel, onEdit, getSubmitButtonProps }) {
        return isEditing ? (
            <ButtonGroup justifyContent="center" size="sm">
                <IconButton icon={<CheckIcon />} onClick={getSubmitButtonProps} />
                <IconButton icon={<CloseIcon />} onClick={onCancel} />
            </ButtonGroup>
        ) : (
            <Flex justifyContent="center">
                <IconButton size="sm" icon={<EditIcon />} onClick={onEdit} />
            </Flex>
        )
    }

    return (
        <Editable
            onSubmit={addUsername}
            //value={}
            onChange={((newValue) => setUsername(newValue))}
            textAlign="center"
            defaultValue="Please Add a Username"
            fontSize="lg"
            isPreviewFocusable={false}
            submitOnBlur={false}

        >
            {(props) => (
                <>
                    <EditablePreview />
                    <EditableInput type='text' value='userName' />
                    <EditableControls {...props} />
                </>
            )}
        </Editable>
    )
}