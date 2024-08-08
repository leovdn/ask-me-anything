import { ArrowRight } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { createMessage } from '../http/create-message'
import { toast } from 'sonner'

export function FormCreateMessage() {
  const { roomID } = useParams()

  if (!roomID)
    throw new Error('MessagesList component must be used within room page')

  async function CreateMessageAction(data: FormData) {
    const message = data.get('message')?.toString()

    if (!message || !roomID) return

    try {
      await createMessage({ roomID, message })
    } catch {
      toast.error('Ocorreu um erro ao criar a pergunta')
    }
  }

  return (
    <form
      action={CreateMessageAction}
      className=" flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 ring-orange-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-1"
    >
      <input
        type="text"
        name="message"
        placeholder="Qual a sua pergunta?"
        autoComplete="off"
        required
        className="flex-1 bg-transparent text-sm mx-2 outline-none placeholder:text-zinc-500 text-zinc-100"
      />

      <button
        type="submit"
        className="bg-orange-400 text-orange-950 px-3 py-1.5 gap-1.5 flex items-center font-medium text-sm rounded-lg hover:bg-orange-500 transition-colors"
      >
        Criar pergunta
        <ArrowRight className="size-4" />
      </button>
    </form>
  )
}
