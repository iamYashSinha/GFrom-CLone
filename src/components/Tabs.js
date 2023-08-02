import React from "react";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link, useParams } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  tab: {
    fontSize: 12,
    color: "#5f6368",
    textTransform: "capitalize",
    height: 10,
    fontWeight: 600,
    fontFamily: "Google sans,Roboto,Arial,sans-serif",
  },
  tabs: {
    height: 10,
  },
});
function Centeredtab() {
  const { id } = useParams();
  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.root}>
        <Tabs
          className={classes.tabs}
          textColor="primary"
          indicateColor="primary"
          centered
        >
          <Link to={`/form/${id}`}>
            <Tab label="Questions" className={classes.tab}></Tab>
          </Link>
          <Link to={`/form/${id}/responses`}>
            <Tab label="Responses" className={classes.tab}></Tab>
          </Link>
        </Tabs>
      </Paper>
    </div>
  );
}

export default Centeredtab;
