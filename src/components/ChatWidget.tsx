// 'use client'

// import { useState, useRef, useEffect } from 'react'

// interface Message {
//   id: string
//   content: string
//   isAdmin: boolean
//   createdAt: string
// }

// export default function ChatWidget() {
//   const [open, setOpen] = useState(false)
//   const [step, setStep] = useState<'form' | 'chat'>('form')
//   const [loading, setLoading] = useState(false)
//   const [conversationId, setConversationId] = useState('')
//   const [messages, setMessages] = useState<Message[]>([])
//   const [newMessage, setNewMessage] = useState('')
//   const [visitorInfo, setVisitorInfo] = useState({ name: '', email: '' })
//   const [form, setForm] = useState({ name: '', email: '', message: '' })
//   const messagesEndRef = useRef<HTMLDivElement>(null)

//   // Scroll to bottom when new messages arrive
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }, [messages])

//   // Poll for new messages every 5 seconds when chat is open
//   useEffect(() => {
//     if (!conversationId || !open) return
//     const interval = setInterval(async () => {
//       const res = await fetch(`/api/conversations/${conversationId}`)
//       if (res.ok) {
//         const data = await res.json()
//         setMessages(data.messages.map((m: { id: string; content: string; seen: boolean; createdAt: string }) => ({
//           id: m.id,
//           content: m.content,
//           isAdmin: m.seen,
//           createdAt: m.createdAt,
//         })))
//       }
//     }, 5000)
//     return () => clearInterval(interval)
//   }, [conversationId, open])

//   const startConversation = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     try {
//       const res = await fetch('/api/conversations', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           visitorName: form.name,
//           visitorEmail: form.email,
//           content: form.message,
//         }),
//       })
//       if (res.ok) {
//         const data = await res.json()
//         setConversationId(data.conversation.id)
//         setVisitorInfo({ name: form.name, email: form.email })
//         setMessages([{
//           id: data.message.id,
//           content: form.message,
//           isAdmin: false,
//           createdAt: data.message.createdAt,
//         }])
//         setStep('chat')
//       }
//     } catch (error) {
//       console.error('Failed to start conversation:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const sendReply = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!newMessage.trim()) return
//     const content = newMessage
//     setNewMessage('')

//     // Optimistically add message
//     setMessages(prev => [...prev, {
//       id: Date.now().toString(),
//       content,
//       isAdmin: false,
//       createdAt: new Date().toISOString(),
//     }])

//     try {
//       await fetch(`/api/conversations/${conversationId}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ content, isAdmin: false }),
//       })
//     } catch (error) {
//       console.error('Failed to send reply:', error)
//     }
//   }

//   return (
//     <>
//       {/* Chat bubble button */}
//       <button
//         onClick={() => setOpen(!open)}
//         style={{
//           position: 'fixed', bottom: '2rem', left: '2rem', zIndex: 100,
//           width: '54px', height: '54px', borderRadius: '50%',
//           background: 'var(--teal)', border: 'none',
//           display: 'flex', alignItems: 'center', justifyContent: 'center',
//           cursor: 'pointer', fontSize: '1.3rem',
//           boxShadow: '0 8px 30px rgba(0,229,195,0.35)',
//           transition: 'all 0.2s',
//         }}
//         title="Chat with us"
//       >
//         {open ? '✕' : '💬'}
//       </button>

//       {/* Chat window */}
//       {open && (
//         <div style={{
//           position: 'fixed', bottom: '6rem', left: '2rem', zIndex: 100,
//           width: '340px', maxHeight: '500px',
//           background: 'var(--surface)', border: '1px solid var(--border)',
//           borderRadius: '16px', overflow: 'hidden',
//           boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
//           display: 'flex', flexDirection: 'column',
//         }}>

//           {/* Header */}
//           <div style={{
//             background: 'var(--bg3)', borderBottom: '1px solid var(--border)',
//             padding: '1rem 1.2rem',
//             display: 'flex', alignItems: 'center', gap: '0.8rem',
//           }}>
//             <div style={{
//               width: '36px', height: '36px', borderRadius: '50%',
//               background: 'var(--teal-dim)', border: '1px solid rgba(0,229,195,0.3)',
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               fontSize: '1rem',
//             }}>👩‍💻</div>
//             <div>
//               <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.9rem' }}>
//                 Mercy Dev Studio
//               </div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
//                 <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
//                 <span style={{ color: 'var(--text3)', fontSize: '0.72rem' }}>Usually replies within 1 hour</span>
//               </div>
//             </div>
//           </div>

//           {/* Step 1 — intro form */}
//           {step === 'form' && (
//             <form onSubmit={startConversation} style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', overflowY: 'auto' }}>
//               <p style={{ color: 'var(--text2)', fontSize: '0.85rem', lineHeight: 1.5 }}>
//                 Hey there 👋 Send me a message and I&apos;ll get back to you as soon as possible!
//               </p>
//               <div>
//                 <label style={labelStyle}>Your Name</label>
//                 <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
//                   required placeholder="John Doe" style={inputStyle} />
//               </div>
//               <div>
//                 <label style={labelStyle}>Email</label>
//                 <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
//                   required placeholder="john@example.com" style={inputStyle} />
//               </div>
//               <div>
//                 <label style={labelStyle}>Message</label>
//                 <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
//                   required rows={3} placeholder="What can I help you with?"
//                   style={{ ...inputStyle, resize: 'none' }} />
//               </div>
//               <button type="submit" disabled={loading} style={{
//                 background: 'var(--teal)', color: '#0a0a0f', border: 'none',
//                 padding: '0.7rem', borderRadius: '8px',
//                 fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.88rem',
//                 cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
//               }}>
//                 {loading ? 'Sending...' : 'Send Message →'}
//               </button>
//             </form>
//           )}

//           {/* Step 2 — chat thread */}
//           {step === 'chat' && (
//             <>
//               {/* Messages */}
//               <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', maxHeight: '320px' }}>
//                 {/* Welcome message from admin */}
//                 <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
//                   <div style={{
//                     background: 'var(--bg3)', borderRadius: '12px 12px 12px 4px',
//                     padding: '0.6rem 0.9rem', maxWidth: '80%',
//                     fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.5,
//                   }}>
//                     Thanks {visitorInfo.name.split(' ')[0]}! I&apos;ve received your message and will reply shortly 🙌
//                   </div>
//                 </div>

//                 {messages.map((msg) => (
//                   <div key={msg.id} style={{
//                     display: 'flex',
//                     justifyContent: msg.isAdmin ? 'flex-start' : 'flex-end',
//                   }}>
//                     <div style={{
//                       background: msg.isAdmin ? 'var(--bg3)' : 'var(--teal)',
//                       color: msg.isAdmin ? 'var(--text2)' : '#0a0a0f',
//                       borderRadius: msg.isAdmin ? '12px 12px 12px 4px' : '12px 12px 4px 12px',
//                       padding: '0.6rem 0.9rem', maxWidth: '80%',
//                       fontSize: '0.82rem', lineHeight: 1.5,
//                     }}>
//                       {msg.content}
//                     </div>
//                   </div>
//                 ))}
//                 <div ref={messagesEndRef} />
//               </div>

//               {/* Reply input */}
//               <form onSubmit={sendReply} style={{
//                 borderTop: '1px solid var(--border)',
//                 padding: '0.8rem', display: 'flex', gap: '0.5rem',
//               }}>
//                 <input
//                   value={newMessage}
//                   onChange={e => setNewMessage(e.target.value)}
//                   placeholder="Type a message..."
//                   style={{ ...inputStyle, flex: 1, padding: '0.6rem 0.8rem', fontSize: '0.82rem' }}
//                 />
//                 <button type="submit" style={{
//                   background: 'var(--teal)', color: '#0a0a0f', border: 'none',
//                   padding: '0.6rem 1rem', borderRadius: '8px',
//                   fontFamily: 'Syne, sans-serif', fontWeight: 700,
//                   fontSize: '0.82rem', cursor: 'pointer',
//                 }}>→</button>
//               </form>
//             </>
//           )}
//         </div>
//       )}
//     </>
//   )
// }

// const labelStyle: React.CSSProperties = {
//   display: 'block', fontSize: '0.75rem', fontWeight: 600,
//   fontFamily: 'Syne, sans-serif', color: 'var(--text3)', marginBottom: '0.3rem',
// }

// const inputStyle: React.CSSProperties = {
//   width: '100%', background: 'var(--bg)',
//   border: '1px solid var(--border)', color: 'var(--text)',
//   padding: '0.6rem 0.8rem', borderRadius: '8px',
//   fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', outline: 'none',
// }
