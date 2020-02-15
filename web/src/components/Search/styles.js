import styled from "styled-components";

export const Container = styled.div`
  &::before {
    content: "";
    width: 15px;
    height: 15px;
    transform: rotate(45deg);
    background: #fff;
    border: 1px solid #e6e6e6;
    position: absolute;
    top: -9px;
    right: 50%;
  }

  &::after {
    content: "";
    width: 30px;
    height: 15px;
    background: red;
    position: absolute;
    background: #fff;
    top: 0px;
    right: 48%;
    z-index: 0;
  }

  position: absolute;
  top: 50px;
  background: #fff;
  left: -50px;
  width: 280px;
  height: 250px;
  border-radius: 5px;
  border: 1px solid #e6e6e6;

  z-index: 2;

  -webkit-box-shadow: 3px 5px 8px -4px rgba(44, 44, 44, 0.55);
  -moz-box-shadow: 3px 5px 8px -4px rgba(44, 44, 44, 0.55);
  box-shadow: 3px 5px 8px -4px rgba(44, 44, 44, 0.55);
`;

export const ContainerResult = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: flex-start;
  align-items: flex-start;
  overflow: auto;
  width: 100%;
  height: 100%;
`;

export const ContainerProfile = styled.div`
  width: 100%;
  display: flex;
  padding: 12px 12px;
  z-index: 1;
  border-bottom: 1px solid #e6e6e6;
  cursor: pointer;
  text-decoration: none;
`;

export const ContainerEmpty = styled(ContainerProfile)`
  text-align: center;
  color: #c2c2c2;
  font-size: 12px;
  font-weight: bold;
`;
