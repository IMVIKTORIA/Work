import React from 'react'
import { IProject } from '../shared/types'

const Context = React.createContext({
	data: [] as IProject[],
	dataRender: [] as IProject[],
})

export default Context
