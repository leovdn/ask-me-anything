import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { GetRoomMessagesResponse } from '../http/get-room-messages'

interface UseMessagesWebsocketParams {
  roomID: string
}

type WebhookMessage =
  | { kind: 'message_created'; value: { id: string; message: string } }
  | { kind: 'message_answered'; value: { id: string } }
  | { kind: 'message_reaction_increased'; value: { id: string; count: number } }
  | { kind: 'message_reaction_decreased'; value: { id: string; count: number } }

export function useMessagesWebsocket({ roomID }: UseMessagesWebsocketParams) {
  const queryClient = useQueryClient()

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/subscribe/${roomID}`)

    ws.onopen = () => {
      console.log('Websocket Connected!')
    }

    ws.onclose = () => {
      console.log('Websocket Disconnected!')
    }

    ws.onmessage = (event) => {
      const data: WebhookMessage = JSON.parse(event.data)

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
}
