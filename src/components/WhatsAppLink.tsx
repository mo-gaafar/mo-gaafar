import React from 'react'
import { Icon } from './Icon'

export const whatsappUrl = 'https://wa.me/393514277009'
export const defaultMessage =
  'Hi Mohamed, I found your website and would like to discuss an AI or software project.'
export const factoryMessage =
  "Hi Mohamed, I'm interested in an AI software factory for my agency. Can we talk about our current workflow?"

export function WhatsAppLink({
  className = 'btn btn-primary',
  children = 'Message on WhatsApp',
  message = defaultMessage,
}: {
  className?: string
  children?: React.ReactNode
  message?: string
}) {
  return (
    <a
      href={`${whatsappUrl}?${new URLSearchParams({ text: message })}`}
      className={`${className} whatsapp-link`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon name="whatsapp" size={20} />
      <span>{children}</span>
    </a>
  )
}
