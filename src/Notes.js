import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "scale(1.05)"
    }
  },
  title: {
    fontWeight: "bold"
  },
  author: {
    marginTop: theme.spacing(1)
  },
  dialogContent: {
    paddingTop: theme.spacing(2)
  },
  closeButton: {
    marginLeft: "auto"
  }
}));

const Notes = () => {
  const classes = useStyles();
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.gyanibooks.com/library/get_dummy_notes")
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  }, []);

  const handleCardClick = (note) => {
    setSelectedNote(note);
  };

  const handleCloseDialog = () => {
    setSelectedNote(null);
  };

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Notes
      </Typography>
      <Grid container spacing={3}>
        {notes.map((note) => (
          <Grid item key={note.id} xs={12} sm={6} md={4}>
            <Card
              className={classes.card}
              onClick={() => handleCardClick(note)}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  component="h2"
                  className={classes.title}
                >
                  {note.title}
                </Typography>
                <Typography color="textSecondary" className={classes.author}>
                  {note.author}
                </Typography>
                <Typography variant="body2" component="p">
                  {note.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={selectedNote !== null} onClose={handleCloseDialog}>
        {selectedNote && (
          <>
            <DialogTitle>{selectedNote.title}</DialogTitle>
            <DialogContent className={classes.dialogContent}>
              <DialogContentText>{selectedNote.content}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseDialog}
                color="primary"
                className={classes.closeButton}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Notes;
