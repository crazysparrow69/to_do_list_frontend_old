import { render, fireEvent, screen } from '@testing-library/react';

import TaskCard from './TaskCard';

describe('TaskCard', () => {
  const task = {
    _id: '1',
    title: 'Task Title',
    description: 'Task Description',
    deadline: '2023-06-30',
    isCompleted: false,
    categories: [
      { _id: '1', color: 'blue', title: 'Category 1' },
      { _id: '2', color: 'red', title: 'Category 2' },
    ],
    user: 'dfggfd',
    createdAt: '2023-06-30',
    updatedAt: '2023-06-30',
  };

  const mockSetTaskEditing = jest.fn();
  const mockSetTaskProps = jest.fn();
  const mockSetTaskDeleting = jest.fn();
  const mockSetTaskSharing = jest.fn();
  const mockFetchTasks = jest.fn();
  const mockTaskFetchingParams = {};
  const mockSetCurrentPage = jest.fn();
  const mockSetTaskAddingLink = jest.fn();
  const mockSetTaskInfo = jest.fn();
  const updateTaskStatus = jest.fn();

  test('renders task card correctly', () => {
    render(
      <TaskCard
        task={task}
        setTaskEditing={mockSetTaskEditing}
        setTaskProps={mockSetTaskProps}
        setTaskDeleting={mockSetTaskDeleting}
        setTaskSharing={mockSetTaskSharing}
        setTaskInfo={mockSetTaskInfo}
        fetchTasks={mockFetchTasks}
        taskFetchingParams={mockTaskFetchingParams}
        setCurrentPage={mockSetCurrentPage}
        setTaskAddingLink={mockSetTaskAddingLink}
        updateTaskStatus={updateTaskStatus}
      />
    );

    expect(screen.getByText('Task Title')).toBeInTheDocument();
    expect(screen.getByText('Task Description')).toBeInTheDocument();
    expect(screen.getByText('Category 1')).toBeInTheDocument();
    expect(screen.getByText('Category 2')).toBeInTheDocument();
  });

  test('calls setTaskEditing and setTaskProps correctly on edit icon click', () => {
    render(
      <TaskCard
        task={task}
        setTaskEditing={mockSetTaskEditing}
        setTaskProps={mockSetTaskProps}
        setTaskDeleting={mockSetTaskDeleting}
        setTaskSharing={mockSetTaskSharing}
        setTaskInfo={mockSetTaskInfo}
        fetchTasks={mockFetchTasks}
        taskFetchingParams={mockTaskFetchingParams}
        setCurrentPage={mockSetCurrentPage}
        setTaskAddingLink={mockSetTaskAddingLink}
        updateTaskStatus={updateTaskStatus}
      />
    );

    fireEvent.click(screen.getByTestId('edit-icon'));
    expect(mockSetTaskProps).toHaveBeenCalledWith({
      ...task,
      fetchTasks: mockFetchTasks,
      taskFetchingParams: mockTaskFetchingParams,
    });
    expect(mockSetTaskEditing).toHaveBeenCalledWith(true);
  });

  test('calls setTaskDeleting correctly on delete icon click', () => {
    render(
      <TaskCard
        task={task}
        setTaskEditing={mockSetTaskEditing}
        setTaskProps={mockSetTaskProps}
        setTaskDeleting={mockSetTaskDeleting}
        setTaskSharing={mockSetTaskSharing}
        setTaskInfo={mockSetTaskInfo}
        fetchTasks={mockFetchTasks}
        taskFetchingParams={mockTaskFetchingParams}
        setCurrentPage={mockSetCurrentPage}
        setTaskAddingLink={mockSetTaskAddingLink}
        updateTaskStatus={updateTaskStatus}
      />
    );

    fireEvent.click(screen.getByTestId('delete-icon'));
    expect(mockSetTaskProps).toHaveBeenCalledWith({
      ...task,
      fetchTasks: mockFetchTasks,
      taskFetchingParams: mockTaskFetchingParams,
      setCurrentPage: mockSetCurrentPage,
    });
    expect(mockSetTaskDeleting).toHaveBeenCalledWith(true);
  });

  // test("calls setTaskSharing correctly on share icon click", () => {
  //   render(
  //     <TaskCard
  //       task={task}
  //       setTaskEditing={mockSetTaskEditing}
  //       setTaskProps={mockSetTaskProps}
  //       setTaskDeleting={mockSetTaskDeleting}
  //       setTaskSharing={mockSetTaskSharing}
  //       setTaskInfo={mockSetTaskInfo}
  //       fetchTasks={mockFetchTasks}
  //       taskFetchingParams={mockTaskFetchingParams}
  //       setCurrentPage={mockSetCurrentPage}
  //       setTaskAddingLink={mockSetTaskAddingLink}
  //       updateTaskStatus={updateTaskStatus}
  //     />
  //   );

  //   fireEvent.click(screen.getByTestId("share-icon"));
  //   expect(mockSetTaskProps).toHaveBeenCalledWith({
  //     ...task,
  //     fetchTasks: mockFetchTasks,
  //     taskFetchingParams: mockTaskFetchingParams,
  //   });
  //   expect(mockSetTaskSharing).toHaveBeenCalledWith(true);
  // });
});
