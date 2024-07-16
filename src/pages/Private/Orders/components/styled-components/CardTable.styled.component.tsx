import { COLORS } from "@/constants"
import styled from "styled-components"

export const CardTableGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minMax(200px, 1fr));
  gap: 10px;
`

export const CardTableLayout = styled.span`
  position: relative;
`

export const CardTableBase = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 1rem;
  opacity: 1;
  &:hover > figure > img {
    transform: scale(1.1);
  }
  &:hover > div {
    border-bottom: 5px solid ${COLORS.primary};
  }
`

export const CardTableName = styled.div`
  position: absolute;
  color: ${COLORS.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1rem;
  width: 100%;
  font-size: 20px;
  font-weight: 800;
  word-break: break-word;
  z-index: 9999;
  text-shadow: 1px 1px 0px #212529a4;
`

export const CardTableStatusOn = styled.span`
  background-color: ${COLORS.warning};
  color: ${COLORS.background};
  position: absolute;
  padding: 0.2rem 0.5rem;
  top: 0px;
  right: 10px;
  font-weight: 800;
  border-radius: 5px;
  opacity: 1;
  z-index: 9999;
`
