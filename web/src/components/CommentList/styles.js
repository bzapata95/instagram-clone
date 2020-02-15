import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  line-height: 20px;
  margin-bottom: 10px;
`;

export const Comment = styled.div`
  font-weight: bold;

  display: flex;
  justify-content: space-between;

  div {
    a {
      text-decoration: none;
      color: #262626;
    }
    span {
      color: #262626;
    }
  }

  span {
    color: #999999;
    font-weight: normal;
    letter-spacing: 0.2px;
    margin-left: 10px;
  }
`;

export const TimeAgo = styled.span`
  color: #999999;
  font-size: 10px;
  letter-spacing: 0.2px;
  text-transform: uppercase;
`;
