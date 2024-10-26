import type { ICampBattle, Zona, Ecenario, ZoneBattle, PlayerLimit } from '@/types/cardWars'
import { PlayersCard } from './Players'

export class CampGameCardWars implements ICampBattle {
  playersLimit: PlayerLimit
  zoneSelect: Ecenario<Zona>
  energyRound: number = 2
  round: number = 1
  time: number = 15

  private readonly _zoneBattle: ZoneBattle[] = []

  constructor (player1: PlayersCard, player2: PlayersCard, zone: Ecenario<Zona>) {
    this.zoneSelect = zone
    this.playersLimit = [player1.player, player2.player]
  }

  zoneBattle (): ZoneBattle[] {
    return this._zoneBattle
  }

  aleatorioTurn (): void {
    const turno = Math.random() < 0.5
    return console.log(turno ? `Inicializa la ronda ${this.playersLimit[0].playerName}` : `Inicializa la ronda ${this.playersLimit[1].playerName}`)
  }

  // se define aletoriamente el lugar de la zona de combate segun los elementos de los personajes
  addEcenarioZone (): ZoneBattle[] {
    const elementoJugador1 = this.playersLimit[0].Personaje.element
    const elementoJugador2 = this.playersLimit[1].Personaje.element

    const zonasFiltradas = this.zoneSelect.zonas.filter(zona =>
      zona.element === elementoJugador1 || zona.element === elementoJugador2
    )

    if (zonasFiltradas.length === 0) {
      this._zoneBattle.push(this.zoneSelect.zonas[3])
      console.log('zona por defecto')
    }
    const zonaSeleccionada = zonasFiltradas[Math.floor(Math.random() * zonasFiltradas.length)]
    this._zoneBattle.push(zonaSeleccionada)
    console.log(`lugar ${zonaSeleccionada.zonaName} potencia criaturas elemento ${zonaSeleccionada.element}`)
    return this._zoneBattle
  }

  deletedElementZoneBattle (cardIndex: number): void {
    this._zoneBattle.splice(cardIndex, 1)
  }
}
