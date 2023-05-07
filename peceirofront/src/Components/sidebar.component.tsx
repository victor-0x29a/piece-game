import React from 'react'

import { SideBar } from '../style/components'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useMediaQuery } from '@material-ui/core';
import { listItems } from '../data/sidebar.data'

const SideBarComponent = () => {
    const mobile = useMediaQuery("(max-width: 612px)")
    return (
        <SideBar>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                style={{
                    display: mobile ? "flex" : "initial",
                    flexDirection: mobile ? "row" : "column",
                    justifyContent: "space-evenly"
                }}
            >
                {listItems?.map((item, index: number) => (
                    <ListItem button key={index} alignItems='center' style={{
                        justifyContent: "center",
                    }}>
                        {mobile && item.image}
                        {!mobile && <ListItemIcon>
                            {item.image}
                        </ListItemIcon>}
                        {!mobile && <ListItemText primary={item.name} />}
                    </ListItem>
                ))}
            </List>
        </SideBar>
    )
}

export default SideBarComponent