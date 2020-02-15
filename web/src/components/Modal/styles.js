import styled from "styled-components";
import Modal from "styled-react-modal";

export const StyledModal = Modal.styled`
  width: 20rem;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  opacity: ${props => props.opacity};
  transition: opacity ease 500ms;
  border-radius: .5rem;
`;

export const MoreOptions = styled.ul`
  width: 100%;
  text-align: center;
  color: #2c2c2c;
  font-weight: bold;
  font-size: 14px;

  li {
    list-style: none;
    padding: 20px;
    border-bottom: 1px solid #e6e6e6;
    border-radius: 10px;
    cursor: pointer;
    a {
      text-decoration: none;
      color: #2c2c2c;
    }
    transition: all 250ms ease-in-out;
    &.red {
      color: #fc4850;
    }
    &:hover {
      background-color: #e6e6e6;
    }
  }
`;
