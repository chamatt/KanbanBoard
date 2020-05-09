import React, { useState } from "react";
import initialData from "./initial-data";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./components/Column";
import { ThemeProvider, theme, Box } from "@chakra-ui/core";
import { Flex, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import Navbar from "./components/Navbar";

const breakpoints = ["360px", "768px", "1024px", "1440px"];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const newTheme = {
  ...theme,
  breakpoints,
};

function App() {
  const [tasks, setTasks] = useState(initialData.tasks);
  const [columns, setColumns] = useState(initialData.columns);
  const [columnOrder, setColumnOrder] = useState(initialData.columnOrder);

  const onDragEnd = (result) => {
    // TODO
    const { destination, source, draggableId } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];
    const sourceTaskIds = [...sourceColumn.taskIds];
    const destinationTaskIds = [...destinationColumn.taskIds];

    if (destination.droppableId === source.droppableId) {
      sourceTaskIds.splice(source.index, 1);
      sourceTaskIds.splice(destination.index, 0, draggableId);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          taskIds: sourceTaskIds,
        },
      });
    } else {
      sourceTaskIds.splice(source.index, 1);
      destinationTaskIds.splice(destination.index, 0, draggableId);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          taskIds: sourceTaskIds,
        },
        [destination.droppableId]: {
          ...destinationColumn,
          taskIds: destinationTaskIds,
        },
      });
    }
  };

  return (
    <ThemeProvider theme={newTheme}>
      <ColorModeProvider>
        <CSSReset />
        <Box>
          <Navbar />
          <Flex mt={15} wrap={false} overflowWrap="scroll">
            <DragDropContext
              // onDragStart
              // onDragUpdate
              onDragEnd={onDragEnd}
            >
              {columnOrder.map((columnId) => {
                const column = columns?.[columnId];
                const taskList = column.taskIds.map((taskId) => tasks[taskId]);
                return (
                  <Column key={column.id} column={column} tasks={taskList} />
                );
              })}
            </DragDropContext>
          </Flex>
        </Box>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
