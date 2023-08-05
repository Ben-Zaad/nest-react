import styled from "styled-components";

export const CurvedContainer = styled.div`
  border-radius: 20px;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`

export const ScrollableContainer = styled.div`
  overflow-y: scroll;
  height: 100%;

  ::-webkit-scrollbar {
    width: 2rem;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d6dee1;
    border-radius: 2rem;
    border: 0.6rem solid transparent;
    background-clip: content-box;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #a8bbbf;
  }
`
