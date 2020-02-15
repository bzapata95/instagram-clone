import styled from "styled-components";

export const Container = styled.form`
  width: 100%;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ImagePreview = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 5px;
  cursor: pointer;
  object-fit: cover;
  object-position: center;
`;

export const MessagePreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  width: 100%;
  padding: 16px;
  border: 1px dashed #2c2c2c;
  border-radius: 5px;
  color: #2c2c2c;
  cursor: pointer;
`;

export const Body = styled.textarea`
  width: 100%;
  padding: 16px 16px;
  height: 100px;
  font-family: "Roboto";
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  resize: none;
  margin: 10px 0;
`;

export const Button = styled.button`
  width: 100%;
  padding: 16px;
  font-weight: bold;
  background: ${props => (props.error ? "#FC4850" : "#3897f0")};
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;

  &:disabled {
    background: ${props => (props.error ? "#FC4850" : "#e6e6e6")};
  }
`;
