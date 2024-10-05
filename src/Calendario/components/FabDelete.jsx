import { useCalendarStore, useUiStore } from "../../hooks"


// Boton Flotante para borrar un evento....
export const FabDelete = () => {

    const { isDateModalOpen } = useUiStore();
    const { startDeletingEvent, hasEventSelected } = useCalendarStore();

    //* Funcion para abrir el Modal 
    const handleDelete = () => {
        startDeletingEvent();
    } 

  return (
    <>
        { isDateModalOpen === false && (
            <button
                className="btn btn-danger fab-danger"
                onClick={ handleDelete }
                style={{
                    display: hasEventSelected ? '' : 'none'
                }}
            >
                <i className="fas fa-trash-alt"></i>
            </button>
        ) }
        
    </>
    
  )
}
