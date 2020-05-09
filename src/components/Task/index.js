import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Container, Badge } from "./styles";
import { Text, Box, Flex, PseudoBox, useColorMode } from "@chakra-ui/core";

function Task({ task, index }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const color = { dark: "white", light: "gray.800" };
  const bgColor = { light: "whiteAlpha.900", dark: "gray.800" };
  return (
    <Draggable draggableId={task.id} index={index}>
      {({ draggableProps, dragHandleProps, innerRef }) => (
        <Flex
          bg={bgColor[colorMode]}
          direction="column"
          p={2}
          mb={2}
          boxShadow="md"
          rounded
          {...draggableProps}
          {...dragHandleProps}
          ref={innerRef}
        >
          <Text fontSize="sm">{task?.content}</Text>
          <Flex justify="flex-end">
            <Badge priority={task.priority}>{task.priority}</Badge>
          </Flex>
        </Flex>
      )}
    </Draggable>
  );
}

export default Task;
