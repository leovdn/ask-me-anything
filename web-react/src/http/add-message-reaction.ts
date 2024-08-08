interface AddMessageReaction {
  roomID: string
  messageID: string
}

export async function addMessageReaction({
  roomID,
  messageID,
}: AddMessageReaction) {
  await fetch(
    `${
      import.meta.env.VITE_APP_API_URL
    }/rooms/${roomID}/messages/${messageID}/reaction`,
    {
      method: 'PATCH',
    }
  )
}
