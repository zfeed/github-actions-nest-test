import { EntityManager } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import Game from '../domain/game/Game';
import MarkedCellHitEvent from '../domain/field/MarkedCellHitEvent';

@Injectable()
export default class MarkedCellHitEventHandler {
    constructor(private em: EntityManager) {}

    async handle(event: MarkedCellHitEvent): Promise<void> {
        const gameRepository = this.em.getRepository(Game);

        const game = await gameRepository.findOne(event.gameId);

        if (!game) {
            throw new Error('Game does not exist');
        }

        game.increasePlayerScore(event.playerId, new Date());

        gameRepository.flush();
    }
}
