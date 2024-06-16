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
  CircularProgress,
} from "@chakra-ui/react";

import { ChakraProvider } from "@chakra-ui/react";

import { TextField, Typography, Paper, Grid } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost } from "../actions/jobs";

const Form = (prop) => {
  const [postData, setPostData] = useState({
    creator: "",
    category: "",
    description: "",
    location: "",
    selectedFile: "",
    finalDate: "",
    totalParticipate: 0,
    typeTemps: "",
    competenceSearch: "",
  });

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(createPost(postData));
      prop.onClose();
      clear();
    } catch (error) {
      console.error("Error creating post:", error);
    }
    setLoading(false);
  };

  const clear = () => {
    setPostData({
      creator: "",
      category: "",
      description: "",
      location: "",
      selectedFile: "",
      finalDate: "",
      totalParticipate: "",
      typeTemps: "",
      competenceSearch: "",
    });
  };

  return (
    <Paper>
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        style={{ padding: "20px" }}
      >
        <Typography variant="h6">Creating a Job</Typography>
        <Grid container spacing={2} style={{ marginBottom: "20px" }}>
          <Grid item xs={6}>
            <TextField
              name="creator"
              variant="outlined"
              label="Creator"
              fullWidth
              value={postData.creator}
              onChange={(e) =>
                setPostData({ ...postData, creator: e.target.value })
              }
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="category"
              variant="outlined"
              label="Category"
              fullWidth
              value={postData.category}
              onChange={(e) =>
                setPostData({ ...postData, category: e.target.value })
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
          value={postData.description}
          onChange={(e) =>
            setPostData({ ...postData, description: e.target.value })
          }
        />
        <TextField
          name="location"
          variant="outlined"
          label="Location (comma separated)"
          fullWidth
          style={{ marginBottom: "20px" }}
          value={postData.location}
          onChange={(e) =>
            setPostData({ ...postData, location: e.target.value })
          }
        />
        <div style={{ marginBottom: "20px" }}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <TextField
          name="finalDate"
          variant="outlined"
          type="date"
          fullWidth
          style={{ marginBottom: "20px" }}
          value={postData.finalDate}
          onChange={(e) =>
            setPostData({ ...postData, finalDate: e.target.value })
          }
        />
        <Grid container spacing={2} style={{ marginBottom: "20px" }}>
          <Grid item xs={6}>
            <TextField
              name="typeTemps"
              label="Type de contrats"
              variant="outlined"
              fullWidth
              value={postData.typeTemps}
              onChange={(e) =>
                setPostData({ ...postData, typeTemps: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="totalParticipate"
              label="Nombre de participant"
              variant="outlined"
              type="number"
              fullWidth
              value={postData.totalParticipate}
              onChange={(e) =>
                setPostData({
                  ...postData,
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
          label="Compétence recquis"
          fullWidth
          value={postData.competenceSearch}
          onChange={(e) =>
            setPostData({ ...postData, competenceSearch: e.target.value })
          }
        />

        <Button
          type="submit"
          variant="contained"
          className="mr-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? <CircularProgress size={5} color="white" /> : "Submit"}
        </Button>
        <Button
          onClick={clear}
          variant="contained"
          className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

const CreateModalJob = (prop) => {
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
          <ModalHeader>Create Job </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form onClose={prop.onClose} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={prop.onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default CreateModalJob;
