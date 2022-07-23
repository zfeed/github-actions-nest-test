import { ApiProperty } from '@nestjs/swagger';
import Field from '../../../domain/field/Field';
import SessionDTO from './SessionDTO';

export default class FieldDTO {
    @ApiProperty()
    public readonly id: string;

    @ApiProperty({ type: ['string'] })
    playerIds: ReadonlyArray<string>;

    @ApiProperty()
    public readonly gameId: string;

    @ApiProperty()
    public readonly markedCellPosition: number;

    @ApiProperty()
    public readonly size: number;

    @ApiProperty({ type: SessionDTO })
    public readonly session: SessionDTO;

    private constructor(
        id: string,
        playerIds: ReadonlyArray<string>,
        gameId: string,
        markedCellPosition: number,
        size: number,
        session: SessionDTO
    ) {
        this.id = id;
        this.playerIds = playerIds;
        this.gameId = gameId;
        this.markedCellPosition = markedCellPosition;
        this.size = size;
        this.session = session;
    }

    static create(field: Field) {
        return new this(
            field.id,
            [...field.getPlayerIds()],
            field.getGameId(),
            field.getMarkedCellPosition(),
            field.getSize(),
            SessionDTO.create(field.getSession())
        );
    }
}
