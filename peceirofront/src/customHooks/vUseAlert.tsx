import SuccessAudio from '../assets/audio/success.mp3'
import ErrorAudio from '../assets/audio/error.mp3'
import { toast } from 'react-toastify'

type typesAlert = "error" | "success" | "warning"

const vUseAlert = async (type: typesAlert, message: string) => {
    const sucessAudio = new Audio(SuccessAudio);
    const errorAudio = new Audio(ErrorAudio)

    if (type === "success") {
        try {
            await sucessAudio.load()
            await sucessAudio.play()
        } catch (e) {
            // pass
        }
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
    }
    if (type === "error") {
        try {
            await errorAudio.load()
            await errorAudio.play()
        } catch (e) {
            // pass
        }
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
    }
    if (type === "warning") {
        try {
            await errorAudio.load()
            await errorAudio.play()
        } catch (e) {
            // pass
        }
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