import { getPostulatesByJobOfferId } from "../actions/postulate";
import { useEffect, useState } from "react";
import Participant from "./Participant";
import { validateJobApplicationAction } from "../actions/postulate";
import { rejectJobApplicationAction } from "../actions/postulate";

function ParticipantList(prop) {
  const [participants, setParticipants] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPostulateData = async () => {
      try {
        setIsLoading(true);
        const data = await getPostulatesByJobOfferId(prop.jobOfferId);
        setIsLoading(false);
        setParticipants(() => [...data.data]);
        console.log(data);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    getPostulateData();
  }, [prop.jobOfferId]);

  const showParticipant = () => {
    if (isLoading) {
      return <h3>En cours de chargement</h3>;
    }

    if (!participants) {
      return null;
    }

    if (participants.length === 0) {
      return <p>Aucun participant inscrit à cette offre pour le moment</p>;
    }

    return participants.map((participant) => (
      <Participant
        key={participant._id}
        surname={participant.surname}
        name={participant.name}
        applyDate={participant.applyDate}
        selectedCvFile={participant.selectedCvFile}
        candidateId={participant.candidateId}
        jobOfferId={prop.jobOfferId}
        validateJobApplicationAction={validateJobApplicationAction}
        rejectJobApplicationAction={rejectJobApplicationAction}
        id={participant._id}
        status={participant.status}
        contact={participant.contact}
      />
    ));
  };

  return <>{showParticipant()}</>;
}

export default ParticipantList;
