import { useCallOnPopstate, useNavigate } from 'hooks'
import { KeyboardEvent, MouseEvent, useCallback } from 'react'

type UseEmptyRouteType = {
  setOpen: (state: boolean) => void
}

export type ToggleModalType = (
  state: boolean
) => (event: MouseEvent | KeyboardEvent) => void

// This is for mobile devices where the user
// can close menu by action gestures such as
// swiping the left edge of the screen or
// touch the back button of the device.
export const useEmptyRoute = ({ setOpen }: UseEmptyRouteType) => {
  const navigate = useNavigate()

  const pushEmptyRoute = useCallback(() => history.pushState(null, '', ''), [])
  const clearEmptyRoute = useCallback(() => navigate(-1), [navigate])

  const toggleModal: ToggleModalType = useCallback(
    (state: boolean) => (event: MouseEvent | KeyboardEvent) => {
      // remove focus from the button
      event?.currentTarget && (event.currentTarget as HTMLButtonElement).blur()

      // open or close the modal
      setOpen(state)

      // when the user open the modal,
      if (state === true) {
        pushEmptyRoute()
      }

      // when the user close the modal,
      else {
        clearEmptyRoute()
      }
    },
    [setOpen]
  )

  const handlePopstate = useCallback(() => {
    setOpen(false)
  }, [toggleModal])

  // Close the modal on browser navigation
  useCallOnPopstate(handlePopstate)

  return {
    toggleModal,
    pushEmptyRoute,
    clearEmptyRoute
  }
}
