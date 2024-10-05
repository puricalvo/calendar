import { useEffect, useMemo, useState } from "react";
import { addHours, differenceInMinutes } from "date-fns";

import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from "react-modal";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { es } from 'date-fns/locale/es';
import { useCalendarStore, useUiStore } from "../../hooks";
import { useTranslation } from "react-i18next";

registerLocale( 'es', es );


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  Modal.setAppElement('#root');

export const CalendarModal = () => {

  const { t } = useTranslation('modal');

  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvrnt } = useCalendarStore();

  const [formSubmitted, setFormSubmitted] = useState(false);


  // Valores del formulario
  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  // Esto va a memorisar si el formValue.title cambia o formSubmitted cambia
  const titleClass = useMemo(() => {
      if ( !formSubmitted ) return '';
      
      return ( formValues.title.length > 0 )
        ? ''
        : 'is-invalid';

  }, [ formValues.title, formSubmitted ])

  useEffect(() => {
    if ( activeEvent !== null ) {
      setFormValues({ ...activeEvent }); // para esparcir las propiedades y crear un nuevo objeto....
    }
  
  }, [ activeEvent ])
  

  // Cambiar los Valores del formulario
  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  // Cambiar los valores de las horas de start: inicio. end: final
  const onDateChanged = ( event, changing ) => {
    setFormValues({
      ...formValues,
      [changing]: event
    })
  }

  // Cerrar el modal
  const onCloseModal = () => {
    closeDateModal();
  }

  // Posteo del formulario // event: es el event del formulario
  const onSubmit = async( event ) => {
    event.preventDefault();
    setFormSubmitted(true)

    const difference = differenceInMinutes( formValues.end, formValues.start );
      
    if ( isNaN( difference ) || difference <= 0 ) {
      Swal.fire('Fechas incorrectas','Revisar las fechas ingresadas','error');
      return;
    }

    if ( formValues.title.length <= 0 ) return;

    console.log(formValues);

    // Todo: para la creaccion de un nuevo event..
    await startSavingEvrnt( formValues );
    closeDateModal();
    setFormSubmitted(false);
    
  }

  return (
    <Modal
      isOpen={ isDateModalOpen }
      onRequestClose={ onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={ 200 } 
    >
        <h1> {t('Title')} </h1>
        <hr />
        <form className="container" onSubmit={ onSubmit }>

            <div className="form-group mb-2">
                <label>{t('FechaInt')}</label>
                <div className="customDatePickerWidth">
                    <DatePicker 
                        selected={ formValues.start }
                        onChange={ (event) => onDateChanged(event, 'start') }
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"

                    />
                </div>
                
            </div>

            <div className="form-group mb-2">
                <label>{t('FechaFin')}</label>
                <div className="customDatePickerWidth">
                    <DatePicker
                        minDate={ formValues.start } 
                        selected={ formValues.end }
                        onChange={ (event) => onDateChanged(event, 'end') }
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                    />
                </div>
            </div>

            <hr />
            <div className="form-group mb-2">
                <label>{t('TituloNotas')}</label>
                <input 
                  type="text" 
                  className={`form-control ${titleClass}`}
                  placeholder={t('TituloPlaceholder')}
                  name="title"
                  autoComplete="off"
                  value={ formValues.title}
                  onChange={ onInputChanged}
              
                />
                <small id="emailHelp" className="form-text text-muted">{t('Descripcion')}</small>
            </div>

            <div className="form-group mb-2">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder={t('NotasPlaceholder')}
                    rows="5"
                    name="notes"
                    value={ formValues.notes }
                    onChange={ onInputChanged }
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">{t('Informacion')}</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-danger btn-block"
            >
                <i className="far fa-save"></i>
                <span>{t('Boton')}</span>
            </button>

        </form>
    </Modal>
  )
}
