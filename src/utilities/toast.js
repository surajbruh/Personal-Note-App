import { ToastContainer, toast } from 'react-toastify';


//For notification
export const notifyNew = () => {
    toast.success("New note added");
}
export const notifyUp = () => {
    toast.success("New note updated");
}
export const notifyDel = () => {
    toast.success("New note deleted");
}
export const notifyErr = () => {
    toast.error('Invalid Note')
}
