import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import PWAInstallerPrompt from 'react-pwa-installer-prompt'
import PrimaryButton from '../primaryButton'

const ReactPrompt = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    return (
        <PWAInstallerPrompt
            render={({ onClick }) => (
                <AlertDialog
                    motionPreset='slideInBottom'
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isOpen={isOpen}
                    isCentered
                >
                    <AlertDialogOverlay />
                    <AlertDialogContent>
                        <AlertDialogHeader>Install Yarn Swap</AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            Would you like to install Yarn Swap?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button label='No, Thanks!' ref={cancelRef} onClick={onClose} >No Thanks</Button>
                            <PrimaryButton label='Yes, Please!' colorScheme='blue' ml={3} onClick={onClick} />
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
            callback={({ isInstallAllowed, isInstallWatingConfirm, isInstalling, isInstallCancelled, isInstallSuccess, isInstallFailed }) => {
                if (isInstallAllowed && !isInstallWatingConfirm && !isInstalling && !isInstallCancelled && !isInstallSuccess && !isInstallFailed) {
                    onOpen()
                }
            }}
        />
    )
}

export default ReactPrompt