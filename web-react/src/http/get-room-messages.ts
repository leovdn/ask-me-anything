interface GetRoomMessagesRequest {
  roomID: string
}

interface GetRoomMessagesResponse {
  id: string
  room_id: string
  message: string
  reaction_count: number
  answered: boolean
}

export async function getRoomMessages({ roomID }: GetRoomMessagesRequest) {
  const response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/rooms/${roomID}/messages`,
    {
      method: 'GET',
    }
  )

  const data: GetRoomMessagesResponse[] = await response.json()

  return {
    messages: data.map((message) => ({
      id: message.id,
      message: message.message,
      reactionAmount: message.reaction_count,
      answered: message.answered,
    })),
  }
}
