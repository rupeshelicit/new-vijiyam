import styled from "styled-components";

export const LoginPage = styled.div`
  @media screen and (max-width: 740px) {
    .items-center {
      flex-direction: column-reverse;
    }
    .mobile-responcive {
      width: 100%;
      // padding-top:20px;s
    }
    .logo {
      top: 100px;
    }
  }
  .logo {
    position: absolute;
    top: 30px;
  }
  .logo img {
    width: 160px;
    height: 51px;
  }
  .items-center {
    position: relative;
  }
`;
