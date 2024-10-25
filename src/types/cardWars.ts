// Criaturas
export enum TypeCriaturaElement {
  DULCE_REiNO = 'Dulce reino',
  TIERRA_ARENOSA = 'tierra arenosa',
  CIENAGA = 'cienaga',
  MAGICO = 'magico'
}

export interface DulceReino {
  name: string
  elemento: TypeCriaturaElement.DULCE_REiNO
  habilidad: LimitHabilitiesCriature
}
export interface TierraArenosa {
  name: string
  elemento: TypeCriaturaElement.TIERRA_ARENOSA
  habilidad: LimitHabilitiesCriature
}
export interface Cienaga {
  name: string
  elemento: TypeCriaturaElement.CIENAGA
  habilidad: LimitHabilitiesCriature
}
export interface Magico {
  name: string
  elemento: TypeCriaturaElement.MAGICO
  habilidad: LimitHabilitiesCriature
}

export type Criatura = DulceReino | TierraArenosa | Cienaga | Magico

// Decks
export interface CardHability {
  id: number
  name: string
  description: string
  TipeHability: 'magico' | 'veneno' | 'directo' | 'potenciado' | 'curar'
  costEnergyHability: number
  daño?: number
  curar?: number
  efect?: () => void
  duration?: number
}

export type LimitHabilitiesCriature = [CardHability, CardHability, CardHability]

export interface Card<T extends Criatura> {
  id: number
  vida: number
  ataque: number
  CostEnergiaAtack: number
  criatura: T
}

export interface ICardDeckInitial {
  lengthInicialDeck: number
  getCardsCriature: () => Array<Card<Criatura>>
  getCardsHability: () => LimitHabilitiesCriature[]
}

export interface IDistribute {
  lengthInicialDistribute: number
  shuffleCriature: () => void
  shuffleHability: () => void
  dealCriature: () => Array<Card<Criatura>>
  dealHability: () => CardHability[]
}

// Campo de Batalla

export interface Zona {
  id: number
  zonaName: string
  element: TypeCriaturaElement
}

export interface Ecenario<T extends Zona> {
  zonas: T[]
}

export interface Pesonajes {
  namePersonajes: 'grumosa' | 'marcin' | 'rey helado' | 'fin' | 'jack' | 'BMO' | 'Princesa' | 'Limon agrio'
  specialAtack: CardHability[]
  element: TypeCriaturaElement
}

export interface Players {
  id: number
  playerName: string
  Personaje: Pesonajes
  card: Array<Card<Criatura>>
  hability: CardHability[]
  atributos?: Record<string, any>
}

export type PlayerLimit = [Players, Players]

export interface ZoneBattlePreparation {
  round: number
  time: number
  energyRound: number
  zone: Ecenario<Zona>
  playersLimit: PlayerLimit
}

export type ZoneBattle = Card<Criatura> | CardHability | Zona

export interface ICampBattle extends ZoneBattlePreparation {
  aleatorioTurn: () => void
  addCriatureCamp: (cardIndex: number) => Card<Criatura>
  addHabilityCards: (cardIndex: number) => CardHability
  addEcenarioZone: () => ZoneBattle[]

}
