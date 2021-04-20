import {memo} from "react";
import {Title} from "../../common/components/Title";
import {
  useCreateCommentMutation,
  useMarkTodoMutation,
  useSingleToDoQuery,
  useTodoCommentsSubscription
} from "../../generated/graphql";
import {useRouter} from "next/router";
import Head from "next/head";
import {Button, CircularProgress, Fade, Grid, Link, makeStyles, Slide, Typography} from "@material-ui/core";


const useStyles = makeStyles({
  returnButton: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '5em',
    width: '7em',
    margin: 'auto',
  }
})

const Loading = () => {
  return ( <CircularProgress /> )
}

/**
 * Display and interact with a single Todo.
 */
const Todo = memo(() => {
  const {query: {id}} = useRouter();

  const {data: todoResponse, refetch} = useSingleToDoQuery({
    variables: {id}
  });
  const todo = todoResponse?.todo_by_pk;

  const {data: commentsResponse} = useTodoCommentsSubscription({
    variables: {todoId: id}
  });
  const comments = commentsResponse?.comments;

  const [createComment] = useCreateCommentMutation();
  const [markTodo] = useMarkTodoMutation();

  const classes = useStyles();

  return (
    <>
      <Head>
        <title>A ToDo</title>
      </Head>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Fade in={true} timeout={2000}>
            <Title >A ToDo</Title>
          </Fade>
        </Grid>
        {todo ? 
        <Grid>
          <Slide 
            direction="right" 
            in={true}
            timeout={2000}
          > 
            <Typography variant="h2">Task: {todo.title}</Typography> 
          </Slide>
          <Slide
            direction="left"
            in={true}
            timeout={2000}
          >
            <Typography variant="h6">Date: {todo.created_at.slice(0,10)}</Typography>
          </Slide>
          <Slide 
            direction="right" 
            in={true}
            timeout={2000}
          >
            <Typography variant="h4">Description: {todo.description}</Typography>
          </Slide>
          <Fade in={true} timeout={2000}>
            <Link 
              href='/' 
              color='primary' 
              underline='none' 
            >
              <Button variant="outlined" className={classes.returnButton} >
                Back
              </Button>
            </Link>
          </Fade>
        </Grid> : <Loading />}
      </Grid>
    </>
  );
});

export default Todo;