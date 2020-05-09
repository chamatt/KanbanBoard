import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Container, Badge } from "./styles";
import { Text, Box, Flex, PseudoBox } from "@chakra-ui/core";

function Task({ task, index }) {
  console.log(index, task.id);
  return (
    <Draggable draggableId={task.id} index={index}>
      {({ draggableProps, dragHandleProps, innerRef }) => (
        <PseudoBox _hover={{ bg: "blue" }}>
          <Flex
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
        </PseudoBox>
      )}
    </Draggable>
  );
}

export default Task;
