import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
} from "react";

import { Droppable } from "react-beautiful-dnd";
import Task from "../Task";

import {
  Box,
  Text,
  Button,
  Flex,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/core";
import { TasksByStatus, Status } from "models/tasks";

interface Props {
  column?: TasksByStatus;
  createStatus: (status: Partial<Status>) => void;
  editStatus: (status: Partial<Status>) => void;
}

const Column: React.FC<Props> = ({ column, createStatus, editStatus }) => {
  const tasks = column?.tasks;

  const [statusTitle, setStatusTitle] = useState("");
  const [isEditingGroup, setIsEditingGroup] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingGroup) inputRef?.current?.focus();
  }, [isEditingGroup]);

  const handleCreateStatus = () => {
    if (statusTitle.length > 0) {
      createStatus({
        title: statusTitle,
        tasks: [],
      });
      setIsEditingGroup(false);
      setStatusTitle("");
    } else {
      setIsEditingGroup(false);
    }
  };

  const handleEditStatus = () => {
    if (column && statusTitle.length > 0) {
      editStatus({
        id: column.id,
        title: statusTitle,
      });
      setIsEditingGroup(false);
      setStatusTitle("");
    } else {
      setIsEditingGroup(false);
    }
  };

  const handleBlur = () => {
    if (column?.id) handleEditStatus();
    else handleCreateStatus();
  };

  const onKeyPressed = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      if (column?.id) handleEditStatus();
      else handleCreateStatus();
    }
  };

  const renderMenu = () => {
    return (
      <Menu closeOnBlur closeOnSelect>
        <MenuButton
          as={Button}
          size="sm"
          // @ts-ignore
          variant="ghost"
        >
          <Icon name="chevron-down" />
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={() => {
              setIsEditingGroup(true);
              setStatusTitle(column?.title || "");
            }}
          >
            Edit Status Name
          </MenuItem>
          <MenuItem>Remove Status</MenuItem>
        </MenuList>
      </Menu>
    );
  };

  const renderEdittingInput = () => {
    return (
      <Input
        onBlur={handleBlur}
        ref={inputRef}
        value={statusTitle}
        onKeyPress={onKeyPressed}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setStatusTitle(e.target.value)
        }
        variant="unstyled"
        placeholder="Status name"
      />
    );
  };

  const renderEmptyColumnHeader = () => {
    return (
      <Flex mb={4} px={2} justify="space-between" align="center">
        {isEditingGroup ? (
          renderEdittingInput()
        ) : (
          <Button
            onClick={() => setIsEditingGroup(true)}
            leftIcon="add"
            size="sm"
            bg="transparent"
          >
            Add a group
          </Button>
        )}
      </Flex>
    );
  };

  const renderHeader = (columnObj: TasksByStatus) => {
    return (
      <Flex mb={4} px={2} justify="space-between" align="center">
        {isEditingGroup ? (
          renderEdittingInput()
        ) : (
          <Text fontSize="md" fontWeight="bold">
            {columnObj.title}
          </Text>
        )}

        {renderMenu()}
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
