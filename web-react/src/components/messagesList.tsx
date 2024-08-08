import { useParams } from 'react-router-dom'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getRoomMessages } from '../http/get-room-messages'

import { Message } from './message'
import { useMessagesWebsocket } from '../hooks/use-messages-websocket'

export function MessagesList() {
  const { roomID } = useParams()

  if (!roomID)
    throw new Error('MessagesList component must be used within room page')

  const { data } = useSuspenseQuery({
    queryKey: ['messages', roomID],
    queryFn: () => getRoomMessages({ roomID }),
  })

  useMessagesWebsocket({ roomID })

  return (
    <ol className="list-decimal list-outside px-3 space-y-8">
      {data?.messages.map((message) => (
        <Message
          key={message.id}
          id={message.id}
          text={message.text}
          reactionAmount={message.reactionAmount}
          answered={message.answered}
        />
      ))}
    </ol>
  )
}
