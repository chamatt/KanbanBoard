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

// const selectBadgeColor = (priority) => {
//   return (
//     {
//       high: "#fa9191",
//       medium: "#6886c5",
//       low: "#58b4ae",
//     }[priority] || "#6886c5"
//   );
// };
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
}))`
  /* background-color: ${(props) => selectBadgeColor(props.priority)}; */
  /* width: 30px; */
  /* border-radius: 5px;
  padding: 5px;
  font-size: 10px;
  color: white; */
  /* display: inline-flex; */
  /* justify-content: center;
  align-items: center;
  align-self: flex-end; */
`;
