import styled from "styled-components";

export const NavbarHeader = styled.div`
  border-bottom: 1px solid #f0efef;
  box-shadow: 0px 4px 10px 0px #0000000f;
  box-shadow: 0px 2px 8px 0px #00000022;
  border-radius: 8px;
  height: 65px;
  margin-top: 20px;
`;
export const PublicHeader = styled.div`
  background-color: #fff;
  border-bottom: 1px solid #f0efef;
  box-shadow: 0px 4px 10px 0px #0000000f;

  .search-box {
    display: flex;
    align-items: center;
    gap: 14px;
    .search-feild {
      position: relative;
      .search-icons {
        position: absolute;
        top: 12px;
        left: 7px;
      }
    }
    .login {
      font-size: 14px;
      font-weight: 700;
      color: #e1473d;
    }
    input {
      border-radius: 25px;
      border: 1px solid #f3f2f2;
      padding: 13px 20px 13px 45px;
      outline: none;
      box-shadow: 13.49px 22.77px 27.83px 0px #0000000d;
    }
  }
  z-index: 99;

  @media (max-width: 450px) {
  }
  @media (max-width: 768px) {
    .sc-bMTdWJ.jZkdYU {
      height: 120px;
    }
  }
  @media (max-width: 9991px) {
  }
`;

export const Container = styled.div`
  padding: 0px 20px;
  margin: 0 auto;
`;
