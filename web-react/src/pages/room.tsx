import { toast } from 'sonner'
import { useParams } from 'react-router-dom'
import { MessagesList } from '../components/messagesList'
import { Share2 } from 'lucide-react'

import logo from '../assets/ama-logo.svg'
import { FormCreateMessage } from '../components/form-create-message'
import { Suspense } from 'react'

export function Room() {
  const { roomID } = useParams()

  function handleShareRoom() {
    const url = window.location.href.toString()

    if (navigator.share !== undefined && navigator.canShare()) {
      navigator.share({ url })
    } else {
      navigator.clipboard.writeText(url)

      toast.info('Link copiado para área de transferência!')
    }
  }

  return (
    <div className="mx-auto max-w-[640px] flex flex-col gap-6 py-10 px-4">
      <div className="flex items-center gap-3 px-3">
        <img src={logo} alt="Logo" className="h-5" />

        <span className="text-sm text-zinc-500 truncate">
          Código da sala: <span className="text-zinc-300 ">{roomID}</span>
        </span>

        <button
          type="submit"
          className="bg-zinc-800 text-zinc-300 ml-auto px-3 py-1.5 gap-1.5 flex items-center font-medium text-sm rounded-lg hover:bg-zinc-700 transition-colors"
          onClick={handleShareRoom}
        >
          Compartilhar
          <Share2 className="size-4" />
        </button>
      </div>

      <div className="h-px w-full bg-zinc-900" />

      <FormCreateMessage />

      <Suspense fallback={<div>Loading...</div>}>
        <MessagesList />
      </Suspense>
    </div>
  )
}
