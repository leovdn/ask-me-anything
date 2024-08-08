interface RemoveMessageReaction {
  roomID: string
  messageID: string
}

export async function removeMessageReaction({
  roomID,
  messageID,
}: RemoveMessageReaction) {
  await fetch(
    `${
      import.meta.env.VITE_APP_API_URL
    }/rooms/${roomID}/messages/${messageID}/reaction`,
    {
      method: 'DELETE',
    }
  )
}
