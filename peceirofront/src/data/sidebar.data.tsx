import DraftsIcon from '@material-ui/icons/Drafts';
import ExtensionIcon from '@material-ui/icons/Extension';
import GamesIcon from '@material-ui/icons/Games';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import TurnedInIcon from '@material-ui/icons/TurnedIn';

type item = {
    name: string,
    href: string,
    image: React.ReactElement,
    logged: boolean
}

export const listItems: item[] = [
    {
        name: "Peças",
        href: "/pieces",
        image: <ExtensionIcon />,
        logged: false
    },
    {
        name: "Playground",
        href: "/playground",
        image: <GamesIcon />,
        logged: true
    },
    {
        name: "Notificações",
        href: "/notify",
        image: <DraftsIcon />,
        logged: true
    },
    {
        name: "Minha conta",
        href: "/profile",
        image: <AccountTreeIcon />,
        logged: true
    },
    {
        name: "Sair",
        href: "/logout",
        image: <ExitToAppIcon />,
        logged: true
    },
    {
        name: "Entrar",
        href: "/login",
        image: <TrendingFlatIcon />,
        logged: false
    },
    {
        name: "Cadastrar",
        href: "/register",
        image: <TurnedInIcon />,
        logged: false
    },
]

