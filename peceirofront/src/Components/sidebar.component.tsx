import React from 'react'

import { SideBar } from '../style/components'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { listItems } from '../data/sidebar.data'
import { connect } from 'react-redux'
import { account, stateType } from '../store/types/state.type';
import { useNavigate } from 'react-router-dom';

const MapStateToProps = (state: stateType) => ({
    account: state.account
})

type thisProps = {
    account: account
}

const SideBarComponent = ({ account }: thisProps) => {
    const mobile = useMediaQuery("(max-width: 612px)")
    const navigate = useNavigate()
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
                    <div style={{
                        margin: "0",
                        padding: "0"
                    }} key={index}>
                        {
                            item.logged && account.logged && (
                                <>
                                    {item.href.includes("admin") && account.authLevel > 1 && <ListItem button key={index}
                                        onClick={() => (navigate(item.href))} alignItems='center' style={{
                                            justifyContent: "center",
                                        }}>
                                        {mobile && item.image}
                                        {!mobile && <ListItemIcon>
                                            {item.image}
                                        </ListItemIcon>}
                                        {!mobile && <ListItemText primary={item.name} />}
                                    </ListItem>}
                                    {!item.href.includes("admin") && account.authLevel >= 1 && <ListItem button key={index}
                                        onClick={() => (navigate(item.href))} alignItems='center' style={{
                                            justifyContent: "center",
                                        }}>
                                        {mobile && item.image}
                                        {!mobile && <ListItemIcon>
                                            {item.image}
                                        </ListItemIcon>}
                                        {!mobile && <ListItemText primary={item.name} />}
                                    </ListItem>}
                                </>
                            )
                        }
                        {
                            !item.logged && !account.logged && (
                                <ListItem button key={index}
                                    onClick={() => (navigate(item.href))} alignItems='center' style={{
                                        justifyContent: "center",
                                    }}>
                                    {mobile && item.image}
                                    {!mobile && <ListItemIcon>
                                        {item.image}
                                    </ListItemIcon>}
                                    {!mobile && <ListItemText primary={item.name} />}
                                </ListItem>
                            )
                        }
                    </div>
                ))}
            </List>
        </SideBar>
    )
}

export default connect(MapStateToProps)(SideBarComponent) 