import React from 'react'

import { SideBar } from '../style/components'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { listItems } from '../data/sidebar.data'

const SideBarComponent = () => {
    return (
        <SideBar>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                {listItems?.map((item, index: number) => (
                    <ListItem button key={index}>
                        <ListItemIcon>
                            {item.image}
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))}
            </List>
        </SideBar>
    )
}

export default SideBarComponent