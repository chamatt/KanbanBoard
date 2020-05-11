import React, { useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Badge } from "./styles";
import {
  Text,
  Flex,
  useColorMode,
  Input,
  IconButton,
  Menu,
  MenuButton,
  Button,
  Icon,
  MenuList,
  MenuItem,
} from "@chakra-ui/core";
import useEditField from "components/hooks/useEditField";
import { Task as ITask, TaskWithStatus } from "models/tasks";

interface Props {
  statusId: string;
  task?: ITask;
  index: number;
  autoFocus?: boolean;
  draggable?: boolean;
  showAddTask?: boolean;
  editTask: (task: Partial<ITask>) => void;
  createTask: (task: Partial<TaskWithStatus>) => void;
  deleteTask: ({ id }: { id: string }) => void;
}

const Task: React.FC<Props> = ({
  statusId,
  task,
  index,
  draggable = true,
  autoFocus = false,
  showAddTask = false,
  createTask,
  deleteTask,
  editTask,
}) => {
  const { colorMode } = useColorMode();
  const bgColor: any = { light: "whiteAlpha.900", dark: "gray.800" };

  const {
    field,
    isEditing,
    setIsEditing,
    setField,
    inputRef,
    handleBlur,
    handleChange,
    onKeyPressed,
  } = useEditField({
    autoFocus,
    fieldId: task?.id,
    onCreate: (field) =>
      createTask({
        statusId,
        content: field,
      }),
    onEdit: (id, field) =>
      editTask({
        id: id,
        content: field,
      }),
  });

  useEffect(() => {
    if (autoFocus && inputRef?.current) inputRef?.current?.focus();
  }, [autoFocus, inputRef]);

  const renderEdittingInput = () => {
    return (
      <Input
        onBlur={handleBlur}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        ref={inputRef}
        value={field}
        onKeyPress={onKeyPressed}
        onChange={handleChange}
        variant="outline"
        placeholder="Task Name"
        size="sm"
      />
    );
  };

  const renderTaskContent = ({
    dragHandleProps = {},
  }: {
    dragHandleProps?: any;
    draggableProps?: any;
  }) => {
    return (
      <Flex
        //  mb={2}
        justify="space-between"
        direction="row"
      >
        <Flex
          p={2}
          flex={1}
          justify="space-between"
          direction="column"
          wrap="nowrap"
          {...dragHandleProps}
        >
          {isEditing || autoFocus ? (
            renderEdittingInput()
          ) : (
            <Text fontSize="sm" userSelect="none">
              {task?.content}
            </Text>
          )}
          {task?.priority && task?.priority !== "none" && (
            <Flex pt={2}>
              <Badge userSelect="none" priority={task.priority}>
                {task.priority}
              </Badge>
            </Flex>
          )}
        </Flex>
        <Flex justify="flex-start" p={2}>
          {renderMenu()}
        </Flex>
      </Flex>
    );
  };

  const renderMenu = () => {
    return (
      <Menu closeOnBlur closeOnSelect>
        <MenuButton
          size="xs"
          as={Button}
          onClick={(e: any) => {
            e.stopPropagation();
          }}
          // @ts-ignore
          variant="ghost"
        >
          <Icon name="edit" />
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={(e: any) => {
              e.stopPropagation();
              setIsEditing(true);
              setField(task?.content || "");
            }}
          >
            Rename
          </MenuItem>
          {task?.id && (
            <MenuItem onClick={() => deleteTask({ id: task.id })}>
              Delete
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    );
  };

  // if (draggable)
  return (
    <Draggable
      draggableId={task?.id || "test"}
      index={index}
      isDragDisabled={!draggable}
    >
      {({ draggableProps, dragHandleProps, innerRef }) => (
        <Flex
          bg={bgColor[colorMode]}
          direction="column"
          // p={2}
          mb={2}
          boxShadow="md"
          rounded="md"
          onClick={() => console.log("Open Modal")}
          {...draggableProps}
          // {...dragHandleProps}
          ref={innerRef}
        >
          {renderTaskContent({
            dragHandleProps,
          })}
        </Flex>
      )}
    </Draggable>
  );
};

export default React.memo(Task);
