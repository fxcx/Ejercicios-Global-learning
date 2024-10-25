import { TypeCriaturaElement } from '@/types/cardWars'
import type { Card, Criatura } from '@/types/cardWars'

export const ejemploCartaSeleccionadas: Array<Card<Criatura>> = [
  {
    id: 1,
    vida: 200,
    ataque: 22,
    CostEnergiaAtack: 2,
    criatura: {
      name: 'Cerdito',
      elemento: TypeCriaturaElement.MAGICO,
      habilidad: [
        {
          id: 1,
          description: 'algo',
          TipeHability: 'magico',
          daño: 10,
          costEnergyHability: 2,
          efect: () => console.log('Lanza un ataque mágico'),
          name: 'casa',
          duration: 3
        },
        {
          id: 2,
          description: 'algo',
          TipeHability: 'magico',
          daño: 10,
          costEnergyHability: 3,
          efect: () => console.log('Lanza un ataque mágico'),
          name: 'casa',
          duration: 3
        },
        {
          id: 3,
          description: 'algo',
          TipeHability: 'magico',
          daño: 10,
          costEnergyHability: 5,
          efect: () => console.log('Lanza un ataque mágico'),
          name: 'casa',
          duration: 3
        }

      ]
    }
  },
  {
    id: 2,
    vida: 150,
    ataque: 18,
    CostEnergiaAtack: 4,
    criatura: {
      name: 'Dragón de Azucar',
      elemento: TypeCriaturaElement.DULCE_REiNO,
      habilidad: [
        {
          id: 1,
          description: 'algo',
          TipeHability: 'directo',
          daño: 15,
          costEnergyHability: 3,
          efect: () => console.log('Lanza un ataque directo'),
          name: 'Ataque Directo'
        },
        {
          id: 2,
          description: 'algo',
          TipeHability: 'potenciado',
          daño: 20,
          costEnergyHability: 4,
          efect: () => console.log('Potencia el ataque'),
          name: 'Potenciado',
          duration: 3
        },
        {
          id: 3,
          description: 'algo',
          TipeHability: 'curar',
          daño: -10,
          costEnergyHability: 2,
          efect: () => console.log('Cura a un aliado'),
          name: 'Curar Aliado'
        }
      ]
    }
  }

]
