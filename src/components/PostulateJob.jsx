import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  AppBar,
  Toolbar,
  CssBaseline,
  Grid,
  Link,
  Box,
  CircularProgress,
} from "@material-ui/core";
import FileBase from "react-file-base64";
import { makeStyles } from "@material-ui/core/styles";
import { submitPostulate } from "../actions/postulate";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    marginBottom: theme.spacing(4),
    backgroundColor: "#3f51b5",
  },
  toolbar: {
    justifyContent: "center",
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
  paper: {
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0px 3px 6px #00000029",
    borderRadius: "8px",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  header: {
    margin: theme.spacing(2, 0),
    textAlign: "center",
  },
  footer: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(3, 2),
    backgroundColor: "#f1f1f1",
    textAlign: "center",
  },
  footerLink: {
    margin: theme.spacing(1),
  },
  note: {
    color: "red",
    marginBottom: theme.spacing(2),
  },
}));

const PostulateJob = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { jobId } = useParams();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [applyData, setApplyData] = useState({
    name: "",
    surname: "",
    contact: "",
    applyDate: "",
    selectedCvFile: "",
    jobOfferId: jobId,
  });
  console.log(applyData);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { error } = useSelector((state) => state.postulates);

  const clear = () => {
    setApplyData({
      name: "",
      surname: "",
      contact: "",
      applyDate: "",
      selectedCvFile: "",
      jobOfferId: jobId,
    });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await dispatch(submitPostulate(applyData)).unwrap();
      setLoading(false);
      console.log("Vous aviez postulé avec succes");
      clear();
      navigate("/");
      toast("Vous aviez postulé avec succès!", {
        type: "success",
        position: "top-right",
        autoClose: "8000",
      });
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.message || "An error occurred while submitting.");
    }
  };

  const handleFileUpload = ({ base64, name }) => {
    const fileExtension = name.split(".").pop().toLowerCase();
    if (fileExtension !== "pdf") {
      setErrorMessage("Please upload a PDF file.");
      return;
    }
    setApplyData({ ...applyData, selectedCvFile: base64 });
    setErrorMessage("");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            JobBenin
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.container}>
        <Paper className={classes.paper}>
          <Typography variant="h4" className={classes.header}>
            Apply for Your Dream Job
          </Typography>
          <Typography variant="subtitle1" className={classes.header}>
            Fill out the form below to submit your application.
          </Typography>
          <form
            className={classes.form}
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  variant="outlined"
                  label="Name"
                  fullWidth
                  value={applyData.name}
                  onChange={(e) =>
                    setApplyData({ ...applyData, name: e.target.value })
                  }
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="surname"
                  variant="outlined"
                  label="Surname"
                  fullWidth
                  value={applyData.surname}
                  onChange={(e) =>
                    setApplyData({ ...applyData, surname: e.target.value })
                  }
                  margin="normal"
                />
              </Grid>
            </Grid>
            <TextField
              type="date"
              name="applyDate"
              variant="outlined"
              label="Date of Apply"
              fullWidth
              value={applyData.applyDate}
              onChange={(e) =>
                setApplyData({ ...applyData, applyDate: e.target.value })
              }
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              type="number"
              name="contact"
              variant="outlined"
              label="Contact"
              fullWidth
              value={applyData.contact}
              onChange={(e) =>
                setApplyData({ ...applyData, contact: e.target.value })
              }
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Typography variant="body2" className={classes.note}>
              NB: Un CV bien détaillé augmente vos chances de sélection.
            </Typography>
            <div className={classes.fileInput}>
              <FileBase
                type="file"
                multiple={false}
                onDone={handleFileUpload}
                ref={fileInputRef}
              />
            </div>
            {errorMessage && (
              <Typography variant="body2" color="error">
                {errorMessage}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              fullWidth
              className={classes.submit}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Apply Now"}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={clear}
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Clear"}
            </Button>
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
          </form>
        </Paper>
      </Container>
      <footer className={classes.footer}>
        <Typography variant="body1">
          &copy; {new Date().getFullYear()} JobBenin. All rights reserved.
        </Typography>
        <Box>
          <Link href="#" className={classes.footerLink} color="inherit">
            Contact Us
          </Link>
          <Link href="#" className={classes.footerLink} color="inherit">
            About Us
          </Link>
          <Link href="#" className={classes.footerLink} color="inherit">
            Privacy Policy
          </Link>
        </Box>
      </footer>
    </div>
  );
};

export default PostulateJob;
