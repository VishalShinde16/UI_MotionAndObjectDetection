import { styled } from "styled-components";

import Main from "./MyComponents/Main";
import Navbar from "./MyComponents/Navbar";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

`;
function App() {
  return (
    <Container>
      <Wrapper>
        <Navbar />
        <Main />
      </Wrapper>
    </Container>
  );
}

export default App;
