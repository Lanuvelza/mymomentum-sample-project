import {memo, useCallback, useState} from "react";
import {Button, CircularProgress, makeStyles, TextField} from "@material-ui/core";
import {useCreateToDoMutation} from "../../../generated/graphql";


/**
 * A form which allows the user to submit a new todo.
 */

const useStyles = makeStyles({
  todoForm: {
    display: 'flex',
    flexDirection: 'column',
  },

  titleForm: {
    marginBottom: '1em'
  },

  descriptionForm: {
    marginBottom: '1em'
  },

  submitButton: {
    display: 'flex',
    justifyContent: 'center',
    width: '10em',
    margin: 'auto',
  }

});

export const TodoForm = memo(() => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')

  const classes = useStyles();

  const [create, {loading}] = useCreateToDoMutation({
    variables: {
      todo: {
        title,
        description,
      }
    }
  });

  // save function creates a new todo onto the database
  const save = useCallback(async (e) => {
    e.preventDefault();
    try {
      await create();
      setTitle('');
      setDescription('');
    }
    catch (e) {
      console.log(e);
    }
  }, [create])

  if (loading) {
    return (
      <CircularProgress />
    );
  }

  return (
    <>
    <form className={classes.todoForm}>
      <TextField
        className={classes.titleForm}
        label="What do you need to do?"
        value={title}
        onChange={e => setTitle(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <TextField
        className={classes.descriptionForm}
        label="description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        variant="outlined"
        fullWidth
      />
    </form>
    <Button
      className={classes.submitButton}
      variant="outlined" 
      color="primary" 
      onClick={save}
    >Submit</Button>
    </>
  );
});