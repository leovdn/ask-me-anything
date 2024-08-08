import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import { addMessageReaction } from '../http/add-message-reaction'
import { toast } from 'sonner'
import { removeMessageReaction } from '../http/remove-message-reaction'

interface MessageProps {
  id: string
  text: string
  reactionAmount: number
  answered?: boolean
}

export function Message({
  id: messageID,
  text,
  reactionAmount,
  answered = false,
}: MessageProps) {
  const { roomID } = useParams()
  const [hasReacted, setHasReacted] = useState(false)

  if (!roomID)
    throw new Error('MessagesList component must be used within room page')

  async function addMessageReactionAction() {
    if (!roomID) return

    try {
      await addMessageReaction({ roomID, messageID })
      setHasReacted(true)
    } catch {
      toast.error('Falha ao curtir mensagem!')
    }
  }

  async function removeMessageReactionAction() {
    if (!roomID) return

    try {
      await removeMessageReaction({ roomID, messageID })
      setHasReacted(false)
    } catch {
      toast.error('Falha ao descurtir mensagem!')
    }
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
          onClick={removeMessageReactionAction}
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({reactionAmount})
        </button>
      ) : (
        <button
          type="button"
          className="mt-3 flex items-center gap-2 text-zinc-400 text-sm font-medium hover:text-zinc-300"
          onClick={addMessageReactionAction}
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({reactionAmount})
        </button>
      )}
    </li>
  )
}
