import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "components/Column";
import { Flex } from "@chakra-ui/core";
import Navbar from "components/Navbar";
import { useStoreState, useStoreActions } from "models";

function Kaban() {
  const tasksByStatus = useStoreState((state) => state.tasks.tasksByStatus);
  const moveTask = useStoreActions((actions) => actions.tasks.moveTask);
  const createStatus = useStoreActions((actions) => actions.tasks.createStatus);
  const editStatus = useStoreActions((actions) => actions.tasks.editStatus);
  const editTask = useStoreActions((actions) => actions.tasks.editTask);
  const createTask = useStoreActions((actions) => actions.tasks.createTask);
  const deleteTask = useStoreActions((actions) => actions.tasks.deleteTask);

  return (
    <Flex h="100%" direction="column">
      <Navbar />
      <Flex flex={1} mt={15} wrap="nowrap" overflowX="scroll">
        <DragDropContext onDragEnd={moveTask}>
          {tasksByStatus.map((status) => {
            const column = status;
            return (
              <Column
                key={column.id}
                column={column}
                createStatus={createStatus}
                editStatus={editStatus}
                editTask={editTask}
                createTask={createTask}
                deleteTask={deleteTask}
              />
            );
          })}
          <Column
            key="new-column"
            createStatus={createStatus}
            editStatus={editStatus}
            editTask={editTask}
            createTask={createTask}
            deleteTask={deleteTask}
          />
        </DragDropContext>
      </Flex>
    </Flex>
  );
}

export default Kaban;
