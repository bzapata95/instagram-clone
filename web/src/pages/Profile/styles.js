import styled from "styled-components";

export const Container = styled.div`
  max-width: 700px;
  width: 100%;
  padding-top: 100px;
  margin: 0 auto;
`;

export const DescriptionContainer = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  padding: 5px 20px;
  margin-bottom: 30px;

  @media (min-width: 735px) {
    grid-template-columns: 200px 1fr;
  }
`;

export const ImageProfile = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;

  @media (min-width: 735px) {
    width: 150px;
    height: 150px;
    grid-row: 1 / 3;
  }
`;

export const CountsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
`;

export const Username = styled.p`
  font-size: 24px;
  font-weight: normal;

  @media (min-width: 735px) {
    display: inline-block;
  }
`;

export const Button = styled.button`
  background: transparent;
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  margin: 10px 0;
  cursor: pointer;
  @media (min-width: 735px) {
    width: 100px;
    margin: 0 0 10px 20px;
  }
`;

export const ButtonisFollow = styled(Button)``;

export const ButtonFollow = styled(Button)`
  border: 1px solid #3897f0;
  background: #3897f0;
  color: #fff;
`;

export const Description = styled.div`
  grid-column: 1 / 3;
  margin: 20px 0;
  p {
    font-size: 20px;
    margin-bottom: 10px;
  }

  @media (min-width: 735px) {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }
`;

export const ContainerPhotos = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  @media (min-width: 735px) {
    gap: 10px;
  }
`;

export const Photo = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  object-position: center;
  cursor: pointer;

  @media (min-width: 735px) {
    height: 230px;
    width: 100%;
  }
`;
