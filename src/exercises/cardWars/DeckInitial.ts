import type { Card, Criatura, ICardDeckInitial, LimitHabilitiesCriature } from '@/types/cardWars'

export class DeckInitial<T extends Card<Criatura>> implements ICardDeckInitial {
  private readonly _cards: Array<Card<Criatura>>
  lengthInicialDeck = 5
  // por defecto un maximo de 5 criaturas
  constructor (cards: T[], lengthInicialDeck = this.lengthInicialDeck) {
    this._cards = cards
    this.lengthInicialDeck = lengthInicialDeck
  }

  // cuando inicializa el juego puede elegir hasta 5 criaturas
  getCardsCriature (): Array<Card<Criatura>> | never {
    if (this._cards.length > this.lengthInicialDeck) {
      throw new Error(`No puedes seleccionar más de ${this.lengthInicialDeck} cartas`)
    }
    return this._cards
  }

  // estas habilidades son de las criaturas seleccionadas
  getCardsHability (): LimitHabilitiesCriature[] {
    return this._cards.map(card => card.criatura.habilidad)
  }
}
