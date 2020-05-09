import React from "react";

import { Container, TaskList, Title } from "./styles";
import { Droppable } from "react-beautiful-dnd";
import Task from "../Task";

import { Box, Text, Button, Flex, Icon } from "@chakra-ui/core";

function Column({ column, tasks }) {
  function renderEmptyColumnHeader() {
    return (
      <Flex mb={4} px={2} justify="space-between" align="center">
        <Button leftIcon="add" size="sm" bg="transparent">
          Add a group
        </Button>
      </Flex>
    );
  }

  function renderHeader() {
    return (
      <Flex mb={4} px={2} justify="space-between" align="center">
        <Text fontSize="md" fontWeight="bold">
          {column.title}
        </Text>
        <Button bg="transparent" size="sm">
          <Icon name="add" />
        </Button>
      </Flex>
    );
  }

  function renderTaskList() {
    return (
      <Droppable droppableId={column.id}>
        {({ droppableProps, innerRef, placeholder }) => (
          <Box minH={200} ref={innerRef} {...droppableProps}>
            {tasks?.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {placeholder}
          </Box>
        )}
      </Droppable>
    );
  }

  return (
    <Box minH="60vh" minW={200} w={{ base: "100%", sm: "50%", md: 300 }} p={3}>
      {column ? renderHeader() : renderEmptyColumnHeader()}
      {column && tasks && renderTaskList()}
    </Box>
  );
}

export default Column;
