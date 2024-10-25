import type { Zona, Ecenario } from '@/types/cardWars'
import { TypeCriaturaElement } from '@/types/cardWars'

const zona1: Zona = {
  id: 1,
  zonaName: 'Río CHoco Loca',
  element: TypeCriaturaElement.DULCE_REiNO
}

const zona2: Zona = {
  id: 2,
  zonaName: 'Castillo de arena',
  element: TypeCriaturaElement.TIERRA_ARENOSA
}

const zona3: Zona = {
  id: 3,
  zonaName: 'Pantano Cienaga',
  element: TypeCriaturaElement.CIENAGA
}

export const ecenarioBattle: Ecenario<Zona> = {
  zonas: [zona1, zona2, zona3]

}
