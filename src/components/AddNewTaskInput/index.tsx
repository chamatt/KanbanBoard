import React from "react";
import { PseudoBox, Icon, Text } from "@chakra-ui/core";

// import { Container } from './styles';

const AddNewTaskInput: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  return (
    <PseudoBox
      as="button"
      display="flex"
      width="100%"
      flexDirection="row"
      p={2}
      mb={2}
      boxShadow="xs"
      rounded="md"
      cursor="pointer"
      alignItems="center"
      _hover={{
        opacity: 0.5,
      }}
      opacity={8 / 10}
      onClick={onClick}
    >
      <Icon name="add" size="10px" />
      <Text fontSize="sm" pl={2}>
        Add New Task
      </Text>
    </PseudoBox>
    // </Button>
  );
};

export default AddNewTaskInput;
