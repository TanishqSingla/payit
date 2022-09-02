import React from "react"

interface ModalProps {
  children: React.ReactNode,
  visible: boolean,
  onCancel: (e: React.MouseEvent) => void
}

export default function Modal(props: ModalProps) {
  return <div className={`h-full w-full bg-dark-surface/50 dark:bg-dark-primary/70 fixed top-0 flex justify-center items-center ${props.visible ? '' : 'hidden'}`} onClick={props.onCancel}>
    {props.children}
  </div>
}