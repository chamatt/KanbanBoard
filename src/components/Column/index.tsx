import React from "react";

import { Droppable } from "react-beautiful-dnd";
import Task from "../Task";

import { Box, Text, Button, Flex, Icon } from "@chakra-ui/core";
import { TasksByStatus, Status } from "models/tasks";

interface Props {
  column?: TasksByStatus;
}

const Column: React.FC<Props> = ({ column }) => {
  const tasks = column?.tasks;
  const renderEmptyColumnHeader = () => {
    return (
      <Flex mb={4} px={2} justify="space-between" align="center">
        <Button leftIcon="add" size="sm" bg="transparent">
          Add a group
        </Button>
      </Flex>
    );
  };

  const renderHeader = (columnObj: TasksByStatus) => {
    return (
      <Flex mb={4} px={2} justify="space-between" align="center">
        <Text fontSize="md" fontWeight="bold">
          {columnObj.title}
        </Text>
        <Button bg="transparent" size="sm">
          <Icon name="add" />
        </Button>
      </Flex>
    );
  };

  const renderTaskList = (columnObj: TasksByStatus) => {
    return (
      <Droppable droppableId={columnObj.id}>
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
  };

  return (
    <Box minH="60vh" minW={200} w={{ base: "100%", sm: "50%", md: 300 }} p={3}>
      {column ? renderHeader(column) : renderEmptyColumnHeader()}
      {column && tasks && renderTaskList(column)}
    </Box>
  );
};

export default Column;
