import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"

// Boton Flotante para abrir el Modal....
export const FabAddNew = () => {

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    //* Funcion para abrir el Modal 
    const handleClickNew = () => {
        setActiveEvent({
           title: '',
           notes: '',
           start: new Date(),
           end: addHours( new Date(), 2),
           bgColor: '#dc3545',
           user: {
               _id: '123',
               name: 'Fernando'
           }
        }); 
        openDateModal(); 
    } 

  return (
    <button
        className="btn btn-danger fab"
        onClick={ handleClickNew }
    >
        <i className="fas fa-plus"></i>
    </button>
  )
}
