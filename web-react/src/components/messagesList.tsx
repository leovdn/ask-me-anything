import { useParams } from 'react-router-dom'
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import {
  getRoomMessages,
  GetRoomMessagesResponse,
} from '../http/get-room-messages'

import { Message } from './message'
import { useEffect } from 'react'

export function MessagesList() {
  const queryClient = useQueryClient()
  const { roomID } = useParams()

  if (!roomID)
    throw new Error('MessagesList component must be used within room page')

  const { data } = useSuspenseQuery({
    queryKey: ['messages', roomID],
    queryFn: () => getRoomMessages({ roomID }),
  })

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/subscribe/${roomID}`)

    ws.onopen = () => {
      console.log('Websocket Connected!')
    }

    ws.onclose = () => {
      console.log('Websocket Disconnected!')
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)

      switch (data.kind) {
        case 'message_created':
          queryClient.setQueryData<GetRoomMessagesResponse>(
            ['messages', roomID],
            (state) => {
              return {
                messages: [
                  ...(state?.messages ?? []),
                  {
                    id: data.value.id,
                    text: data.value.message,
                    reactionAmount: 0,
                    answered: false,
                  },
                ],
              }
            }
          )
          break
        case 'message_answered':
          queryClient.setQueryData<GetRoomMessagesResponse>(
            ['messages', roomID],
            (state) => {
              if (!state) return undefined

              return {
                messages: state.messages.map((message) => {
                  if (message.id === data.value.id) {
                    return { ...message, answered: true }
                  }

                  return message
                }),
              }
            }
          )
          break
        case 'message_reaction_increased':
        case 'message_reaction_decreased':
          queryClient.setQueryData<GetRoomMessagesResponse>(
            ['messages', roomID],
            (state) => {
              console.log(state)
              if (!state) return undefined

              return {
                messages: state.messages.map((message) => {
                  if (message.id === data.value.id) {
                    return {
                      ...message,
                      reactionAmount: data.value.count,
                    }
                  }

                  return message
                }),
              }
            }
          )
          break
      }
    }

    return () => {
      ws.close()
    }
  }, [queryClient, roomID])

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
