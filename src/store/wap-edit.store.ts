import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Wap } from '../models/wap'
import { makeId } from '../services/util.service'
import { dummyMap, wapService } from '../services/wap.service'
import { stat } from 'fs'

interface WapEditState {
    wap: Wap
    selectedSectionId: null | string
    selectedElId: string | null
    highlightedElsId: string[]
    media: 'large' | 'medium' | 'small'
    grabMode: '' | 'resize-section' | 'resize-el' | 'rotate-el' | 'drag-els'
    mouseStartPos: { x: number, y: number } | null
    mouseRelPos: { x: number, y: number } | null
    ref: HTMLElement
}

const initialState: WapEditState = {
    wap: dummyMap,
    selectedSectionId: null,
    selectedElId: null,
    highlightedElsId: [],
    media: 'large',
    grabMode: '',
    mouseRelPos: null,
    mouseStartPos: null,
    ref: document.querySelector('h1')!
}

export const wapEditSlice = createSlice({
    name: 'wap-edit',
    initialState,
    reducers: {
        // getWapById: (state, action: PayloadAction<string>)=>{state.wap = wapService.getWapById(action.payload)},
        // setRef: (state, action: PayloadAction<HTMLElement>)=>{state.ref = action.payload},
        setSelectedSectionId: (state, action: PayloadAction<string | null>) => {
            const sectionId = action.payload
            if (sectionId) state.highlightedElsId = state.selectedSectionId === sectionId
                ? wapService.getSectionById(state.wap as Wap, sectionId)?.cmps.map(cmp => cmp.id) || []
                : []
            state.selectedSectionId = sectionId
        },
        setSelectedElId: (state, action: PayloadAction<string | null>) => { state.selectedElId = action.payload },
        setMouseRelPos: (state, action: PayloadAction<{ x: number, y: number } | null>) => { state.mouseRelPos = action.payload },
        setMouseStartPos: (state, action: PayloadAction<{ x: number, y: number } | null>) => { state.mouseStartPos = action.payload },
        setHighlightedElsId: (state, action: PayloadAction<string[]>) => { state.highlightedElsId = action.payload },
        setMedia: (state, action: PayloadAction<'large' | 'medium' | 'small'>) => { state.media = action.payload },
        setGrabMode: (state, action: PayloadAction<'' | 'resize-section' | 'resize-el' | 'rotate-el' | 'drag-els'>) => { state.grabMode = action.payload },
    },
})

export const {
    setSelectedSectionId,
    setSelectedElId,
    setGrabMode,
    setHighlightedElsId,
    setMedia,
    setMouseRelPos,
    setMouseStartPos
} = wapEditSlice.actions

export default wapEditSlice.reducer