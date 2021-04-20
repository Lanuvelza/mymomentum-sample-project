import {Box, Button, Grid, Paper, Typography} from "@material-ui/core";
import {Todo as TodoType, useMarkTodoMutation} from "../../../generated/graphql";
import {memo} from "react";
import Link from "next/link";
import {makeStyles} from "@material-ui/styles";
import CheckIcon from "@material-ui/icons/Check";

interface TodoProps {
  todo: Pick<TodoType, "title" | "id" | "complete">;
}


const useStyles = makeStyles({
  link: {
    cursor: 'pointer',
  },

  completed: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    background: 'lightgreen',
    color: 'darkgrey',
  },

  uncompleted: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
});

/**
 * Display an individual todo in the list.
 */
export const Todo = memo(({
  todo
}: TodoProps) => {
  const classes = useStyles();

  const [markToDo] = useMarkTodoMutation();

  // marks the todo completed when the checkmark is clicked
  const markComplete = (event) => {
    event.preventDefault();
    markToDo({
      variables: {
        id: todo.id,
        complete: true
      }
    })
    .catch(error => {
      console.log(error)
    });
  }

  return (
    <Grid item key={todo.id}>
      <Link href={`/todo/${todo.id}`}>
        <Paper elevation={1} className={classes.link}>
          <Box p={2} className={todo.complete ? classes.completed : classes.uncompleted}>
            <Typography variant="h5">{todo.title}</Typography>
            {todo.complete ? <CheckIcon /> : 
              <Button variant="outlined" onClick={markComplete}><CheckIcon /></Button>}
          </Box>
        </Paper>
      </Link>
    </Grid>
  )
});