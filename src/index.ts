import { PlayersCard, DeckInitial, DistributorCards, CampGameCardWars, BattleCardWars } from './exercises'
import { ecenarioBattle, ejemploCartaSeleccionadas, ejemploPlayer1, ejemploPlayer2 } from './cardsExamples'

// Inicializa los mazos de cada jugador
const deckPlayer1 = new DeckInitial(ejemploCartaSeleccionadas)
const deckPlayer2 = new DeckInitial(ejemploCartaSeleccionadas)

// Mezcla las cartas
const distribuidor1 = new DistributorCards(deckPlayer1)
const distribuidor2 = new DistributorCards(deckPlayer2)
distribuidor1.shuffleCriature()
distribuidor1.shuffleHability()
distribuidor2.shuffleCriature()
distribuidor2.shuffleHability()

// Reparte cartas de criaturas y habilidades
const repartirCriaturas1 = distribuidor1.dealCriature()
const habilityInitials1 = distribuidor1.dealHability()
const repartirCriaturas2 = distribuidor2.dealCriature()
const habilityInitials2 = distribuidor2.dealHability()

// se crea los jugadores con sus cartas repartidas
const player1 = new PlayersCard(repartirCriaturas1, habilityInitials1, ejemploPlayer1)
const player2 = new PlayersCard(repartirCriaturas2, habilityInitials2, ejemploPlayer2)

// Prepara el campo de batalla
const preparationCampo = new CampGameCardWars(player1, player2, ecenarioBattle)

// Inicia la batalla
const batalla = new BattleCardWars(preparationCampo)
const zonaelegida = batalla.zonePreparadaBattle.addEcenarioZone()
console.log(zonaelegida)

// cada jugador ya tiene en mano sus cartas de criaturas y habilidades
const p1 = batalla.zonePreparadaBattle.playersLimit[0]
const p2 = batalla.zonePreparadaBattle.playersLimit[1]

const lanzaUnaMoneda = batalla.zonePreparadaBattle.aleatorioTurn()
console.log(lanzaUnaMoneda)

// agrega una criatura a la zona de batalla que es un []
batalla.addCriatureCamp(1, p1)
batalla.addCriatureCamp(1, p2)

batalla.atackCard(p1, 2) // 🚧

// estado de la zona de batalla después de un ataque
const criaturasHability = batalla.zonePreparadaBattle.zoneBattle()
console.log('ZONADEBATALLA', criaturasHability)
