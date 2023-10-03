import { useState } from 'react'

import GeneralInfoContext from './GeneralnfoContext'

export default function GeneralInfoContextProvider({ children }: { children: JSX.Element }) {
  const [general, setGeneral] = useState<object>({})

  return (
    <GeneralInfoContext.Provider value={[general, setGeneral]}>
      {children}
    </GeneralInfoContext.Provider>
  )
}
