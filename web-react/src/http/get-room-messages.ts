interface GetRoomMessagesRequest {
  roomID: string
}

type MessagesProps = {
  id: string
  room_id: string
  message: string
  reaction_count: number
  answered: boolean
}

export interface GetRoomMessagesResponse {
  messages: {
    id: string
    text: string
    reactionAmount: number
    answered: boolean
  }[]
}

export async function getRoomMessages({
  roomID,
}: GetRoomMessagesRequest): Promise<GetRoomMessagesResponse> {
  const response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/rooms/${roomID}/messages`,
    {
      method: 'GET',
    }
  )

  const data: MessagesProps[] = await response.json()

  return {
    messages: data.map((message) => ({
      id: message.id,
      text: message.message,
      reactionAmount: message.reaction_count,
      answered: message.answered,
    })),
  }
}
