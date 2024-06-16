import { BiTimeFive, BiErrorCircle, BiCheckCircle } from "react-icons/bi";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Chip,
} from "@material-ui/core/";
import moment from "moment";
import useStyles from "./Style/style.js";
import { Button } from "@chakra-ui/react";

const InfoJobCard = (prop) => {
  const classes = useStyles();

  const renderStatusMessage = () => {
    switch (prop.post.status) {
      case "IN_PROGRESS":
        return (
          <Typography className="flex items-center font-bold">
            <BiTimeFive className="mr-2 text-yellow-500 text-2xl" />
            En attente de validation (au moins 5h)
          </Typography>
        );
      case "REJECT":
        return (
          <Typography className="flex items-center font-bold">
            <BiErrorCircle className="mr-2 text-red-500 text-2xl" />
            Votre offre a été rejetée
          </Typography>
        );
      case "ACCEPT":
        return (
          <Typography className="flex items-center font-bold">
            <BiCheckCircle className="mr-2 text-green-500 text-2xl" />
            Offre validée avec succès
          </Typography>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={
          prop.post.selectedFile ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        title={prop.post.creator}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{prop.post.creator}</Typography>
        <Typography variant="body2" className="flex items-center">
          <BiTimeFive className="mr-1" />
          {moment(prop.post.createdAt).fromNow()}
        </Typography>
      </div>

      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {prop.post.location.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography
        className={classes.title}
        gutterBottom
        variant="h5"
        component="h2"
      >
        <Chip style={{ fontSize: 20 }} label={prop.post.category}></Chip>
      </Typography>
      <CardContent>
        <Typography
          className="text-2xl"
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {prop.post.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          onClick={prop.viewMore}
          className="border-[2px] rounded-[10px] block p-[10px] w-full text-[14px] font-semibold bg-blue-800 text-white hover:bg-blue-600 hover:text-white transition-colors duration-200 mt-4"
        >
          View More
        </Button>
      </CardActions>
      {prop.isRecruiter && <CardContent>{renderStatusMessage()}</CardContent>}
    </Card>
  );
};

export default InfoJobCard;
