import { ArrowUp } from 'lucide-react'
import { useState } from 'react'

interface MessageProps {
  text: string
  reactionAmount: number
  answered?: boolean
}

export function Message({
  text,
  reactionAmount = 0,
  answered = false,
}: MessageProps) {
  const [hasReacted, setHasReacted] = useState(false)

  function handleReactionToMessage() {
    setHasReacted((prev) => !prev)
  }

  return (
    <li
      data-awnswered={answered}
      className="ml-4 leading-relaxed text-zinc-100 data-[awnswered=true]:opacity-50 data-[awnswered=true]:pointer-events-none"
    >
      {text}

      {hasReacted ? (
        <button
          type="button"
          className="mt-3 flex items-center gap-2 text-orange-400 text-sm font-medium hover:text-orange-500"
          onClick={handleReactionToMessage}
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({reactionAmount})
        </button>
      ) : (
        <button
          type="button"
          className="mt-3 flex items-center gap-2 text-zinc-400 text-sm font-medium hover:text-zinc-300"
          onClick={handleReactionToMessage}
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({reactionAmount})
        </button>
      )}
    </li>
  )
}
