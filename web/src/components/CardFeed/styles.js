import styled from "styled-components";

export const Card = styled.div`
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  float: left;
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
  width: 100%;

  @media (max-width: 640px) {
    margin-bottom: 0;
    border: 0;
  }

  @media (min-width: 640px) and (max-width: 736px) {
    margin-bottom: 15px;
    border: 1px solid #e6e6e6;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

export const CardControls = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 16px;
`;

export const CardDetails = styled.div`
  font: 400 14px "Roboto";
  padding: 4px 16px;
  letter-spacing: 0.3px;
`;

export const CardFooter = styled.div`
  width: 100%;
  border-top: 1px solid #f6f6f6;
  padding: 2px 16px;

  form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    input {
      &[type="text"] {
        height: 60px;
        width: 100%;
        border: none;
        font: 400 13.333px "Roboto";
        outline: 0px;
        color: #262626;
      }
    }
    button {
      background-color: transparent;
      color: #3897f0;
      font: bold 13px "Roboto";
      border: none;
      outline: 0px;
      cursor: pointer;
      letter-spacing: 0.4px;
      &:disabled {
        color: #e6e6e6;
      }
    }
  }

  @media (max-width: 736px) {
    display: none;
  }
`;

export const TimeAgo = styled.span`
  color: #999999;
  font-size: 10px;
  letter-spacing: 0.2px;
  text-transform: uppercase;
`;
