import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import ProductCard from "../components/cards/ProductsCard";
import { category, filter } from "../utils/data";
import { CircularProgress, Slider } from "@mui/material";
import { getAllProducts } from "../api";
import { useValueChanged } from "../hooks/useValueChanged";

const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 30px;
  @media (max-width: 700px) {
    flex-direction: column;
    padding: 20px 12px;
  }
  background: ${({ theme }) => theme.bg};
`;
const Filters = styled.div`
  padding: 20px 16px;
  flex: 1;
  width: 100%;
  max-width: 300px;
  @media (max-width: 700px) {
    max-width: 440px;
  }
`;
const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const Products = styled.div`
  flex: 1;
  padding: 20px 0px;
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
  @media (max-width: 760px) {
    gap: 16px;
  }
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
`;
const Item = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const Selectableitem = styled.div`
  cursor: pointer;
  display: flex;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  color: ${({ theme }) => theme.text_secondary + 90};
  border-radius: 8px;
  padding: 2px 8px;
  font-size: 16px;
  width: fit-content;
  ${({ selected, theme }) =>
    selected &&
    `
  border: 1px solid ${theme.text_primary};
  color: ${theme.text_primary};
  background: ${theme.text_primary + 30};
  font-weight: 500;
  `}
`;

const FoodListing = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Dessert"); // Default selected categories

  const getFilteredProductsData = async () => {
    setLoading(true);
    // Call the API function for filtered products
    await getAllProducts(selectedCategory)
    .then((res) => {
      const limitedData = res.data.meals.slice(0, 6);
      setProducts(limitedData);
      setLoading(false);
    });
  };
  
  useEffect(() => {
    getFilteredProductsData()
  }, [selectedCategory])

  return (
    <Container>
      <Filters>
        <Menu>
          {filter.map((filters) => (
            <FilterSection>
              <Title>{filters.name}</Title>
              {filters.value === "category" ? (
                <Item>
                  {filters.items.map((item) => (
                    <Selectableitem
                      key={item}
                      selected={selectedCategory.includes(item)}
                      onClick={
                        () => {
                          setSelectedCategory(item)
                        }
                      }
                    >
                      {item}
                    </Selectableitem>
                  ))}
                </Item>
              ) : null}
            </FilterSection>
          ))}
        </Menu>
      </Filters>
      <Products>
        <CardWrapper>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {products.map((product) => (
                <ProductCard key={product.idMeal} product={product} />
              ))}
            </>
          )}
        </CardWrapper>
      </Products>
    </Container>
  );
};

export default FoodListing;
