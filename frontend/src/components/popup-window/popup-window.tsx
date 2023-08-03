import { useEffect } from 'react';
import './popup-window.css';

type Prop ={
  handleClose?: () => void;
  children: JSX.Element;
}

const PopupWindow = ({children, handleClose}: Prop): JSX.Element => {
  useEffect(() => {
    const close = (evt: KeyboardEvent | React.KeyboardEvent) => {
      if(evt.key === 'Escape' && handleClose){
        handleClose();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  },[handleClose]);

  return (
    <div className="popup-box">
      <div className="box">
        {children}
      </div>
    </div>
  );
};

export default PopupWindow;
