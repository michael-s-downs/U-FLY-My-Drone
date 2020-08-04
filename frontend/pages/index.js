import DroneState from '../components/DroneState';
import Commands from '../components/Commands';
import JmuxerPlayer from '../components/JmuxerPlayer';
import styled, { createGlobalStyle } from 'styled-components';
//import $ from jquery;


const GlobalStyle = createGlobalStyle`
  body {
    background: white;
    /* font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; */
    font-family: 'Operator Mono', monospace;
    font-weight: 900;
    font-size: 1rem;
    background:#193549;
    color: white;
  }
  * {
    font-family: 'Operator Mono', monospace;
    box-sizing: border-box;
  }
  h2 {
    text-align: center;
    font-style: italic;
  }
  h3 {
    text-align: center;
    font-style: italic;
  }  
`;
/*
Just an experiment to mix in jQuery to see how pre-DOM and post-DOM manipulations play together.
componentDidMount() {
  $("button").click(function() {
    $(function(){
      $("#includedContent").load("b.html"); 
    });
  });
} */

const PageStyles = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const IndexPage = () => (
  <PageStyles>
    <h2>U-FLY MY DRONE Node + React</h2>
    <GlobalStyle />
    <Commands />
    <JmuxerPlayer />
	  <DroneState />
  </PageStyles>
);
//    
export default IndexPage;
