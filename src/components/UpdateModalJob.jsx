import { useState } from "react";
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
import { TextField, Typography, Paper, Grid } from "@material-ui/core";
import FileBase from "react-file-base64";
import { updatePost } from "../actions/jobs";
import { useDispatch } from "react-redux";

import { ChakraProvider } from "@chakra-ui/react";

const UpdateForm = (prop) => {
  const [updatedData, setUpdatedData] = useState(prop.post);
  console.log(updatedData);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updatePost(prop.post._id, updatedData));

      prop.onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        noValidate
        style={{ padding: "20px" }}
      >
        <Typography variant="h6">Mettre à jour le poste</Typography>
        <Grid container spacing={2} style={{ marginBottom: "20px" }}>
          <Grid item xs={6}>
            <TextField
              name="creator"
              variant="outlined"
              label="Créateur"
              fullWidth
              value={updatedData.creator}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, creator: e.target.value })
              }
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="category"
              variant="outlined"
              label="Catégorie"
              fullWidth
              value={updatedData.category}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, category: e.target.value })
              }
            />
          </Grid>
        </Grid>
        <TextField
          name="description"
          variant="outlined"
          label="Description"
          fullWidth
          multiline
          minRows={4}
          style={{ marginBottom: "20px" }}
          value={updatedData.description}
          onChange={(e) =>
            setUpdatedData({ ...updatedData, description: e.target.value })
          }
        />
        <TextField
          name="location"
          variant="outlined"
          label="Location (comma separated)"
          fullWidth
          style={{ marginBottom: "20px" }}
          value={updatedData.location}
          onChange={(e) =>
            setUpdatedData({ ...updatedData, location: e.target.value })
          }
        />
        <div style={{ marginBottom: "20px" }}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setUpdatedData({ ...updatedData, selectedFile: base64 })
            }
          />
        </div>
        <TextField
          name="finalDate"
          variant="outlined"
          type="date"
          fullWidth
          style={{ marginBottom: "20px" }}
          value={updatedData.finalDate.split("T")[0]}
          onChange={(e) =>
            setUpdatedData({ ...updatedData, finalDate: e.target.value })
          }
        />
        <Grid container spacing={2} style={{ marginBottom: "20px" }}>
          <Grid item xs={6}>
            <TextField
              name="typeTemps"
              label="Type de contrat"
              variant="outlined"
              style={{ marginBottom: "20px" }}
              fullWidth
              value={updatedData.typeTemps}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, typeTemps: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="totalParticipate"
              label="Nombre de participants"
              variant="outlined"
              type="number"
              fullWidth
              style={{ marginBottom: "20px" }}
              value={updatedData.totalParticipate}
              onChange={(e) =>
                setUpdatedData({
                  ...updatedData,
                  totalParticipate: e.target.value,
                })
              }
            />
          </Grid>
        </Grid>
        <TextField
          name="competenceSearch"
          multiline
          minRows={4}
          variant="outlined"
          label="Compétences requises"
          fullWidth
          style={{ marginBottom: "20px" }}
          value={updatedData.competenceSearch}
          onChange={(e) =>
            setUpdatedData({ ...updatedData, competenceSearch: e.target.value })
          }
        />
        <Button
          type="submit"
          variant="contained"
          className="mr-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Submit
        </Button>
        <Button
          variant="contained"
          className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

const UpdateModalJob = (prop) => {
  return (
    <ChakraProvider>
      <Modal
        closeOnOverlayClick={false}
        onClose={prop.onClose}
        size="xl"
        isOpen={prop.isOpen}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Mettre à jour le poste</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UpdateForm post={prop.post} onClose={prop.onClose} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={prop.onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default UpdateModalJob;
