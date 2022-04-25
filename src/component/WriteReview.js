import styled from 'styled-components';
import Header from "./Header";
import Footer from "./Footer";

const Div = styled.div`
  /* 전체 Div 스타일 */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center; 
  align-items: center;
  width: 100%;
  height: 78vh;  
  text-align: center;
  font-family: 'Segoe UI';
`;

const IntroDiv = styled.div`
  /* 소개글 Block Div 스타일 */
  width: 600px; height: 400px;
  position: absolute;
  padding: 20px 50px; 
  background: white;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0px 5px 10px;
  text-align: left;
  font-weight: bold;
`

const P = styled.p`
  font-size: 1rem;
  font-weight: lighter;
  float: left;
  margin-right: 25px;
`

const Text = styled.input`
    border: none;
    outline: none;
    font-size: 20px;
    font-weight: bold;
    font-family: 'Segoe UI';
    color: #554646;
    margin-top: 7px;
`

const Save = styled.button`
    width: 50px;
    background-color: #4c8969;
    color: white;
    border-radius: 10px;
    padding: 6px;
    opacity: 1;
    border: 0;
    outline: 0;
    margin: 5px 0 10px 0;
    float: right;
`

const Textarea = styled.textarea`
 height: 250px;
 width: 300px;
 border-radius: 20px;
`
const Radio = styled.input`
  display: none;
`

const Label = styled.label`
 padding: 5px 10px 5px 10px;
 border: 1px solid #707070;
 font-size: 0.8rem;
`
function WriteReview(props) {
  
  return (
    <div>
    <Header />
    <Div>
      <IntroDiv>
        <form style={{
        display: 'flex', flexDirection: 'column'}}
        >
        <div><Text type="text" placeholder="후기 작성" /><Save>저장</Save></div>
        <hr width="100%" />
        <div><h3 style={{float: 'left'}}>총점</h3><h3 style={{textAlign: 'center'}}>코멘트</h3></div>
        <div><Textarea style={{float: 'right'}}></Textarea><h3 style={{marginBottom: '1px'}}>시설 여부</h3><P>화장실<br/><br/>주차공간<br/><br/>음수대<br/><br/>먹거리시설<br/><br/>물, 음료 파는 곳</P>
        <P><Radio type="radio" name="radio" id="opt1" /><Label style={{borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px', marginRight: '-1px'}}><span>YES</span></Label>
        <Radio type="radio" name="radio" id="opt2" /><Label style={{borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}}><span>NO</span></Label>
        <br /><br /><Radio type="radio" name="radio" id="opt1" /><Label style={{borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px', marginRight: '-1px'}}><span>YES</span></Label>
        <Radio type="radio" name="radio" id="opt2" /><Label style={{borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}}><span>NO</span></Label>
        <br /><br /><Radio type="radio" name="radio" id="opt1" /><Label style={{borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px', marginRight: '-1px'}}><span>YES</span></Label>
        <Radio type="radio" name="radio" id="opt2" /><Label style={{borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}}><span>NO</span></Label>
        <br /><br /><Radio type="radio" name="radio" id="opt1" /><Label style={{borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px', marginRight: '-1px'}}><span>YES</span></Label>
        <Radio type="radio" name="radio" id="opt2" /><Label style={{borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}}><span>NO</span></Label>
        <br /><br /><Radio type="radio" name="radio" id="opt1" /><Label style={{borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px', marginRight: '-1px'}}><span>YES</span></Label>
        <Radio type="radio" name="radio" id="opt2" /><Label style={{borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}}><span>NO</span></Label></P>
        
        </div>
        </form>
      </IntroDiv>     
    </Div>
    <Footer />
    </div>
  );
}

export default WriteReview;