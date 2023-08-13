import React, { useState } from "react";
import { toast } from "react-toastify";

import { Task, getTask } from "../../../../api/taskAPI";
import { humaniseDate } from "../../../../helpers/string";
import { Checkbox } from "../../../../components/common/Checkbox/Checkbox";

import styles from "./TaskCard.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTrash,
  faShare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

interface taskProps {
  task: Task;
  setTaskEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setTaskProps: React.Dispatch<
    React.SetStateAction<
      | {}
      | (Task & {
          fetchTasks: (params: getTask) => void;
          taskFetchingParams: getTask;
        })
    >
  >;
  setTaskDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  setTaskSharing: React.Dispatch<React.SetStateAction<boolean>>;
  setTaskAddingLink: React.Dispatch<React.SetStateAction<boolean>>;
  fetchTasks: (params: getTask) => void;
  taskFetchingParams: getTask;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  length?: number;
}

const TaskCard = ({
  task,
  setTaskEditing,
  setTaskProps,
  setTaskDeleting,
  setTaskSharing,
  setTaskAddingLink,
  fetchTasks,
  taskFetchingParams,
  setCurrentPage,
  length,
}: taskProps) => {
  const {
    title,
    description,
    deadline,
    isCompleted,
    categories,
    _id,
    sharedWith,
    links,
  } = task;

  const [completed, setIsCompleted] = useState(isCompleted || false);

  return (
    <div className={completed ? styles.completedWrapper : styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title} </h1>
        <Checkbox
          isForChangeCompletedStatus
          isChecked={completed}
          label=""
          data-testid="checkbox"
          setIsChecked={setIsCompleted}
          isRounded
          id={_id}
        />
      </div>
      <div className={styles.categoriesWrapper}>
        {categories?.map((el) => {
          const { color, title } = el;
          return (
            <span
              key={el._id}
              style={{ borderColor: color }}
              className={styles.category}
            >
              {title}
            </span>
          );
        })}
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.links}>
        {links?.map((link, id) => (
          <a href={link} key={id} target="blank" className={styles.link}>
            {link}
          </a>
        ))}
      </div>

      {deadline && (
        <p className={styles.deadline}>Deadline: {humaniseDate(deadline)}</p>
      )}
      {sharedWith &&
        sharedWith[0] !== "already shared" &&
        sharedWith.length > 0 && (
          <>
            <h5 className={styles.sharedTitle}>Shared with:</h5>
            <div className={styles.sharedWrapper}>
              {sharedWith.map((el, id) => (
                <p className={styles.username} key={id}>
                  {typeof el !== "string" && el.username}
                </p>
              ))}
            </div>
          </>
        )}
      <div className={styles.icons}>
        <FontAwesomeIcon
          data-testid="edit-icon"
          className={`${styles.icon} ${styles.pencil}`}
          onClick={(e) => {
            setTaskProps({ ...task, fetchTasks, taskFetchingParams });
            setTaskEditing(true);
            e.stopPropagation();
          }}
          color="black"
          fontSize="15px"
          icon={faPencil}
        />
        <FontAwesomeIcon
          data-testid="attach-icon"
          className={`${styles.icon} ${styles.attach}`}
          onClick={(e) => {
            setTaskProps({ ...task, fetchTasks, taskFetchingParams });
            setTaskAddingLink(true);
            e.stopPropagation();
          }}
          color="black"
          fontSize="15px"
          icon={faPlus}
        />
        <FontAwesomeIcon
          color="black"
          data-testid="delete-icon"
          fontSize="15px"
          icon={faTrash}
          className={`${styles.icon} ${styles.trash}`}
          onClick={(e) => {
            setTaskProps({
              ...task,
              fetchTasks,
              taskFetchingParams,
              setCurrentPage,
              length,
            });
            setTaskDeleting(true);
            e.stopPropagation();
          }}
        />
        <FontAwesomeIcon
          color="black"
          data-testid="share-icon"
          fontSize="15px"
          icon={faShare}
          className={`${styles.icon} ${styles.share}`}
          onClick={(e) => {
            if (sharedWith && sharedWith[0] === "already shared") {
              toast.error(
                "You are not the author of this task, you can not share this task!"
              );
              return;
            }
            setTaskProps({
              ...task,
              fetchTasks,
              taskFetchingParams,
            });
            setTaskSharing(true);
            e.stopPropagation();
          }}
        />
      </div>
    </div>
  );
};

export default TaskCard;
