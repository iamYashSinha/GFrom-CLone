import React from 'react'
import { IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

function TemporaryDrawer() {
    const [state, setState] = React.useState({
        left: false
    })

    const toggleDrawer = (anchor, open) => (event) => {
        setState({...state, [anchor]: open});
    } 

    const list = (anchor) => (
        <div>
            <List>
                <ListItem>
                    Sidebar
                </ListItem>
            </List>
        </div>
    )
  
  return (
    <div>
        <React.Fragment>
      <IconButton onClick={toggleDrawer("left", true)}>
        <MenuIcon />
        </IconButton>
        <Drawer open={state['left']} onClose={toggleDrawer("left", false)} anchor={'left'}>
            {list('left')}
        </Drawer>
        </React.Fragment>
    </div>
  )
}

export default TemporaryDrawer
