import { COLORS } from "@/constants/utilitys"
import styled from "styled-components"

export const CardProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minMax(200px, 1fr));
  gap: 10px;
`

export const CardProductBase = styled.div``

export const CardProductBody = styled.div`
  align-items: flex-start;
  background-color: ${COLORS.background};
  border-radius: 5px;
  box-shadow: 1px 1px 5px 0.1rem hsla(0, 0%, 0%, 0.112);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  position: relative;
  transition: all 2s ease;
  width: 100%;
  &:hover > figure > img {
    transform: scale(1.1);
  }
`

export const CardProductFigure = styled.figure`
  border-radius: 5px 5px 0 0;
  height: 150px;
  margin: 0;
  overflow: hidden;
  width: 100%;
`

export const CardProductFigureImg = styled.img`
  border-radius: 5px 5px 0 0;
  height: 100%;
  object-fit: cover;
  transition: all 0.25s ease;
  width: 100%;
`

export const CardProductName = styled.div`
  background-color: ${COLORS.primary};
  color: ${COLORS.background};
  font-size: 1em;
  font-weight: 700;
  padding: 0.5em;
  text-align: center;
  width: 100%;
  margin-bottom: 10px;
`

export const CardProductPriceAndIngredient = styled.div`
  color: ${COLORS.dark};
  font-size: 14px;
  text-align: center;
  width: 100%;
`

export const CardProductIngredients = styled.div`
  color: ${COLORS.dark};
`

export const CardProductPrice = styled.div`
  color: ${COLORS.dark};
  font-size: 1.5rem;
  font-weight: 700;
  opacity: 0.8;
  padding: 0.5rem;
  text-align: center;
  width: 100%;
`

export const CardProductBottom = styled.div`
  align-items: flex-end;
  display: flex;
  height: auto;
  justify-content: space-around;
  padding: 0.5rem;
  width: 100%;
`
export const CardProductBottomCategory = styled.div`
  border-radius: 5px;
  color: white;
  padding: 0.5rem;
`

export const CardProductBottomStatus = styled.div``
