import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  border: none;
  margin-left: 8px !important;
  margin-right: 8px !important;
  background-color: transparent;
  margin: 0;
  color: #0D99FF;
  font-weight: bold;
  font-size: 1.4rem;

  &:hover {
    cursor: pointer;
  }

  &[disabled] {
    cursor: revert;
    transform: revert;
    color:gray;
  }

  &[aria-current] {
    background: #0D99FF;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
  
`;

const Num_Button = styled.button`
  border: none;
  border-radius: 50%;
  margin-left: 4px !important;
  margin-right: 4px !important;
  width: 30px;
  height: 30px;
  margin: 0;
  background-color: transparent;
  color: black;
  font-size: 1rem;

  &:hover {
    background: #0D99FF;
    cursor: pointer;
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: #0D99FF;
    font-weight: bold;
    color:white;
    cursor: revert;
    transform: revert;
  }

  
`;

function Pagination({ total, limit, page, setPage,setTotalcount,totalcount }) {
  const numPages = Math.ceil(total / limit);

  return (
    <>
      <Nav>
        <Button onClick={() => {
          setPage(page - 1);
          setTotalcount(totalcount+limit);
        }} disabled={page === 1}>
          &lt;
        </Button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <Num_Button
              key={i + 1}
              onClick={() => {
                setPage(i + 1);
                setTotalcount(total-(i*limit))
                console.log(Array(numPages).length)
                // setTotalcount(total-limit);

                }
              }
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </Num_Button>
          ))}
        <Button onClick={() => {
          setPage(page + 1);
        setTotalcount(totalcount-limit);
        }} disabled={page === numPages}>
          &gt;
        </Button>
      </Nav>
    </>
  );
}




export default Pagination;