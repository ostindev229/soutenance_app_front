import { useState, useRef } from "react";
import moment from "moment";
import { BiTimeFive } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Button, Box, Flex, Text, Image } from "@chakra-ui/react";
import { toast } from "react-toastify";
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
      toast.error("Connectez-vous", {
        position: "top-right",
        autoClose: 8000,
      });
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
      toast.success("L'offre a été supprimée avec succès");
      if (typeof prop.onClose === "function") {
        prop.onClose();
      }
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'offre");
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
    <Box className="p-8 rounded-2xl shadow-lg bg-white">
      <Flex direction={{ base: "column", md: "row" }} align="center">
        <Box flexShrink={0}>
          <Image
            src={post.selectedFile}
            alt="Company Logo"
            className="w-40 h-40 rounded-full shadow-md"
            mr={8}
          />
        </Box>
        <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
          <Flex justify="space-between" align="center" mb={4}>
            <Text as="h1" fontSize="2xl" fontWeight="bold">
              {post.category}
            </Text>
            <Flex align="center" color="gray.500">
              {moment(post.createdAt).fromNow()}
              <BiTimeFive className="text-2xl ml-2 shadow-md" />
            </Flex>
          </Flex>
          <Text fontSize="lg" color="gray.500" mb={4}>
            {post.location}
          </Text>
          <Text fontSize="md" color="gray.600" borderTop="2px" pt={4}>
            {post.description}
          </Text>
          <Box mt={4} spaceY={2}>
            <Text fontSize="lg" fontWeight="bold">
              Compétences recherchées:{" "}
              <Text as="span" fontWeight="normal">
                {post.competenceSearch}
              </Text>
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              Type de temps:{" "}
              <Text as="span" fontWeight="normal">
                {post.typeTemps}
              </Text>
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              Participants totaux:{" "}
              <Text as="span" fontWeight="normal">
                {post.totalParticipate}
              </Text>
            </Text>
          </Box>
          <Box mt={6}>{handleDisplayRightButton()}</Box>
          {prop.isRecruiter && (
            <Flex gap={4} mt={4}>
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
            </Flex>
          )}
        </Box>
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
