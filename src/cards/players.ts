import type { Players } from '@/types/cardWars'
import { TypeCriaturaElement } from '@/types/cardWars'

export const ejemploPlayer1: Players = {
  id: 1,
  playerName: 'jaimito',
  Personaje: {
    namePersonajes: 'grumosa',
    specialAtack: [
      {
        id: 1,
        name: 'algo ',
        description: 'cura 100% de la vida de una criatura',
        TipeHability: 'curar',
        costEnergyHability: 1,
        curar: 100,
        efect: () => { console.log('algo que cura jajaj') }
      },
      {
        id: 1,
        name: 'algo ',
        description: 'cura 100% de la vida de una criatura',
        TipeHability: 'curar',
        costEnergyHability: 1,
        curar: 100,
        efect: () => { console.log('algo que cura jajaj') }
      },
      {
        id: 1,
        name: 'algo ',
        description: 'cura 100% de la vida de una criatura',
        TipeHability: 'curar',
        costEnergyHability: 1,
        curar: 100,
        efect: () => { console.log('algo que cura jajaj') }
      }
    ],
    element: TypeCriaturaElement.DULCE_REiNO
  },
  card: [],
  hability: [],
  atributos: {}
}
export const ejemploPlayer2: Players = {
  id: 2,
  playerName: 'pepita',
  Personaje: {
    namePersonajes: 'marcin',
    specialAtack: [
      {
        id: 1,
        name: 'Veneno Mortal',
        description: 'Inflige daño por veneno a lo largo del tiempo.',
        TipeHability: 'veneno',
        costEnergyHability: 1,
        daño: 5,
        duration: 3,
        efect: () => { console.log('Efecto de veneno activado') }
      },
      {
        id: 2,
        name: 'Veneno Mortal',
        description: 'Inflige daño por veneno a lo largo del tiempo.',
        TipeHability: 'veneno',
        costEnergyHability: 1,
        daño: 5,
        duration: 3,
        efect: () => { console.log('Efecto de veneno activado') }
      },
      {
        id: 3,
        name: 'Veneno Mortal',
        description: 'Inflige daño por veneno a lo largo del tiempo.',
        TipeHability: 'veneno',
        costEnergyHability: 1,
        daño: 5,
        duration: 3,
        efect: () => { console.log('Efecto de veneno activado') }
      }
    ],
    element: TypeCriaturaElement.CIENAGA
  },
  card: [],
  hability: [],
  atributos: {}
}
