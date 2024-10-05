import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store";


export const useUiStore = () => {

    const dispacht = useDispatch();
    
    const {
        isDateModalOpen
    } = useSelector( state => state.uiCalendar );


    const openDateModal = () => {
        dispacht( onOpenDateModal() );
    }

    const closeDateModal = () => {
        dispacht( onCloseDateModal() );
    }

    const toggleDateModal = () => {
        (isDateModalOpen)
            ? openDateModal()
            : closeDateModal();
    }


    return {
       //* Propiedades
       isDateModalOpen,

       //* Metodos
       openDateModal,
       closeDateModal,
       toggleDateModal,
    }

} 