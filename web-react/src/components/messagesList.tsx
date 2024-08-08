import { useParams } from 'react-router-dom'
import { Message } from './message'
import { getRoomMessages } from '../http/get-room-messages'
import { useSuspenseQuery } from '@tanstack/react-query'

export function MessagesList() {
  const { roomID } = useParams()

  if (!roomID)
    throw new Error('MessagesList component must be used within room page')

  const { data } = useSuspenseQuery({
    queryKey: ['messages', roomID],
    queryFn: () => getRoomMessages({ roomID }),
  })

  return (
    <ol className="list-decimal list-outside px-3 space-y-8">
      {data?.messages.map((message) => (
        <Message
          key={message.id}
          text={message.message}
          reactionAmount={message.reactionAmount}
          answered={message.answered}
        />
      ))}
    </ol>
  )
}
