import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import JobDetailCard from "./JobDetail";
import ParticipantList from "./ParticipantList";

const CreateModalJobDetail = (prop) => {
  return (
    <ChakraProvider>
      <Modal
        closeOnOverlayClick={false}
        onClose={prop.onClose}
        size="full" // This sets the modal to take up full screen width
        isOpen={prop.isOpen}
      >
        <ModalOverlay />
        <ModalContent maxWidth="80%">
          <ModalHeader>Create Job</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <JobDetailCard
              post={prop.post}
              onClose={prop.onClose}
              postulateBtn={prop.postulateBtn}
              isRecruiter={prop.isRecruiter}
            />
            {prop.showParticipantList && (
              <ParticipantList jobOfferId={prop.post._id} />
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={prop.onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default CreateModalJobDetail;
