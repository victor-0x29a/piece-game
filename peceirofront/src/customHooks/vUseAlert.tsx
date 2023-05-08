import SuccessAudio from '../assets/audio/success.mp3'
import ErrorAudio from '../assets/audio/error.mp3'
import { toast } from 'react-toastify'

type typesAlert = "error" | "success" | "warning"

const vUseAlert = async (type: typesAlert, message: string) => {
    const sucessAudio = new Audio(SuccessAudio);
    const errorAudio = new Audio(ErrorAudio)

    await sucessAudio.load()
    await errorAudio.load()

    if (type === "success") {
        await sucessAudio.play()

    }
    if (type !== "success") {
        await errorAudio.play()
    }

    if (type === "success") {
        return toast.success(message, {
            position: "top-right",
            autoClose: 1200,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "dark",
            icon: "🐟"
        })
    } else if (type === "error") {
        return toast.error(message, {
            position: "top-right",
            autoClose: 1200,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "dark",
            icon: "❌"
        })
    } else {
        return toast.warning(message, {
            position: "top-right",
            autoClose: 1200,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "dark",
            icon: "🔔"
        })
    }



}

export default vUseAlert