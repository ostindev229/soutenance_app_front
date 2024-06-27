import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;

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
  height: 550px;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  @media (max-width: 768px) {
    flex-direction: row;
    height: 100%;
    display: block;
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

const UserDescription = () => {
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

            <p className="text-black">
              "Bienvenue sur notre plateforme ! Vous pouvez consulter les offres
              d'emploi après vous être connecté à votre compte. Utilisez les
              filtres pour affiner vos recherches et postulez directement en
              suivant les instructions fournies pour chaque offre. Sur votre
              tableau de bord, suivez en temps réel le statut de vos
              candidatures. En cas de succès ou d'échec, vous recevrez une
              notification par email. Pour les candidatures réussies, un
              représentant vous contactera via WhatsApp pour planifier la suite
              des démarches."
            </p>
          </blockquote>
        </Description>
        <ImageWrapper>
          <StyledImage
            src="https://th.bing.com/th/id/OIG1.wJEfBipSP0A2Q.jUE3Fh?pid=ImgGn"
            alt="Styled Image"
          />
        </ImageWrapper>
      </Content>
    </Container>
  );
};

export default UserDescription;
