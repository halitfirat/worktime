import React from 'react';
import ReactDom from 'react-dom';

export default function Modal({ open, children }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className="overlays" />
      <div className="modals">{children}</div>
    </>,
    document.getElementById('portal')
  );
}
