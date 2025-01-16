import styled from "styled-components";
import Bodybgimage from "assets/images/headerbg.png";

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
`;
export const Section = styled.div`
  width: 100%;
  display: flex;
`;

export const MainSection = styled.div`
  background-image: url(${Bodybgimage});
  background-size: 100%;
  background-repeat: no-repeat;
  .ant-layout {
    background: #fff;
  }
  .hover-links:hover,
  .active-parent:hover {
    background: linear-gradient(to right, #54408c, #7e72f2);
    color: white;
    border-radius: 4px;
  }
  .active {
    background: linear-gradient(to right, #54408c, #7e72f2);
    color: white;
    border-radius: 4px;
  }
  .parent-active {
    background: #ececec;
    border-radius: 4px;
  }
  .child-active {
    background: linear-gradient(to right, #54408c, #7e72f2);
    color: white;
    border-radius: 4px;
  }
  .active-parent {
    background: #ececec;
    border-radius: 4px;
    color: black;
  }

  .active svg path,
  .child-active svg path {
    stroke: white;
  }
`;
export const Container = styled.div`
  max-width: 100%;
`;
