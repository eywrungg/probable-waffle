interface Props {
  label: string
  accent?: boolean
}

export default function Tag({ label, accent }: Props) {
  return (
    <span
      className="font-mono text-xs px-2.5 py-1 rounded-md border"
      style={
        accent
          ? { borderColor: 'var(--accent)', background: 'color-mix(in srgb, var(--accent) 10%, transparent)', color: 'var(--accent)' }
          : { borderColor: 'var(--border)', background: 'var(--surface)', color: 'var(--ink-3)' }
      }
    >
      {label}
    </span>
  )
}
