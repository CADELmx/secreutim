import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"
import { useRouter } from "next/router"

export const ModalError = ({ error }) => {
    const router = useRouter()
    return (
        error && <Modal defaultOpen isKeyboardDismissDisabled hideCloseButton isDismissable={false} backdrop="blur">
            <ModalContent>
                <ModalHeader>
                    Aviso
                </ModalHeader>
                <ModalBody>
                    {error}
                </ModalBody>
                <ModalFooter>
                    <Button variant="solid" size="sm" color="primary" onPress={() => { router.reload() }}>Recargar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
