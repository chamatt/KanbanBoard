import styled from "styled-components";
import { Badge as TBadge } from "@chakra-ui/core";

export const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const selectBadgeColor = (priority) => {
  return (
    {
      high: "red",
      medium: "blue",
      low: "green",
    }[priority] || "blue"
  );
};

export const Badge = styled(TBadge).attrs((props) => ({
  variantColor: selectBadgeColor(props.priority),
  rounded: "md",
  fontSize: "10px",
  p: "5px",
  variant: "subtle",
}))``;
