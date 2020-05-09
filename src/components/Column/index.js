import React from "react";

import { Container, TaskList, Title } from "./styles";
import { Droppable } from "react-beautiful-dnd";
import Task from "../Task";

import { Box, Text } from "@chakra-ui/core";

function Column({ column, tasks }) {
  return (
    <Box
      // bg="gray.50"
      minH="60vh"
      minW={200}
      w={{ base: "100%", sm: "50%", md: 300 }}
      // borderWidth="1px"
      // rounded="lg"
      // mx={15}
      p={3}
      // style={{ backgroundColor: "red" }}
    >
      <Box>
        <Text mb={2} fontSize="md" fontWeight="bold">
          {column.title}
        </Text>
      </Box>
      <Droppable droppableId={column.id}>
        {({ droppableProps, innerRef, placeholder }) => (
          <Box ref={innerRef} {...droppableProps}>
            {tasks?.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {placeholder}
          </Box>
        )}
      </Droppable>
    </Box>
  );
}

export default Column;
