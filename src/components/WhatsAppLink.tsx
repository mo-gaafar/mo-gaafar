export const whatsappUrl = 'https://wa.me/393514277009'

export function WhatsAppLink({ className = 'btn btn-primary', children = 'Chat on WhatsApp' }: { className?: string; children?: React.ReactNode }) {
  return <a href={whatsappUrl} className={className} target="_blank" rel="noopener noreferrer">{children}</a>
}
