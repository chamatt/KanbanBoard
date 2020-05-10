import React, { useState } from "react";
import initialData from "initial-data";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "components/Column";
import { Flex } from "@chakra-ui/core";
import Navbar from "components/Navbar";
import { useStoreState, useStoreActions } from "models";

function Kaban() {
  const [tasks, setTasks] = useState(initialData.tasks);
  const [columns, setColumns] = useState(initialData.columns);
  const [columnOrder, setColumnOrder] = useState(initialData.columnOrder);
  const tasksByStatus = useStoreState((state) => state.tasks.tasksByStatus);
  const moveTask = useStoreActions((actions) => actions.tasks.moveTask);
  const createStatus = useStoreActions((actions) => actions.tasks.createStatus);
  const editStatus = useStoreActions((actions) => actions.tasks.editStatus);

  const onDragEnd = (result: DropResult) => {
    // const { destination, source, draggableId } = result;
    // if (
    //   !destination ||
    //   (destination.droppableId === source.droppableId &&
    //     destination.index === source.index)
    // ) {
    //   return;
    // }
    // const sourceColumn = columns[source.droppableId];
    // const destinationColumn = columns[destination.droppableId];
    // const sourceTaskIds = [...sourceColumn.taskIds];
    // const destinationTaskIds = [...destinationColumn.taskIds];
    // if (destination.droppableId === source.droppableId) {
    //   sourceTaskIds.splice(source.index, 1);
    //   sourceTaskIds.splice(destination.index, 0, draggableId);
    //   setColumns({
    //     ...columns,
    //     [source.droppableId]: {
    //       ...sourceColumn,
    //       taskIds: sourceTaskIds,
    //     },
    //   });
    // } else {
    //   sourceTaskIds.splice(source.index, 1);
    //   destinationTaskIds.splice(destination.index, 0, draggableId);
    //   setColumns({
    //     ...columns,
    //     [source.droppableId]: {
    //       ...sourceColumn,
    //       taskIds: sourceTaskIds,
    //     },
    //     [destination.droppableId]: {
    //       ...destinationColumn,
    //       taskIds: destinationTaskIds,
    //     },
    //   });
    // }
  };

  return (
    <Flex h="100%" direction="column">
      <Navbar />
      <Flex flex={1} mt={15} wrap="nowrap" overflowX="scroll">
        <DragDropContext onDragEnd={moveTask}>
          {tasksByStatus.map((status) => {
            const column = status;
            // const column = columns?.[columnId];
            // const taskList = column.taskIds.map((taskId) => tasks[taskId]);
            return (
              <Column
                key={column.id}
                column={column}
                createStatus={createStatus}
                editStatus={editStatus}
              />
            );
          })}
          <Column
            key="new-column"
            createStatus={createStatus}
            editStatus={editStatus}
          />
        </DragDropContext>
      </Flex>
    </Flex>
  );
}

export default Kaban;
