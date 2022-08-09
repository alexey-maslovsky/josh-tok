import { FC, useEffect, ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';

interface TooltipPortalProps {
  children: ReactNode;
}

const Portal: FC<TooltipPortalProps> = ({ children }) => {
  const elementRef = useRef(document.createElement('div'));

  useEffect(() => {
    const el = elementRef.current;

    document.body.appendChild(el);

    return () => {
      document.body.removeChild(el);
    };
  }, []);

  return createPortal(children, elementRef.current);
};

export default Portal;
