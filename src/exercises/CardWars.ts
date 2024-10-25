import type { Card, CardHability, Criatura, LimitHabilitiesCriature, IDistribute, ICardDeckInitial, Ecenario, Zona, Players, PlayerLimit, ZoneBattle, ICampBattle } from '@/types/cardWars'
import { card, players, zona } from '@/cards/index'

class DeckInitial<T extends Card<Criatura>> implements ICardDeckInitial {
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
      console.log(`No puedes seleccionar más de ${this.lengthInicialDeck} cartas`)
    }
    return this._cards
  }

  // estas habilidades son de las criaturas seleccionadas
  getCardsHability (): LimitHabilitiesCriature[] {
    return this._cards.map(card => card.criatura.habilidad)
  }
}

class DistributorCards<T extends Card<Criatura>> implements IDistribute {
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

class PlayersCard {
  player: Players
  constructor (card: Array<Card<Criatura>>, hability: CardHability[], player: Players) {
    this.player = player
    this.player.card = card
    this.player.hability = hability
  }
}

// Preparar el campo de batalla
class CampGameCardWars implements ICampBattle {
  playersLimit: PlayerLimit
  zone: Ecenario<Zona>
  energyRound: number = 2
  round: number = 1
  time: number = 15
  private readonly _zoneBattle: ZoneBattle[] = []

  constructor (player1: PlayersCard, player2: PlayersCard, zone: Ecenario<Zona>) {
    this.zone = zone
    this.playersLimit = [player1.player, player2.player]
  }

  zoneBattle (): ZoneBattle[] {
    return this._zoneBattle
  }

  aleatorioTurn (): void {
    const turno = Math.random() < 0.5
    return console.log(turno ? ` ${this.playersLimit[0].playerName}` : `${this.playersLimit[1].playerName}`)
  }

  // agrega una criatura segun el indece que le pasemos a la zona de batalla[]
  addCriatureCamp (cardIndex: number): Card<Criatura> {
    if (cardIndex < 0 || cardIndex > this.playersLimit[0].card.length) throw new Error('Indice invalido')

    const criature = this.playersLimit[0].card[cardIndex]
    this._zoneBattle.push(criature)
    return criature
  }

  // agrega una carta de habilidad a la zona de batalla[]
  addHabilityCards (cardIndex: number): CardHability {
    const hability = this.playersLimit[0].hability
    const aplano = hability.flat()
    const card = aplano[cardIndex]
    this._zoneBattle.push(card)
    return card
  }

  // entre los elemt de los personajes, se define aletoriamente el lugar de la zona de combate
  addEcenarioZone (): ZoneBattle[] {
    const elementoJugador1 = this.playersLimit[0].Personaje.element
    const elementoJugador2 = this.playersLimit[1].Personaje.element

    const zonasFiltradas = this.zone.zonas.filter(zona =>
      zona.element === elementoJugador1 || zona.element === elementoJugador2
    )

    if (zonasFiltradas.length === 0) {
      this._zoneBattle.push(this.zone.zonas[3])
      console.log('zona por defecto')
    }
    const zonaSeleccionada = zonasFiltradas[Math.floor(Math.random() * zonasFiltradas.length)]
    this._zoneBattle.push(zonaSeleccionada)
    console.log(`lugar ${zonaSeleccionada.zonaName} potencia criaturas elemento ${zonaSeleccionada.element}`)
    return this._zoneBattle
  }
}

class BattleCardWars {
  private readonly _zoneBattle: ZoneBattle[]
  private energy: number[] = [2, 2] // Energía inicial para ambos jugadores
  private currentTurn: number = 0 // Índice del jugador que tiene el turno (0 o 1)

  constructor (zoneBattle: ZoneBattle[]) {
    this._zoneBattle = zoneBattle
  }

  // Método para atacar en un turno
  atacar (playerIndex: number, criatureIndex: number): void {
    if (this.energy[playerIndex] <= 0) {
      console.log(`El jugador ${playerIndex + 1} no tiene suficiente energía para atacar`)
      return
    }

    // Filtramos las criaturas del jugador en la zona de batalla
    const criaturasEnZona = this._zoneBattle.filter(
      (item): item is Card<Criatura> => 'criatura' in item
    )

    const atacante = criaturasEnZona[criatureIndex]
    const oponente = criaturasEnZona[(criatureIndex + 1) % 2]

    // Realizar el ataque
    oponente.vida -= atacante.ataque
    this.energy[playerIndex] -= atacante.CostEnergiaAtack

    console.log(`${atacante.criatura.name} ataca a ${oponente.criatura.name}. Vida restante del oponente: ${oponente.vida}`)

    // Si el oponente muere, eliminarlo de la zona de batalla
    if (oponente.vida <= 0) {
      console.log(`${oponente.criatura.name} ha sido derrotada y eliminada de la batalla.`)
      const index = this._zoneBattle.indexOf(oponente)
      this._zoneBattle.splice(index, 1)
    }
  }

  // Cambiar turno al siguiente jugador
  cambiarTurno (): void {
    this.currentTurn = (this.currentTurn + 1) % 2
    this.energy[this.currentTurn] = 2 // Regenerar energía para el nuevo turno
    console.log(`Es el turno del jugador ${this.currentTurn + 1}. Energía regenerada a 2.`)
  }

  // Verificar si alguien ha ganado
  checkWinner (): void {
    const criaturasRestantes = this._zoneBattle.filter(
      (item): item is Card<Criatura> => 'criatura' in item
    )

    const jugador1Criaturas = criaturasRestantes.filter(criatura => this._zoneBattle.indexOf(criatura) % 2 === 0)
    const jugador2Criaturas = criaturasRestantes.filter(criatura => this._zoneBattle.indexOf(criatura) % 2 === 1)

    if (jugador1Criaturas.length === 0) {
      console.log('¡El Jugador 2 ha ganado la batalla!')
    } else if (jugador2Criaturas.length === 0) {
      console.log('¡El Jugador 1 ha ganado la batalla!')
    } else {
      console.log('La batalla continúa.')
    }
  }
}

// ? inicializo el deck
const deckPlayer1 = new DeckInitial(card)
const deckPlayer2 = new DeckInitial(card)

// ? 2. Mezclar las cartas
const distribuidor1 = new DistributorCards(deckPlayer1)
const distribuidor2 = new DistributorCards(deckPlayer2)

// ? 3.  repartir las cartas del deck
console.log(distribuidor1.shuffleCriature(), 'cartas mescladas criaturas')
console.log(distribuidor1.shuffleHability(), 'cartas mescladas habilidades')
const repartirCriaturas1 = distribuidor1.dealCriature()
const habilityInitials1 = distribuidor1.dealHability()

console.log(distribuidor2.shuffleCriature(), 'cartas mescladas criaturas')
console.log(distribuidor2.shuffleHability(), 'cartas mescladas habilidades')
const repartirCriaturas2 = distribuidor2.dealCriature()
const habilityInitials2 = distribuidor2.dealHability()

// ? 4. asignar cartas a cada jugador
const player1 = new PlayersCard(repartirCriaturas1, habilityInitials1, players)
const player2 = new PlayersCard(repartirCriaturas2, habilityInitials2, players)

// ? 5. preparacion del campo con jugadores con sus cartas y la zona del juego
const preparationCampo = new CampGameCardWars(player1, player2, zona)

// console.log(preparationCampo.zoneBattle())
console.log(preparationCampo.aleatorioTurn())
console.log(preparationCampo.addCriatureCamp(0))
console.log(preparationCampo.addHabilityCards(1))
console.log(preparationCampo.playersLimit[0])
console.log(preparationCampo.playersLimit[1])
console.log(preparationCampo.addEcenarioZone())

console.log(preparationCampo.zoneBattle())
// console.log(preparationCampo.playersLimit)
// console.log(preparationCampo.energyRound)
// console.log(preparationCampo.zone)

// ? 5. batalla cardWars

const batalla = new BattleCardWars(preparationCampo.zoneBattle())
console.log(batalla)

export default {
  deckPlayer1,
  distribuidor1,
  repartirCriaturas1,
  player1
}
