import DraftsIcon from '@mui/icons-material/Drafts';
import ExtensionIcon from '@mui/icons-material/Extension';
import GamepadIcon from '@mui/icons-material/Gamepad';
import ContactsIcon from '@mui/icons-material/Contacts';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import HandymanIcon from '@mui/icons-material/Handyman';

type item = {
    name: string,
    href: string,
    image: React.ReactElement,
    logged: boolean
}

export const listItems: item[] = [
    {
        name: "Jogos",
        href: "/admin/game",
        image: <HandymanIcon />,
        logged: true
    },
    {
        name: "Componentes",
        href: "/admin/piece",
        image: <HandymanIcon />,
        logged: true
    },
    {
        name: "Peças",
        href: "/pieces",
        image: <ExtensionIcon />,
        logged: false
    },
    {
        name: "Playground",
        href: "/playground",
        image: <GamepadIcon />,
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
        image: <ContactsIcon />,
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
        image: <VpnKeyIcon />,
        logged: false
    },
    {
        name: "Cadastrar",
        href: "/register",
        image: <PersonAddIcon />,
        logged: false
    },
]

