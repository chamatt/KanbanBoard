import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Badge } from "./styles";
import { Text, Flex, useColorMode } from "@chakra-ui/core";

interface Props {
  task: any;
  index: number;
}

const Task = (props: Props) => {
  const { task, index } = props;
  const { colorMode } = useColorMode();
  const bgColor: any = { light: "whiteAlpha.900", dark: "gray.800" };
  return (
    <Draggable draggableId={task.id} index={index}>
      {({ draggableProps, dragHandleProps, innerRef }) => (
        <Flex
          bg={bgColor[colorMode]}
          direction="column"
          p={2}
          mb={2}
          boxShadow="md"
          rounded="md"
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
};

export default Task;
