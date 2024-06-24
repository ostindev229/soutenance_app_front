import React from "react";
import styled from "styled-components";
import recruiter from "../assets/recruiter.jpg";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 40px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 100%;
  max-width: 1600px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Description = styled.div`
  flex: 1;
  padding-right: 20px;
  font-size: 1.2em;
  line-height: 1.6;

  @media (max-width: 768px) {
    padding-right: 0;
    padding-bottom: 20px;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const StyledImage = styled.img`
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 400px;
  max-width: 100%;
  object-fit: cover;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const UserDescription2 = () => {
  return (
    <Container>
      <Content>
        <Description>
          <blockquote className="text-xl italic font-semibold text-gray-900 dark:text-white">
            <svg
              className="w-8 h-8 text-gray-400 dark:text-gray-600 mb-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 14"
            >
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
            <span></span>

            <p>
              "Bienvenue sur notre plateforme ! En tant que recruteur, vous avez
              le pouvoir de créer, modifier et supprimer des offres d'emploi
              après vous être connecté à votre compte. Consultez facilement les
              candidatures reçues pour les postes que vous avez créés et validez
              celles qui correspondent à vos critères. Pour chaque candidature
              validée, vous pourrez contacter directement les candidats via
              WhatsApp pour planifier les prochaines étapes, que ce soit un
              entretien ou une rencontre. Pour toute assistance supplémentaire,
              notre équipe de support est à votre disposition."
            </p>
          </blockquote>
        </Description>
        <ImageWrapper>
          <StyledImage src={recruiter} alt="Styled Image" />
        </ImageWrapper>
      </Content>
    </Container>
  );
};

export default UserDescription2;
