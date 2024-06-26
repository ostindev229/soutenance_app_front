import { useState, useRef } from "react";
import moment from "moment";
import { BiTimeFive } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Flex,
  Text,
  Image,
  VStack,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";
import Toast from "./Toast";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { deletePostById } from "../actions/jobs";
import UpdateModalJob from "./UpdateModalJob";

const JobDetailCard = (prop) => {
  const navigate = useNavigate();
  const post = prop.post;
  const dispatch = useDispatch();

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const cancelRef = useRef();

  const handlePostulateClick = () => {
    if (!Object.keys(post).includes("isApplied")) {
      toast(<Toast type="error" message="Connectez-vous pour postuler !" />);
      navigate("/signin");
      return;
    }

    if (post.isApplied === false) {
      navigate(`/postulate-form/${post._id}`);
    }
  };

  const handleDeleteClick = async () => {
    try {
      await dispatch(deletePostById(post._id));
      toast(
        <Toast type="success" message="L'offre a été supprimée avec succès" />
      );

      if (typeof prop.onClose === "function") {
        prop.onClose();
      }
    } catch (error) {
      toast(
        <Toast
          type="error"
          message="Erreur lors de la suppression de l'offre"
        />
      );
    }
  };

  const handleConfirmDelete = () => {
    setIsAlertOpen(true);
  };

  const handleCancelDelete = () => {
    setIsAlertOpen(false);
  };

  const handleUpdateClick = () => {
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    prop.onClose();
  };

  const handleDisplayRightButton = () => {
    if (post.isApplied === true) {
      return (
        <Box className="bg-gray-300 text-black font-semibold py-2 px-4 rounded">
          Vous avez déjà postulé à cette offre
        </Box>
      );
    } else if (post.totalParticipate === post.acceptedCandidateId.length) {
      return (
        <Box className="bg-gray-300 text-black font-semibold py-2 px-4 rounded">
          Cette offre n'est plus valable
        </Box>
      );
    } else {
      return (
        prop.postulateBtn && (
          <Button
            colorScheme="green"
            onClick={handlePostulateClick}
            className="font-semibold py-2 px-4 rounded"
          >
            Postuler
          </Button>
        )
      );
    }
  };

  return (
    <Box className="p-8 rounded-2xl shadow-lg bg-white w-full max-w-5xl mx-auto">
      <Flex direction={{ base: "column", md: "row" }} align="center">
        <Box flexShrink={0} mb={{ base: 6, md: 0 }} mr={{ md: 8 }}>
          <Image
            src={post.selectedFile}
            alt="Company Logo"
            className="w-60 h-60 rounded-full shadow-md"
          />
        </Box>
        <VStack align="flex-start" spacing={4} flex={1}>
          <HStack justify="space-between" align="center" width="100%">
            <Text as="h1" fontSize="3xl" fontWeight="bold">
              {post.category}
            </Text>
            <Flex align="center" color="gray.500">
              {moment(post.createdAt).fromNow()}
              <BiTimeFive className="text-2xl ml-2 shadow-md" />
            </Flex>
          </HStack>
          <Text fontSize="lg" color="gray.500">
            {post.location}
          </Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} width="100%">
            <Box>
              <Text fontSize="lg" fontWeight="bold">
                Compétences recherchées
              </Text>
              <Text fontSize="md" color="gray.600">
                {post.competenceSearch}
              </Text>
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="bold">
                Description
              </Text>
              <Text fontSize="md" color="gray.600">
                {post.description}
              </Text>
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="bold">
                Participants totaux
              </Text>
              <Text fontSize="md" color="gray.600">
                {post.totalParticipate}
              </Text>
            </Box>
          </SimpleGrid>
          <Box width="100%" textAlign="center" mt={4}>
            {handleDisplayRightButton()}
          </Box>
          {prop.isRecruiter && (
            <HStack spacing={4} mt={4} width="100%" justify="center">
              <Button
                colorScheme="blue"
                onClick={handleUpdateClick}
                className="font-semibold py-2 px-4 rounded"
              >
                Mettre à jour
              </Button>
              <Button
                colorScheme="red"
                onClick={handleConfirmDelete}
                className="font-semibold py-2 px-4 rounded"
              >
                Supprimer
              </Button>
            </HStack>
          )}
        </VStack>
      </Flex>

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={handleCancelDelete}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirmer la suppression
            </AlertDialogHeader>
            <AlertDialogBody>
              Êtes-vous sûr de vouloir supprimer cette offre ?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleCancelDelete}>
                Annuler
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleDeleteClick();
                  handleCancelDelete();
                }}
                ml={3}
              >
                Supprimer
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <UpdateModalJob
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        post={post}
      />
    </Box>
  );
};

export default JobDetailCard;
