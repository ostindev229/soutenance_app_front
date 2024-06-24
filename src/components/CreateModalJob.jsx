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

import * as Yup from "yup";
import { useFormik } from "formik";
import { ChakraProvider } from "@chakra-ui/react";

import { TextField, Typography, Paper, Grid } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost } from "../actions/jobs";
import Toast from "./Toast";
import { toast } from "sonner";

const Form = (prop) => {
  const initialValues = {
    creator: "",
    category: "",
    description: "",
    location: "",
    selectedFile: "",
    finalDate: "",
    totalParticipate: 1,
    typeTemps: "",
    competenceSearch: "",
  };

  const validationSchema = Yup.object().shape({
    creator: Yup.string().required("This field is required"),
    category: Yup.string().required("This field is required"),
    description: Yup.string().required("This field is required"),
    location: Yup.string().required("This field is required"),
    finalDate: Yup.date().required("This field is required"),
    totalParticipate: Yup.number().required("This field is required"),
    typeTemps: Yup.string().required("This field is required"),
    competenceSearch: Yup.string().required("This field is required"),
  });

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    //e.preventDefault();

    console.log("Values", values);

    const post = { ...values, selectedFile };

    setLoading(true);
    try {
      await dispatch(createPost(post));
      prop.onClose();
      toast(<Toast type="success" message="L'offre a été créé avec succès!" />);

      clear();
    } catch (error) {
      console.error("Error creating post:", error);
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      ...initialValues,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const clear = () => {
    formik.resetForm();
    setSelectedFile("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  console.log("Errors formik", formik.errors);

  return (
    <Paper>
      <form
        autoComplete="off"
        noValidate
        style={{ padding: "20px" }}
        onSubmit={handleFormSubmit}
      >
        <Typography variant="h6">Creating a Job</Typography>
        <Grid container spacing={2} style={{ marginBottom: "20px" }}>
          <Grid item xs={6}>
            <TextField
              name="creator"
              variant="outlined"
              label="Creator"
              fullWidth
              value={formik.values.creator}
              onChange={formik.handleChange}
            />
            {formik.touched.creator && formik.errors.creator && (
              <div className="error">{formik.errors.creator}</div>
            )}
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="category"
              variant="outlined"
              label="Category"
              fullWidth
              value={formik.values.category}
              onChange={formik.handleChange}
            />
            {formik.touched.category && formik.errors.category && (
              <div className="error">{formik.errors.category}</div>
            )}
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
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        {formik.touched.description && formik.errors.description && (
          <div className="error">{formik.errors.description}</div>
        )}

        <TextField
          name="location"
          variant="outlined"
          label="Location (comma separated)"
          fullWidth
          style={{ marginBottom: "20px" }}
          value={formik.values.location}
          onChange={formik.handleChange}
        />
        {formik.touched.location && formik.errors.location && (
          <div className="error">{formik.errors.location}</div>
        )}

        <div style={{ marginBottom: "20px" }}>
          <FileBase
            name="selectedFile"
            type="file"
            multiple={false}
            onDone={({ base64 }) => setSelectedFile(() => base64)}
          />
        </div>

        <TextField
          name="finalDate"
          variant="outlined"
          type="date"
          fullWidth
          style={{ marginBottom: "20px" }}
          value={formik.values.finalDate}
          onChange={formik.handleChange}
        />
        {formik.touched.finalDate && formik.errors.finalDate && (
          <div className="error">{formik.errors.finalDate}</div>
        )}

        <Grid container spacing={2} style={{ marginBottom: "20px" }}>
          <Grid item xs={6}>
            <TextField
              name="typeTemps"
              label="Type de contrats"
              variant="outlined"
              fullWidth
              value={formik.values.typeTemps}
              onChange={formik.handleChange}
            />
            {formik.touched.typeTemps && formik.errors.typeTemps && (
              <div className="error">{formik.errors.typeTemps}</div>
            )}
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="totalParticipate"
              label="Nombre de participant"
              variant="outlined"
              type="number"
              fullWidth
              value={formik.values.totalParticipate}
              onChange={formik.handleChange}
            />
            {formik.touched.totalParticipate &&
              formik.errors.totalParticipate && (
                <div className="error">{formik.errors.totalParticipate}</div>
              )}
          </Grid>
        </Grid>

        <TextField
          name="competenceSearch"
          multiline
          minRows={4}
          variant="outlined"
          label="Compétence recquis"
          fullWidth
          value={formik.values.competenceSearch}
          onChange={formik.handleChange}
        />

        {formik.touched.competenceSearch && formik.errors.competenceSearch && (
          <div className="error">{formik.errors.competenceSearch}</div>
        )}
        <div>
          <Button
            type="submit"
            variant="contained"
            className="mr-4 mt-6 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? <CircularProgress size={5} color="white" /> : "Submit"}
          </Button>
          <Button
            onClick={clear}
            variant="contained"
            className="bg-red-500 hover:bg-red-700 mt-6 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            Clear
          </Button>
        </div>
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
