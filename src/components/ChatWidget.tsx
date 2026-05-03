import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Send, MessageCircle } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

type Message = { from: 'user' | 'charles'; text: string }

const FAQS: { match: RegExp; answer: string }[] = [
  {
    match: /stack|tech|use|tools|language/i,
    answer: "I primarily work with React, TypeScript, Tailwind CSS, and Vite on the frontend. For backend I use Node.js and PostgreSQL. I'm also working with Unity for mobile/AR campus navigation.",
  },
  {
    match: /available|hire|freelance|open|work|job|internship/i,
    answer: "Yes — I'm currently open to internships and freelance projects. If you have something interesting, reach out via the contact section or email me directly.",
  },
  {
    match: /ar|campus|navigation|smcbi/i,
    answer: "Campus AR Navigation is my current project - an AR campus wayfinding app for SMCBI built with Unity.",
  },
  {
    match: /project|work|built|portfolio|shelf|pulse/i,
    answer: "I've built PyroWatch APK, Rick and Morty API, Relox Luxury Watch Store, and I'm currently building Campus AR Navigation in Unity. Check the Projects section for details.",
  },
  {
    match: /contact|email|reach|message|talk/i,
    answer: "Best way to reach me is email — charlesarone@example.com. You can also find me on GitHub and LinkedIn. I reply within 24 hours.",
  },
  {
    match: /location|based|where|country|philippines/i,
    answer: "I'm based in the Philippines.",
  },
  {
    match: /experience|background|years|how long/i,
    answer: "I've been building for a few years — freelance frontend work, open source contributions, and now a full AR navigation system as my capstone. Still early in my career but shipping real things.",
  },
  {
    match: /resume|cv/i,
    answer: "You can download my resume from the Contact section at the bottom of the page.",
  },
  {
    match: /hello|hi|hey|sup|yo/i,
    answer: "Hey! I'm Charles's portfolio bot. Ask me anything about his work, stack, availability, or projects.",
  },
]

const FALLBACK =
  "Good question — I'm not sure I have a great answer for that. Try reaching out directly at charlesarone@example.com and Charles will get back to you."

function getReply(input: string): string {
  for (const faq of FAQS) {
    if (faq.match.test(input)) return faq.answer
  }
  return FALLBACK
}

const SUGGESTIONS = ['Is he available?', "What's his stack?", 'Tell me about his projects']

export default function ChatWidget() {
  const [open, setOpen]       = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { from: 'charles', text: "Hey 👋 I'm Charles's portfolio bot. Ask me about his work, stack, or availability." },
  ])
  const [input, setInput]     = useState('')
  const [typing, setTyping]   = useState(false)
  const bottomRef             = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setInput('')
    setMessages((m) => [...m, { from: 'user', text: trimmed }])
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [...m, { from: 'charles', text: getReply(trimmed) }])
    }, 800)
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* ── Chat panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{    opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="w-[340px] rounded-2xl border overflow-hidden flex flex-col"
            style={{
              background: 'var(--card)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--nav-shadow)',
              height: '460px',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b shrink-0"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: 'var(--accent)' }} />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: 'var(--accent)' }} />
                </span>
                <span className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
                  Chat with Charles
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 flex items-center justify-center rounded-full transition-colors"
                style={{ color: 'var(--ink-3)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-3)')}
              >
                <X size={14} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className="max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
                    style={
                      msg.from === 'user'
                        ? { background: 'var(--accent)', color: 'var(--bg)', borderRadius: '18px 18px 4px 18px' }
                        : { background: 'var(--surface)', color: 'var(--ink-2)', borderRadius: '18px 18px 18px 4px' }
                    }
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div className="flex justify-start">
                  <div
                    className="px-4 py-3 rounded-2xl flex gap-1 items-center"
                    style={{ background: 'var(--surface)', borderRadius: '18px 18px 18px 4px' }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="block w-1.5 h-1.5 rounded-full"
                        style={{ background: 'var(--ink-3)' }}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions — only show at start */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs px-3 py-1.5 rounded-pill border transition-colors"
                    style={{ borderColor: 'var(--border)', color: 'var(--ink-2)', background: 'var(--surface)' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div
              className="px-3 py-3 border-t flex gap-2 items-center shrink-0"
              style={{ borderColor: 'var(--border)' }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask me anything…"
                className="flex-1 text-sm px-3 py-2 rounded-xl border outline-none transition-colors bg-transparent"
                style={{
                  borderColor: 'var(--border)',
                  color: 'var(--ink)',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onBlur={e  => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim()}
                className="w-8 h-8 flex items-center justify-center rounded-xl transition-all shrink-0"
                style={{
                  background: input.trim() ? 'var(--accent)' : 'var(--surface)',
                  color: input.trim() ? 'var(--bg)' : 'var(--ink-3)',
                }}
              >
                <Send size={13} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Trigger button ── */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2.5 px-4 h-11 rounded-pill border text-sm font-medium transition-colors"
        style={{
          background: 'var(--card)',
          borderColor: 'var(--border)',
          color: 'var(--ink-2)',
          boxShadow: 'var(--nav-shadow)',
        }}
      >
        <MessageCircle size={15} style={{ color: 'var(--accent)' }} />
        Chat with Charles
      </motion.button>
    </div>
  )
}
