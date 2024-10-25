import type { Card, Criatura, CardHability, IDistribute } from '@/types/cardWars'
import { DeckInitial } from './DeckInitial'

export class DistributorCards<T extends Card<Criatura>> implements IDistribute {
  private readonly _deck: DeckInitial<T>
  lengthInicialDistribute: number = 5
  constructor (deck: DeckInitial<T>) {
    this._deck = deck
  }

  // Mezclar las cartas seleccionadas y cartas de habilidades
  shuffleCriature (): void {
    this._deck.getCardsCriature()?.sort(() => Math.random() - 0.5)
  }

  shuffleHability (): void {
    this._deck.getCardsHability()?.sort(() => Math.random() - 0.5)
  }

  // Reparte 5 cartas de criaturas
  dealCriature (): Array<Card<Criatura>> {
    const cards = this._deck.getCardsCriature()

    if (cards == null) {
      console.log('No hay cartas disponibles para seleccionar')
      return []
    }
    return cards.slice(0, this.lengthInicialDistribute)
  }

  // Reparte 5 habilidades
  dealHability (): CardHability[] | never {
    const habilities = this._deck.getCardsHability().flat()

    if (habilities.length === 0) {
      throw new Error('no hay habilades')
    }

    return habilities.slice(0, this.lengthInicialDistribute)
  }
}
