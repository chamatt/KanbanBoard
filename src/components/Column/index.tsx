import React, { useState } from "react";

import { Droppable, Draggable } from "react-beautiful-dnd";
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
import {
  TasksByStatus,
  Status,
  Task as ITask,
  TaskWithStatus,
} from "models/tasks";
import AddNewTaskInput from "components/AddNewTaskInput";
import useEditField from "components/hooks/useEditField";

interface Props {
  column?: TasksByStatus;
  createStatus: (status: Partial<Status>) => void;
  editStatus: (status: Partial<Status>) => void;
  createTask: (task: Partial<TaskWithStatus>) => void;
  deleteTask: ({ id }: { id: string }) => void;
  editTask: (task: Partial<ITask>) => void;
}

const Column: React.FC<Props> = ({
  column,
  createStatus,
  editStatus,
  createTask,
  deleteTask,
  editTask,
}) => {
  const tasks = column?.tasks;
  const {
    field: statusTitle,
    isEditing: isEditingGroup,
    setIsEditing: setIsEditingGroup,
    setField: setStatusTitle,
    inputRef,
    handleBlur,
    handleChange,
    onKeyPressed,
  } = useEditField({
    fieldId: column?.id,
    onCreate: (field) => createStatus({ title: field }),
    onEdit: (id, field) => editStatus({ id: id, title: field }),
  });

  const [isAddingNewTask, setIsAddingNewTask] = useState(false);

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
        onChange={handleChange}
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
            {column &&
              tasks &&
              tasks.map((task, index) => (
                <Task
                  statusId={column.id}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  editTask={editTask}
                  key={task?.id}
                  task={task}
                  index={index}
                />
              ))}
            {column && isAddingNewTask && (
              <Task
                statusId={column.id}
                createTask={(args) => {
                  createTask(args);
                  setIsAddingNewTask(false);
                }}
                deleteTask={deleteTask}
                editTask={editTask}
                draggable={false}
                autoFocus
                key={`${column.id}/taks-${tasks?.length || 0}`}
                // task={}
                index={tasks?.length || 0}
              />
            )}
            {placeholder}

            {column && !isAddingNewTask && (
              <AddNewTaskInput
                key={`${column.id}`}
                onClick={() => setIsAddingNewTask(true)}
              />
            )}
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
