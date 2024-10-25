import { PlayersCard, DeckInitial, DistributorCards, CampGameCardWars } from './exercises'
import { ecenarioBattle, ejemploCartaSeleccionadas, ejemploPlayer1, ejemploPlayer2 } from './cardsExamples'

const deckPlayer1 = new DeckInitial(ejemploCartaSeleccionadas)
const deckPlayer2 = new DeckInitial(ejemploCartaSeleccionadas)

const distribuidor1 = new DistributorCards(deckPlayer1)
const distribuidor2 = new DistributorCards(deckPlayer2)
distribuidor1.shuffleCriature()
distribuidor1.shuffleHability()
distribuidor2.shuffleCriature()
distribuidor2.shuffleHability()

const repartirCriaturas1 = distribuidor1.dealCriature()
const habilityInitials1 = distribuidor1.dealHability()
const repartirCriaturas2 = distribuidor2.dealCriature()
const habilityInitials2 = distribuidor2.dealHability()

const player1 = new PlayersCard(repartirCriaturas1, habilityInitials1, ejemploPlayer1)
const player2 = new PlayersCard(repartirCriaturas2, habilityInitials2, ejemploPlayer2)

const preparationCampo = new CampGameCardWars(player1, player2, ecenarioBattle)
preparationCampo.addCriatureCamp(0)
preparationCampo.addHabilityCards(1)
preparationCampo.addEcenarioZone()
