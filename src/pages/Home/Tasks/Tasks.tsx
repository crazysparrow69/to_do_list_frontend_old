import React, { useEffect, useState } from "react";
import { Task, getTask } from "../../../api/taskAPI";

import styles from "./Tasks.module.scss";
import TaskDeleting from "./TaskDeleting/TaskDeleting";
import { Modal } from "../../../components/common/Modal/Modal";
import TaskEditing from "./TaskEditing/TaskForm";
import TaskCard from "./TaskCard/TaskCard";
import Pagination from "./Pagination/Pagination";
import Preloader from "../../../components/Preloader/Preloader";
import TaskSharing from "./TaskSharing/TaskSharing";
import TaskAddingLink from "./TaskAddingLink/TaskAddingLink";
import { usePrevious } from "../../../hooks";

interface TaskProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  taskFetchingParams: getTask;
  fetchTasks: (params: getTask) => void;
  isLoading: boolean;
  error: string;
  Tasks: Task[];
  totalPages: number;
  isMobile?: boolean;
}

const Tasks: React.FC<TaskProps> = ({
  setCurrentPage,
  taskFetchingParams,
  fetchTasks,
  isLoading,
  error,
  Tasks,
  totalPages,
  isMobile,
}) => {
  const { page, isCompleted, deadline, categories } = taskFetchingParams;
  const [taskDeleting, setTaskDeleting] = useState(false);
  const [taskEditing, setTaskEditing] = useState(false);
  const [taskSharing, setTaskSharing] = useState(false);
  const [taskAddingLink, setTaskAddingLink] = useState(false);
  const [taskProps, setTaskProps] = useState<Task | {}>({});

  const prevIsCompleted = usePrevious(isCompleted);
  const prevDeadline = usePrevious(deadline);
  const prevCategories = usePrevious(categories);

  useEffect(() => {
    if (
      isCompleted === prevIsCompleted &&
      deadline === prevDeadline &&
      categories === prevCategories
    ) {
      fetchTasks(taskFetchingParams);
      return;
    }
    setCurrentPage(1);
    fetchTasks({ ...taskFetchingParams, page: 1 });
  }, [isCompleted, deadline, categories, page]);

  return (
    <main
      className={`${
        Tasks && Tasks.length > 0 ? styles.wrapperWithTasks : styles.wrapper
      } ${isMobile && styles.mobileWrapper}`}
    >
      <div className={styles.line}>
        <span
          className={styles.createTask}
          onClick={() => {
            setTaskEditing(true);
            setTaskProps({
              fetchTasks,
              taskFetchingParams,
              setCurrentPage,
              length: Tasks?.length || 0,
            });
          }}
        >
          Create task +
        </span>
      </div>
      <Modal
        active={taskDeleting}
        setActive={setTaskDeleting}
        ChildComponent={TaskDeleting}
        childProps={taskProps}
      />
      <Modal
        active={taskEditing}
        setActive={setTaskEditing}
        ChildComponent={TaskEditing}
        childProps={taskProps}
      />
      <Modal
        active={taskSharing}
        setActive={setTaskSharing}
        ChildComponent={TaskSharing}
        childProps={taskProps}
      />
      <Modal
        active={taskAddingLink}
        setActive={setTaskAddingLink}
        ChildComponent={TaskAddingLink}
        childProps={taskProps}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <div className={styles.tasksWrapper}>
          {error ? (
            <div className={styles.errorMessage}>{error}</div>
          ) : (
            <div className={styles.tasks}>
              {Tasks && Tasks.length > 0 ? (
                Tasks.map((el) => (
                  <TaskCard
                    setTaskEditing={setTaskEditing}
                    setTaskProps={setTaskProps}
                    setTaskDeleting={setTaskDeleting}
                    setTaskSharing={setTaskSharing}
                    setTaskAddingLink={setTaskAddingLink}
                    task={el}
                    key={el._id}
                    length={Tasks.length}
                    fetchTasks={fetchTasks}
                    taskFetchingParams={taskFetchingParams}
                    setCurrentPage={setCurrentPage}
                  />
                ))
              ) : (
                <p className={styles.noTasks}>You have no tasks</p>
              )}
            </div>
          )}

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <Pagination
                currentPage={page || 1}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default Tasks;
